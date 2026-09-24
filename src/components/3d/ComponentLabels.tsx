import React from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { COMPONENT_ANNOTATIONS, ComponentSectionId } from '../../data/portfolioData';
import { audioService } from '../../utils/audio';

interface ComponentLabelsProps {
  isDark: boolean;
  explosionProgress: number;
  activeSection: ComponentSectionId | null;
  onSelectSection: (id: ComponentSectionId) => void;
}

export const ComponentLabels: React.FC<ComponentLabelsProps> = ({
  isDark,
  explosionProgress,
  activeSection,
  onSelectSection
}) => {
  const { size } = useThree();
  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;

  // Only reveal labels when exploded sufficiently
  if (explosionProgress < 0.3) return null;

  const fadeOpacity = Math.min(1, (explosionProgress - 0.3) / 0.35);

  // Filter labels based on device width
  const visibleAnnotations = COMPONENT_ANNOTATIONS.filter((anno) => {
    if (isMobile) {
      // Mobile / Android: only show the active section label to prevent visual competition and overlap
      return anno.id === activeSection;
    }
    if (isTablet) {
      // Tablet: show active section + 3 primary anchors
      return anno.id === activeSection || ['identity', 'skills', 'project'].includes(anno.id);
    }
    // Desktop: show all labels
    return true;
  });

  return (
    <group>
      {visibleAnnotations.map((anno) => {
        const isActive = activeSection === anno.id;

        // On mobile, lift position upward so it never clips behind the bottom sheet
        const position: [number, number, number] = isMobile
          ? [0, 1.85, -0.4]
          : anno.targetPosition;

        return (
          <group
            key={anno.id}
            position={position}
          >
            <Html
              center
              distanceFactor={isMobile ? 9 : 8}
              zIndexRange={[100, 0]}
              style={{
                opacity: fadeOpacity,
                transition: 'opacity 0.4s ease-out, transform 0.3s ease-out',
                pointerEvents: explosionProgress > 0.5 ? 'auto' : 'none'
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioService.playClick();
                  onSelectSection(anno.id);
                }}
                onMouseEnter={() => audioService.playHover()}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all duration-300 backdrop-blur-md cursor-pointer border shadow-lg ${
                  isActive
                    ? isDark
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-blue-500/25 scale-105'
                      : 'bg-blue-600/20 border-blue-600 text-slate-950 shadow-blue-600/20 scale-105'
                    : isDark
                    ? 'bg-black/75 hover:bg-slate-900/90 border-white/15 hover:border-blue-400/50 text-slate-300 hover:text-white'
                    : 'bg-white/90 hover:bg-white border-slate-300 hover:border-blue-600 text-slate-800 hover:text-slate-950'
                }`}
                style={{ whiteSpace: 'nowrap' }}
                aria-label={`Select ${anno.label} component`}
              >
                {/* Status Dot */}
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-400 ring-2 ring-blue-400/50 animate-pulse'
                      : 'bg-slate-400 group-hover:bg-blue-400'
                  }`}
                />

                <div className="flex flex-col">
                  <span className="font-mono-tech text-[9px] uppercase tracking-widest opacity-70">
                    {anno.hardwarePart}
                  </span>
                  <span className="font-mono-tech text-xs font-bold tracking-wider">
                    {anno.label}
                  </span>
                </div>

                {!isMobile && (
                  <span className="text-[10px] opacity-50 ml-1 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                )}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
