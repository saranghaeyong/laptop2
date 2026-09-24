import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  explosionProgress: number; // 0 to 1
  isExploded: boolean;
  isMobile: boolean;
  prefersReducedMotion?: boolean;
  onToggleExplode: () => void;
  onResetAssembled: () => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  explosionProgress,
  isExploded,
  isMobile,
  prefersReducedMotion,
  onToggleExplode,
  onResetAssembled
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Desktop keyboard accessibility
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const controls = controlsRef.current;
      if (!controls) return;

      const rotStep = 0.08;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          onToggleExplode();
          return;
        case 'Escape':
          e.preventDefault();
          onResetAssembled();
          return;
        case 'ArrowLeft':
          spherical.theta -= rotStep;
          break;
        case 'ArrowRight':
          spherical.theta += rotStep;
          break;
        case 'ArrowUp':
          spherical.phi = Math.max(controls.minPolarAngle + 0.01, Math.min(controls.maxPolarAngle - 0.01, spherical.phi - rotStep));
          break;
        case 'ArrowDown':
          spherical.phi = Math.max(controls.minPolarAngle + 0.01, Math.min(controls.maxPolarAngle - 0.01, spherical.phi + rotStep));
          break;
        case '+':
        case '=':
          spherical.radius = Math.max(controls.minDistance, spherical.radius * 0.94);
          break;
        case '-':
        case '_':
          spherical.radius = Math.min(controls.maxDistance, spherical.radius * 1.06);
          break;
        default:
          return;
      }

      offset.setFromSpherical(spherical);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleExplode, onResetAssembled, camera, isMobile]);

  // Dynamically position target: on mobile, shift target up so the laptop sits in the upper 45% stage
  const currentTargetY = useRef(isMobile ? 0.45 : 0);
  const prevExplosionRef = useRef(explosionProgress);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Target Y: raise when on mobile to leave space for bottom sheet
    const targetY = isMobile ? (isExploded ? 0.5 : 0.4) : 0;
    currentTargetY.current = THREE.MathUtils.lerp(currentTargetY.current, targetY, 0.05);
    controls.target.set(0, currentTargetY.current, 0);

    // During transition between assembled and exploded, smoothly nudge camera outward
    if (!prefersReducedMotion) {
      const diff = explosionProgress - prevExplosionRef.current;
      if (Math.abs(diff) > 0.001) {
        if (diff > 0) {
          const pushScale = isMobile ? 0.4 : 0.8;
          camera.position.addScaledVector(camera.position.clone().normalize(), diff * pushScale);
        }
        prevExplosionRef.current = explosionProgress;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={!prefersReducedMotion}
      dampingFactor={0.06}
      rotateSpeed={isMobile ? 0.75 : 0.65}
      zoomSpeed={isMobile ? 0.6 : 0.8}
      minDistance={isMobile ? 4.2 : 3.8}
      maxDistance={isMobile ? 7.2 : 9.8}
      minPolarAngle={Math.PI * 0.12} // Prevent extreme top-down
      maxPolarAngle={Math.PI * 0.54} // Prevent going beneath ground floor
      target={[0, isMobile ? 0.45 : 0, 0]}
    />
  );
};
