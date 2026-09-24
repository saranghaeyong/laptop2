import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Layers, RotateCcw } from 'lucide-react';
import { COMPONENT_ANNOTATIONS, ComponentSectionId } from '../../data/portfolioData';
import {
  MobileIdentityPanel,
  MobileSkillsPanel,
  MobileProjectPanel,
  MobileEducationPanel,
  MobileCertificationsPanel,
  MobileContactPanel
} from './MobilePanels';
import { audioService } from '../../utils/audio';

interface MobileBottomSheetProps {
  isDark: boolean;
  activeSection: ComponentSectionId;
  onSelectSection: (id: ComponentSectionId) => void;
  onReassemble: () => void;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isDark,
  activeSection,
  onSelectSection,
  onReassemble
}) => {
  const currentIndex = COMPONENT_ANNOTATIONS.findIndex((a) => a.id === activeSection);
  const activeAnnotation = COMPONENT_ANNOTATIONS[currentIndex] || COMPONENT_ANNOTATIONS[0];

  const handlePrev = () => {
    audioService.playClick();
    const prevIndex = (currentIndex - 1 + COMPONENT_ANNOTATIONS.length) % COMPONENT_ANNOTATIONS.length;
    onSelectSection(COMPONENT_ANNOTATIONS[prevIndex].id);
  };

  const handleNext = () => {
    audioService.playClick();
    const nextIndex = (currentIndex + 1) % COMPONENT_ANNOTATIONS.length;
    onSelectSection(COMPONENT_ANNOTATIONS[nextIndex].id);
  };

  // Touch swipe detection on the bottom sheet header/container
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe if deltaX > 48px and more horizontal than vertical
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      className={`fixed bottom-0 left-0 right-0 z-30 flex flex-col rounded-t-3xl border-t border-x shadow-2xl transition-colors duration-300 ${
        isDark
          ? 'bg-[#0d0f14]/96 border-white/15 text-white shadow-black/80'
          : 'bg-white/98 border-slate-300 text-slate-900 shadow-slate-400/40'
      }`}
      style={{
        height: '52dvh',
        minHeight: '340px',
        maxHeight: '68dvh',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))'
      }}
      aria-label="Portfolio Content Sheet"
    >
      {/* 1. Drag / Affordance Handle */}
      <div className="pt-2 pb-1 shrink-0 flex justify-center">
        <div
          className={`w-12 h-1.5 rounded-full ${
            isDark ? 'bg-white/25' : 'bg-slate-300'
          }`}
        />
      </div>

      {/* 2. Compact Navigation Header with Safe 44x44px Touch Targets */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`px-4 py-2.5 border-b flex items-center justify-between shrink-0 select-none ${
          isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50/60'
        }`}
      >
        {/* Section Counter & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0 font-mono-tech text-xs font-bold">
            0{currentIndex + 1}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono-tech text-xs font-bold tracking-wider truncate">
              {activeAnnotation.label}
            </span>
            <span className="font-mono-tech text-[10px] text-slate-400 tracking-wider">
              {activeAnnotation.hardwarePart} · 0{currentIndex + 1}/0{COMPONENT_ANNOTATIONS.length}
            </span>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handlePrev}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-white/10 active:bg-white/15 text-slate-200' : 'hover:bg-slate-200 active:bg-slate-300 text-slate-800'
            }`}
            aria-label="Previous portfolio section"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-white/10 active:bg-white/15 text-slate-200' : 'hover:bg-slate-200 active:bg-slate-300 text-slate-800'
            }`}
            aria-label="Next portfolio section"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className={`h-4 w-px mx-0.5 ${isDark ? 'bg-white/15' : 'bg-slate-300'}`} />

          <button
            onClick={() => {
              audioService.playClick();
              onReassemble();
            }}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-black'
            }`}
            title="Assemble Laptop"
            aria-label="Reassemble laptop"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Single Dedicated Scrollable Content Area */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6"
      >
        {activeSection === 'identity' && <MobileIdentityPanel isDark={isDark} />}
        {activeSection === 'skills' && <MobileSkillsPanel isDark={isDark} />}
        {activeSection === 'project' && <MobileProjectPanel isDark={isDark} />}
        {activeSection === 'education' && <MobileEducationPanel isDark={isDark} />}
        {activeSection === 'certifications' && <MobileCertificationsPanel isDark={isDark} />}
        {activeSection === 'contact' && <MobileContactPanel isDark={isDark} />}
      </div>

      {/* 4. Bottom Section Progress Dots Navigation */}
      <nav
        aria-label="Section dots"
        className={`px-4 py-2 border-t flex items-center justify-between shrink-0 font-mono-tech text-[10px] ${
          isDark ? 'border-white/10 bg-black/40 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}
      >
        <button
          onClick={handlePrev}
          className="hover:underline flex items-center gap-1 cursor-pointer py-1"
        >
          <ChevronLeft className="w-3 h-3" />
          <span>PREV</span>
        </button>

        <div className="flex items-center gap-2">
          {COMPONENT_ANNOTATIONS.map((anno, idx) => {
            const isActive = activeSection === anno.id;
            return (
              <button
                key={anno.id}
                onClick={() => {
                  audioService.playClick();
                  onSelectSection(anno.id);
                }}
                className={`min-h-[32px] min-w-[24px] flex items-center justify-center cursor-pointer`}
                aria-label={`Jump to section ${idx + 1}: ${anno.label}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-5 h-1.5 bg-blue-400 ring-2 ring-blue-400/40'
                      : isDark
                      ? 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                      : 'w-1.5 h-1.5 bg-slate-400 hover:bg-slate-700'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="hover:underline flex items-center gap-1 text-blue-400 font-semibold cursor-pointer py-1"
        >
          <span>NEXT</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </nav>
    </section>
  );
};
