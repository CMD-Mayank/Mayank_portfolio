import React, { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

// Background abstract animation
const LiquidMetal = () => {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1, 128, 128]} ref={meshRef} scale={2}>
        <MeshDistortMaterial
          color="#111"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={1}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={5} color="#444444" />
    </Float>
  );
};

// Foreground 3D Image Component
const ProfileImage3D = () => {
  const imageRef = useRef<any>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (imageRef.current) {
      // Mouse parallax effect
      const targetX = (state.mouse.x * viewport.width) / 20;
      const targetY = (state.mouse.y * viewport.height) / 20;
      imageRef.current.position.x = THREE.MathUtils.lerp(imageRef.current.position.x, targetX, 0.1);
      imageRef.current.position.y = THREE.MathUtils.lerp(imageRef.current.position.y, targetY, 0.1);
      
      // Subtle tilt
      imageRef.current.rotation.x = THREE.MathUtils.lerp(imageRef.current.rotation.x, -state.mouse.y * 0.1, 0.1);
      imageRef.current.rotation.y = THREE.MathUtils.lerp(imageRef.current.rotation.y, state.mouse.x * 0.1, 0.1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.1} floatIntensity={0.2}>
      <DreiImage 
        ref={imageRef}
        url="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" // REPLACE THIS WITH YOUR LOCAL IMAGE PATH e.g. "/profile.jpg"
        scale={[4, 3, 1]} // Adjust aspect ratio [width, height, 1]
        transparent
        opacity={1}
        radius={0.1}
      />
    </Float>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center pt-24 md:pt-0">
      
      {/* Background Layer - Liquid Metal */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <LiquidMetal />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col md:flex-row items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          style={{ y, opacity }} 
          className="w-full md:w-1/2 flex flex-col justify-center z-20"
        >
          <h2 className="text-sm md:text-base font-medium mb-4 uppercase tracking-[0.2em] text-gray-400">
            Java Backend Specialist | Full‐Stack Engineer
          </h2>
          
          <h1 className="text-6xl md:text-8xl leading-[0.9] font-bold font-['Syne'] tracking-tighter mix-blend-difference mb-8">
            MAYANK <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>KALRA</span>
          </h1>

          <div className="border-t border-white/20 pt-8 mt-4 max-w-lg">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Founder-turned-AI specialist building scalable, recruiter-ready systems. I bridge the gap between Java backend precision and human-centric AI experiences.
            </p>
            <div className="flex gap-8 text-sm uppercase tracking-widest text-gray-400">
               <span>Based in India</span>
               <span>Available for work</span>
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative z-10"
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                 <ambientLight intensity={1} />
                 <ProfileImage3D />
              </Suspense>
            </Canvas>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-20 text-xs font-mono animate-pulse hidden md:block">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
};