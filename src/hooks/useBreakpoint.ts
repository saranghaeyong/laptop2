import { useState, useEffect } from 'react';

export interface BreakpointState {
  width: number;
  height: number;
  isMobile: boolean;        // < 640px
  isSmallTablet: boolean;   // 640px - 767px
  isTablet: boolean;        // 768px - 1023px
  isDesktop: boolean;       // 1024px - 1439px
  isLargeDesktop: boolean;  // >= 1440px
  isTouchLayout: boolean;   // < 768px (Mobile & Small Tablet)
  prefersReducedMotion: boolean;
}

const getBreakpointState = (): BreakpointState => {
  if (typeof window === 'undefined') {
    return {
      width: 1280,
      height: 800,
      isMobile: false,
      isSmallTablet: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
      isTouchLayout: false,
      prefersReducedMotion: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    width,
    height,
    isMobile: width < 640,
    isSmallTablet: width >= 640 && width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLargeDesktop: width >= 1440,
    isTouchLayout: width < 768,
    prefersReducedMotion,
  };
};

export const useBreakpoint = (): BreakpointState => {
  const [state, setState] = useState<BreakpointState>(getBreakpointState);

  useEffect(() => {
    const handleResize = () => {
      setState(getBreakpointState());
    };

    const mediaReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setState(getBreakpointState());
    };

    window.addEventListener('resize', handleResize, { passive: true });
    mediaReducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaReducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return state;
};
