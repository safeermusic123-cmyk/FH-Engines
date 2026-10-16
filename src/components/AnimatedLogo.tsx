import React, { useState } from 'react';
import { Sparkles, Video, Play } from 'lucide-react';

interface AnimatedLogoProps {
  customVideoUrl?: string | null;
  onOpenStudio?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  customVideoUrl,
  onOpenStudio,
  className = '',
  size = 'md',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size styling
  const sizeConfig = {
    sm: {
      box: 'w-8 h-8 rounded-md',
      font: 'text-sm',
      title: 'text-sm',
      subtitle: 'text-[9px]',
      badge: 'text-[9px] px-1.5 py-0.5',
    },
    md: {
      box: 'w-10 h-10 rounded-lg',
      font: 'text-base',
      title: 'text-base sm:text-lg',
      subtitle: 'text-[10px]',
      badge: 'text-[10px] px-2 py-0.5',
    },
    lg: {
      box: 'w-16 h-16 rounded-xl',
      font: 'text-2xl',
      title: 'text-2xl',
      subtitle: 'text-xs',
      badge: 'text-xs px-2.5 py-1',
    },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenStudio}
      title="Click to open Veo 3.1 Video & Logo Animator"
    >
      {/* Emblem Icon / Video Player */}
      <div
        className={`relative ${sizeConfig.box} overflow-hidden shadow-md transition-all duration-500 bg-[#070b14] border border-zinc-800 flex items-center justify-center`}
      >
        {customVideoUrl ? (
          /* Live Generated Veo Video Loop */
          <video
            src={customVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-inherit"
          />
        ) : (
          /* High-Tech Animated Emblem */
          <>
            {/* Ambient Red Combustion Pulse */}
            <div className="absolute inset-0 bg-radial from-red-600/30 via-red-900/10 to-transparent animate-pulse" />

            {/* Rotating Mechanical Ring */}
            <div
              className="absolute inset-[-4px] rounded-full border border-red-500/30 border-t-red-500 border-r-transparent animate-spin"
              style={{ animationDuration: '6s' }}
            />

            {/* Counter-rotating subtle dashed ring */}
            <div
              className="absolute inset-[1px] rounded-full border border-zinc-700/40 border-b-amber-500/40 animate-spin"
              style={{ animationDuration: '10s', animationDirection: 'reverse' }}
            />

            {/* Shimmer sweep effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />

            {/* Monogram F H */}
            <div className="relative z-10 flex items-center font-heading font-black tracking-tighter">
              <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">F</span>
              <span className="text-[#e11d48] group-hover:text-red-400 transition-colors drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]">
                H
              </span>
            </div>

            {/* Live Loop Indicator Dot */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-black animate-ping" />
          </>
        )}
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span
            className={`font-heading font-black ${sizeConfig.title} tracking-tight text-[#0f172a] group-hover:text-[#a31414] transition-colors uppercase leading-none`}
          >
            FH ENGINE
          </span>

          {/* Micro Veo indicator */}
          <span
            className={`inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider bg-red-500/10 text-red-600 border border-red-500/20 rounded-full ${sizeConfig.badge} opacity-90 group-hover:opacity-100 group-hover:bg-red-600 group-hover:text-white transition-all`}
          >
            <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>VEO</span>
          </span>
        </div>

        <span
          className={`font-bold tracking-[0.2em] text-[#a31414] ${sizeConfig.subtitle} uppercase mt-0.5 flex items-center gap-1.5`}
        >
          <span>SHARJAH · UAE</span>
          <span className="w-1 h-1 rounded-full bg-zinc-400" />
          <span className="text-zinc-500 font-medium normal-case tracking-normal text-[11px] hidden sm:inline">
            Loop Video Active
          </span>
        </span>
      </div>

      {/* Hover Floating Tooltip */}
      {isHovered && onOpenStudio && (
        <div className="absolute top-full left-0 mt-2 z-50 px-2.5 py-1.5 bg-zinc-900/95 backdrop-blur-md text-white text-[11px] rounded-lg shadow-xl border border-zinc-700/80 whitespace-nowrap flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
          <Video className="w-3.5 h-3.5 text-red-400" />
          <span>Click to generate video with Veo 3.1</span>
        </div>
      )}
    </div>
  );
};
