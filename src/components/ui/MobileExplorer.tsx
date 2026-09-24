import React from 'react';
import { ComponentSectionId } from '../../data/portfolioData';
import { MobileBottomSheet } from './MobileBottomSheet';

interface MobileExplorerProps {
  isDark: boolean;
  isExploded: boolean;
  activeSection: ComponentSectionId;
  onSelectSection: (id: ComponentSectionId) => void;
  onReassemble: () => void;
}

export const MobileExplorer: React.FC<MobileExplorerProps> = ({
  isDark,
  isExploded,
  activeSection,
  onSelectSection,
  onReassemble
}) => {
  if (!isExploded) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-end">
      {/* Upper 3D Interaction Stage Touch Prompt (Subtle, non-intrusive) */}
      <div className="absolute top-16 left-0 right-0 flex justify-center pointer-events-none px-4">
        <div className={`px-3 py-1 rounded-full border text-[10px] font-mono-tech tracking-widest backdrop-blur-md shadow-xs ${
          isDark ? 'bg-black/50 border-white/10 text-slate-400' : 'bg-white/70 border-slate-200 text-slate-600'
        }`}>
          DRAG 3D TO ROTATE · PINCH TO ZOOM
        </div>
      </div>

      {/* Touch-Friendly Bottom Sheet Container */}
      <div className="pointer-events-auto">
        <MobileBottomSheet
          isDark={isDark}
          activeSection={activeSection}
          onSelectSection={onSelectSection}
          onReassemble={onReassemble}
        />
      </div>
    </div>
  );
};
