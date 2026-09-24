import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, Move3d, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface InitialHUDProps {
  isDark: boolean;
  isVisible: boolean;
  isHovered: boolean;
  onEnter: () => void;
}

export const InitialHUD: React.FC<InitialHUDProps> = ({
  isDark,
  isVisible,
  isHovered,
  onEnter
}) => {
  const { isTouchLayout, prefersReducedMotion } = useBreakpoint();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 md:p-12 z-20"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top))',
            paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))'
          }}
        >
          {/* Top Title Block */}
          <div className="pt-12 sm:pt-16 md:pt-20 text-center flex flex-col items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex flex-col items-center max-w-xl mx-auto px-4"
            >
              <span className={`font-mono-tech text-[11px] sm:text-xs tracking-[0.3em] uppercase mb-1.5 sm:mb-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600 font-semibold'
              }`}>
                {isTouchLayout ? 'INTERACTIVE PORTFOLIO' : 'INTERACTIVE 3D MONOGRAPH'}
              </span>

              <h1 className={`text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight font-editorial ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {PORTFOLIO_DATA.identity.name}
              </h1>

              <div className="flex items-center gap-3 mt-2 sm:mt-3">
                <span className={`h-px w-6 sm:w-8 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
                <span className={`font-mono-tech text-xs sm:text-sm tracking-[0.25em] font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  MCA GRADUATE
                </span>
                <span className={`h-px w-6 sm:w-8 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
              </div>
            </motion.div>
          </div>

          {/* Bottom Action Block */}
          <div className="pb-4 sm:pb-8 md:pb-12 text-center flex flex-col items-center">
            {/* Desktop Only: Technical Disciplines Ticker */}
            {!isTouchLayout && (
              <motion.div
                initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-6"
              >
                {['SOFTWARE DEVELOPMENT', 'PYTHON', 'MACHINE LEARNING'].map((d, idx) => (
                  <span
                    key={idx}
                    className={`font-mono-tech text-xs sm:text-sm tracking-[0.2em] font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {d}
                    {idx < 2 && <span className="ml-3 sm:ml-6 opacity-30">/</span>}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Prompts: Touch / Desktop CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pointer-events-auto w-full max-w-sm sm:max-w-none px-4"
            >
              {/* Interaction Hint */}
              <div className={`flex items-center gap-2 font-mono-tech text-[11px] tracking-wider px-3.5 py-2 rounded-full border ${
                isDark ? 'bg-black/60 border-white/10 text-slate-400' : 'bg-white/80 border-slate-300 text-slate-600'
              }`}>
                <Move3d className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>
                  {isTouchLayout ? 'DRAG TO ROTATE · PINCH TO ZOOM' : 'DRAG TO ROTATE & WHEEL TO ZOOM'}
                </span>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={onEnter}
                className={`w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl border flex items-center justify-center gap-2.5 font-mono-tech text-xs tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  isHovered || isTouchLayout
                    ? isDark
                      ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-xl shadow-blue-600/30 active:scale-98'
                      : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-600/25 active:scale-98'
                    : isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/25'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                }`}
                aria-label="Explore interactive portfolio"
              >
                {isTouchLayout ? (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>EXPLORE PORTFOLIO</span>
                  </>
                ) : (
                  <>
                    <MousePointer2 className="w-3.5 h-3.5" />
                    <span>CLICK LAPTOP TO ENTER // EXPLODE</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
