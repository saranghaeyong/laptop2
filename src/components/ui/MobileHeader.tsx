import React, { useState } from 'react';
import {
  MoreVertical,
  X,
  RotateCcw,
  GraduationCap,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Move3d,
  Info
} from 'lucide-react';
import { audioService } from '../../utils/audio';

interface MobileHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  isAmbientActive: boolean;
  onToggleAmbient: () => void;
  isExploded: boolean;
  onReassemble: () => void;
  onExplode?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isDark,
  onToggleTheme,
  isAudioMuted,
  onToggleMute,
  isAmbientActive,
  onToggleAmbient,
  isExploded,
  onReassemble,
  onExplode
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    audioService.playClick();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between pointer-events-none"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        {/* Left: Clean Brand Mark */}
        <div className="pointer-events-auto flex flex-col">
          <span className={`font-mono-tech text-xs tracking-[0.2em] font-bold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            SARANG R N
          </span>
          <span className={`font-mono-tech text-[9px] tracking-widest ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            3D PORTFOLIO ARCHIVE
          </span>
        </div>

        {/* Right: Touch-Friendly Overflow Trigger */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          {isExploded && (
            <button
              onClick={() => {
                audioService.playClick();
                onReassemble();
              }}
              className={`min-h-[44px] min-w-[44px] px-3 flex items-center justify-center gap-1.5 rounded-lg border font-mono-tech text-xs tracking-wider transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#12151c]/90 border-white/15 text-slate-200 active:bg-white/10'
                  : 'bg-white/90 border-slate-300 text-slate-800 active:bg-slate-100 shadow-sm'
              }`}
              aria-label="Reassemble laptop"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden xs:inline text-[11px]">ASSEMBLE</span>
            </button>
          )}

          <button
            onClick={toggleMenu}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#12151c]/90 border-white/15 text-white active:bg-white/15'
                : 'bg-white/90 border-slate-300 text-slate-900 active:bg-slate-100 shadow-sm'
            }`}
            aria-label="Open portfolio controls menu"
            aria-expanded={isMenuOpen}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Overflow Menu Drawer / Modal */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end"
          onClick={closeMenu}
        >
          <div
            className={`w-full rounded-t-3xl border-t border-x p-5 pb-8 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl ${
              isDark
                ? 'bg-[#0f1218] border-white/15 text-white'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex flex-col">
                <span className="font-mono-tech text-xs font-bold tracking-wider">
                  PORTFOLIO CONTROLS
                </span>
                <span className="font-mono-tech text-[10px] text-slate-400">
                  Quick actions, settings & credentials
                </span>
              </div>
              <button
                onClick={() => {
                  audioService.playClick();
                  closeMenu();
                }}
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg ${
                  isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                }`}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actions List */}
            <div className="space-y-2 pt-1 font-mono-tech text-xs">
              {/* Explosion / Reassemble toggle */}
              <button
                onClick={() => {
                  audioService.playClick();
                  closeMenu();
                  if (isExploded) {
                    onReassemble();
                  } else if (onExplode) {
                    onExplode();
                  }
                }}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between text-left transition-colors ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-200 active:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-800 active:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-semibold">{isExploded ? 'Reassemble Laptop' : 'Explode 3D Laptop'}</div>
                    <div className="text-[10px] text-slate-400">{isExploded ? 'Return to single assembled unit' : 'Separate into hardware layers'}</div>
                  </div>
                </div>
                <span className="text-blue-400 font-bold">{isExploded ? 'RESET' : 'VIEW'}</span>
              </button>

              {/* View PG Certificate */}
              <a
                href="https://mcacertificate.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  audioService.playClick();
                  closeMenu();
                }}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between text-left transition-colors ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-200 active:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-800 active:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-semibold">PG Degree Certificate</div>
                    <div className="text-[10px] text-slate-400">View CUSAT MCA accredited credential</div>
                  </div>
                </div>
                <span className="text-amber-400 font-bold">EXTERNAL ↗</span>
              </a>

              {/* Sound toggle */}
              <button
                onClick={() => {
                  audioService.playClick();
                  onToggleAmbient();
                }}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between text-left transition-colors ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-200 active:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-800 active:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base text-blue-400">♪</span>
                  <div>
                    <div className="font-semibold">Ambient Sound</div>
                    <div className="text-[10px] text-slate-400">Cinematic generative soundscape</div>
                  </div>
                </div>
                <span className="font-bold text-blue-400">{isAmbientActive ? 'ENABLED' : 'MUTED'}</span>
              </button>

              {/* SFX Mute toggle */}
              <button
                onClick={() => {
                  audioService.playClick();
                  onToggleMute();
                }}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between text-left transition-colors ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-200 active:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-800 active:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isAudioMuted ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  )}
                  <div>
                    <div className="font-semibold">Audio SFX</div>
                    <div className="text-[10px] text-slate-400">Click & transition synthesized audio</div>
                  </div>
                </div>
                <span className="font-bold">{isAudioMuted ? 'OFF' : 'ON'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  audioService.playClick();
                  onToggleTheme();
                }}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between text-left transition-colors ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-200 active:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-800 active:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-400" />
                  )}
                  <div>
                    <div className="font-semibold">Display Theme</div>
                    <div className="text-[10px] text-slate-400">Switch between dark & light visual palette</div>
                  </div>
                </div>
                <span className="font-bold">{isDark ? 'DARK' : 'LIGHT'}</span>
              </button>
            </div>

            {/* Gesture Guide */}
            <div className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
              isDark ? 'bg-blue-500/10 border-blue-500/20 text-slate-300' : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <Move3d className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="font-mono-tech text-[11px] leading-relaxed">
                <span className="font-semibold text-blue-400">Touch Gestures: </span>
                Drag the upper screen to orbit the 3D model. Pinch to zoom in/out. Swipe the bottom card to change chapters.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
