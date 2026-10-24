import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export const BrainModel = () => {
  const primaryStarsRef = useRef<THREE.Points>(null);
  const secondaryStarsRef = useRef<THREE.Points>(null);

  // Scatter stars across the entire page (wide 3D space, not in a circle)
  const primaryPoints = useMemo(() => {
    const count = 480; // Minimal, elegant count
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread wide across full screen width (X), height (Y), and depth (Z)
      points[i3] = (Math.random() - 0.5) * 26; // X: -13 to +13 (reaches screen edges)
      points[i3 + 1] = (Math.random() - 0.5) * 20; // Y: -10 to +10 (reaches top & bottom)
      points[i3 + 2] = (Math.random() - 0.5) * 8 - 1; // Z: -5 to +3 (3D depth layers)
    }
    return points;
  }, []);

  // Deep background stars scattered further out in the cosmos
  const secondaryPoints = useMemo(() => {
    const count = 220; // Minimal deep ambient stars
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Even wider scatter for panoramic space depth
      points[i3] = (Math.random() - 0.5) * 32; // X: -16 to +16
      points[i3 + 1] = (Math.random() - 0.5) * 24; // Y: -12 to +12
      points[i3 + 2] = (Math.random() - 0.5) * 12 - 4; // Z: -10 to +2
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;
    const time = state.clock.getElapsedTime();

    if (primaryStarsRef.current) {
      // Very slow natural cosmic drift across the screen
      primaryStarsRef.current.rotation.y += delta * 0.015;
      primaryStarsRef.current.position.y = Math.sin(time * 0.3) * 0.15;

      // Smooth mouse parallax: foreground moves gently with mouse
      primaryStarsRef.current.position.x += (mouseX * 0.5 - primaryStarsRef.current.position.x) * 0.03;
      primaryStarsRef.current.position.y += (-mouseY * 0.5 - primaryStarsRef.current.position.y) * 0.03;
    }

    if (secondaryStarsRef.current) {
      // Deeper stars drift even more slowly for realistic parallax
      secondaryStarsRef.current.rotation.y += delta * 0.008;
      secondaryStarsRef.current.position.x += (mouseX * 0.2 - secondaryStarsRef.current.position.x) * 0.02;
      secondaryStarsRef.current.position.y += (-mouseY * 0.2 - secondaryStarsRef.current.position.y) * 0.02;
    }
  });

  return (
    <group>
      {/* Primary scattered stars - neon cyan & crisp starlight across full screen */}
      <Points ref={primaryStarsRef} positions={primaryPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#38bdf8" // Cyan starlight
          size={0.045}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Deep scattered stars - soft lilac/violet depth */}
      <Points ref={secondaryStarsRef} positions={secondaryPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c084fc" // Lilac space dust
          size={0.032}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};
