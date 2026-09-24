import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Laptop } from './Laptop';
import { Lighting } from './Lighting';
import { Particles } from './Particles';
import { CameraController } from './CameraController';
import { ComponentSectionId } from '../../data/portfolioData';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface LaptopSceneProps {
  isDark: boolean;
  isExploded: boolean;
  isAnimating: boolean;
  activeSection: ComponentSectionId | null;
  onAnimationEnd: () => void;
  onLaptopClick: () => void;
  onSelectSection: (id: ComponentSectionId) => void;
  onHoverStateChange: (isHovered: boolean) => void;
  onResetAssembled: () => void;
}

// Inner canvas runner to interpolate explosionProgress smoothly at 60fps
const SceneContent: React.FC<
  LaptopSceneProps & {
    isMobile: boolean;
    isTablet: boolean;
    prefersReducedMotion: boolean;
  }
> = ({
  isDark,
  isExploded,
  isAnimating,
  activeSection,
  isMobile,
  isTablet,
  prefersReducedMotion,
  onAnimationEnd,
  onLaptopClick,
  onSelectSection,
  onHoverStateChange,
  onResetAssembled
}) => {
  const [explosionProgress, setExplosionProgress] = React.useState(0);
  const currentProgressRef = useRef(0);

  // Mobile uses reduced explosion distance (62% of desktop), tablet 82%, desktop 100%
  const maxExplosionTarget = isMobile ? 0.62 : isTablet ? 0.82 : 1.0;
  const targetProgress = isExploded ? maxExplosionTarget : 0;
  const isAnimatingRef = useRef(isAnimating);
  isAnimatingRef.current = isAnimating;

  useFrame((_, delta) => {
    const target = targetProgress;
    const current = currentProgressRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.001) {
      // Smooth cinematic ease (faster if reduced motion)
      const speed = prefersReducedMotion ? 5.5 : 2.8;
      const step = diff * Math.min(1, delta * speed);
      const next = current + step;
      currentProgressRef.current = next;
      setExplosionProgress(next);
    } else if (current !== target) {
      currentProgressRef.current = target;
      setExplosionProgress(target);
      if (isAnimatingRef.current) {
        onAnimationEnd();
      }
    }
  });

  const bgColor = isDark ? '#060709' : '#eceff3';
  const fogColor = isDark ? '#060709' : '#eceff3';

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[fogColor, 7, 22]} />

      <Lighting isDark={isDark} isMobile={isMobile} />
      <Particles
        isDark={isDark}
        count={isMobile ? 50 : 160}
        prefersReducedMotion={prefersReducedMotion}
      />

      <CameraController
        explosionProgress={explosionProgress}
        isExploded={isExploded}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
        onToggleExplode={onLaptopClick}
        onResetAssembled={onResetAssembled}
      />

      <Laptop
        isDark={isDark}
        explosionProgress={explosionProgress}
        isExploded={isExploded}
        isAnimating={isAnimating}
        activeSection={activeSection}
        prefersReducedMotion={prefersReducedMotion}
        onLaptopClick={onLaptopClick}
        onSelectSection={onSelectSection}
        onHoverStateChange={onHoverStateChange}
      />
    </>
  );
};

export const LaptopScene: React.FC<LaptopSceneProps> = (props) => {
  const { isMobile, isTablet, prefersReducedMotion } = useBreakpoint();

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [0, isMobile ? 2.0 : 1.8, isMobile ? 5.8 : 5.5],
          fov: isMobile ? 46 : 42
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: props.isDark ? 1.05 : 1.15
        }}
      >
        <SceneContent
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
};
