import React, { useRef, useState } from 'react';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Orbiting Node Component
const SocialOrbiter = ({ radius, speed, offset, icon: Icon, label, href }: any) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      // Keep it facing somewhat towards camera or just slight rotation
      ref.current.rotation.y = -t; 
    }
  });

  return (
    <group ref={ref}>
      <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          onClick={() => window.open(href, '_blank')}
          className="cursor-pointer"
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? "#ffffff" : "#222222"} 
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        
        {/* HTML Label & Icon attached to the mesh */}
        <Html position={[0, 0, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
           <div className={`flex flex-col items-center justify-center transition-all duration-300 ${hovered ? 'scale-125' : 'scale-100 opacity-80'}`}>
              <div className="text-black bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                 <Icon size={24} color={hovered ? "#000" : "#fff"} />
              </div>
              <span className={`mt-2 text-[10px] uppercase tracking-widest font-bold bg-black/80 text-white px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap ${hovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                {label}
              </span>
           </div>
        </Html>
      </Float>
    </group>
  );
};

// Main 3D Scene
const ContactScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#4f46e5" />

      {/* Central Gravitational Core */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#111"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={1}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Orbiting Social Nodes */}
      <SocialOrbiter 
        radius={3.5} 
        speed={0.4} 
        offset={0} 
        icon={Linkedin} 
        label="LinkedIn" 
        href="https://linkedin.com/in/mayankkalra" 
      />
      
      <SocialOrbiter 
        radius={3.5} 
        speed={0.4} 
        offset={Math.PI} // 180 degrees offset
        icon={Github} 
        label="GitHub" 
        href="https://github.com/CMD-Mayank" 
      />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI / 3} />
    </>
  );
};

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#030303] relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="border-t border-white/20 mb-16"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
           {/* Left Column: Info */}
           <div className="relative z-20">
              <h2 className="text-6xl md:text-9xl font-bold font-['Syne'] tracking-tighter leading-[0.9] mb-8">
                LET'S<br />BUILD
              </h2>
              <a href="mailto:mayankkalra03atwork@gmail.com" className="inline-flex flex-wrap items-center gap-4 text-xl md:text-3xl hover:text-gray-400 transition-colors mb-12">
                <span className="break-all border-b border-transparent hover:border-gray-400 transition-all">mayankkalra03atwork@gmail.com</span> 
                <ArrowUpRight className="w-8 h-8 flex-shrink-0" />
              </a>
              
              <div className="text-gray-400 max-w-md">
                <p className="text-lg leading-relaxed">
                  Looking to build a global Gen Z brand or scalable AI business? 
                  I'm available for opportunities that position me to deliver high-impact results.
                </p>
              </div>

               <div className="mt-16 text-sm uppercase tracking-widest text-gray-500">
                 <p>&copy; 2024 Mayank Kalra</p>
                 <p>Designed with Intent</p>
               </div>
           </div>

           {/* Right Column: 3D Interaction */}
           <div className="h-[500px] w-full relative z-10 rounded-2xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm">
              <div className="absolute top-4 left-4 z-20 text-xs font-mono text-gray-500 uppercase tracking-widest">
                Network Node // Drag to Orbit
              </div>
              <Canvas camera={{ position: [0, 2, 7], fov: 45 }}>
                 <ContactScene />
              </Canvas>
           </div>
        </div>
      </div>
    </section>
  );
};