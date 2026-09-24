import React from 'react';
import { Volume2, VolumeX, Moon, Sun, RotateCcw, GraduationCap } from 'lucide-react';
import { audioService } from '../../utils/audio';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { MobileHeader } from './MobileHeader';

interface TopNavControlsProps {
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

export const TopNavControls: React.FC<TopNavControlsProps> = (props) => {
  const {
    isDark,
    onToggleTheme,
    isAudioMuted,
    onToggleMute,
    isAmbientActive,
    onToggleAmbient,
    isExploded,
    onReassemble
  } = props;
  const { isTouchLayout } = useBreakpoint();

  // On mobile & small tablet, render the dedicated quiet MobileHeader with overflow menu
  if (isTouchLayout) {
    return <MobileHeader {...props} />;
  }

  // Desktop & tablet top bar
  const buttonStyle = isDark
    ? 'bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-200 border-white/15'
    : 'bg-white/80 hover:bg-white text-slate-800 border-slate-300 shadow-xs';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center pointer-events-none"
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
    >
      {/* Brand Title Zone */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="flex flex-col">
          <span className={`font-mono-tech text-xs tracking-[0.25em] font-bold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            SARANG R N
          </span>
          <span className={`font-mono-tech text-[10px] tracking-widest ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            PORTFOLIO ARCHIVE // 2026
          </span>
        </div>
      </div>

      {/* Primary Actions Zone */}
      <div className="pointer-events-auto flex items-center gap-2 lg:gap-3">
        {isExploded && (
          <button
            onClick={() => {
              audioService.playClick();
              onReassemble();
            }}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-lg font-mono-tech text-xs tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${
              isDark ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/40' : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-300'
            }`}
            aria-label="Reassemble laptop model"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REASSEMBLE</span>
          </button>
        )}

        {/* View Degree Certificate */}
        <a
          href="https://mcacertificate.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioService.playClick()}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-lg font-mono-tech text-xs tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${buttonStyle}`}
          title="View PG Degree Certificate"
          aria-label="View PG Degree Certificate in new tab"
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xl:inline">VIEW PG DEGREE CERTIFICATE</span>
          <span className="xl:hidden">CERTIFICATE</span>
        </a>

        {/* Ambient generative sound */}
        <button
          onClick={() => {
            audioService.playClick();
            onToggleAmbient();
          }}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-lg font-mono-tech text-xs tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${buttonStyle}`}
          aria-label={isAmbientActive ? 'Turn ambient sound off' : 'Turn ambient sound on'}
        >
          <span className="text-blue-400 font-bold">♪</span>
          <span>{isAmbientActive ? 'SOUND ON' : 'SOUND OFF'}</span>
        </button>

        {/* SFX mute */}
        <button
          onClick={() => {
            audioService.playClick();
            onToggleMute();
          }}
          className={`min-h-[40px] min-w-[40px] p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${buttonStyle}`}
          aria-label={isAudioMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        >
          {isAudioMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
        </button>

        {/* Theme switcher */}
        <button
          onClick={() => {
            audioService.playClick();
            onToggleTheme();
          }}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-lg font-mono-tech text-xs tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${buttonStyle}`}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>LIGHT</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>DARK</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
