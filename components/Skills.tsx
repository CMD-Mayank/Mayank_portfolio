import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, MeshDistortMaterial, Text, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const skillCategories = [
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "Hibernate", "Microservices", "REST APIs"]
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Three.js", "Tailwind", "TypeScript"]
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "PostgreSQL"]
  },
  {
    title: "AI & RAG",
    skills: ["LLMs", "LangChain", "Python", "Vector DBs", "Agents"]
  }
];

// Individual Skill Node
const SkillOrb: React.FC<{ text: string; position: [number, number, number]; color?: string }> = ({ text, position, color = "#ffffff" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      if (hovered) {
         meshRef.current.rotation.x += 0.05;
         meshRef.current.rotation.y += 0.05;
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <icosahedronGeometry args={[0.5, 0]} />
          <MeshDistortMaterial
            color={hovered ? "#6366f1" : "#1a1a1a"}
            emissive={hovered ? "#4f46e5" : color}
            emissiveIntensity={hovered ? 2 : 0.2}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={!hovered}
          />
        </mesh>
        
        <Html position={[0, -0.8, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
           <div className={`transition-all duration-300 ${hovered ? 'scale-110 opacity-100' : 'scale-90 opacity-60'}`}>
              <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded whitespace-nowrap shadow-lg">
                 <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase font-mono">{text}</span>
              </div>
           </div>
        </Html>
      </Float>
    </group>
  );
};

// Scene for a specific category
const CategoryGroup = ({ title, skills }: { title: string; skills: string[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
     if (groupRef.current) {
       // Slow rotation of the entire cluster
       groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
     }
  });

  const radius = 2.5;

  return (
    <group>
        {/* Center Title */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
             position={[0, 0, 0]}
             fontSize={0.5}
             color="white"
             anchorX="center"
             anchorY="middle"
             outlineWidth={0.01}
             outlineColor="#444"
             font="https://fonts.gstatic.com/s/syne/v16/8vIS7w4Yz0quhgg6VyN9.woff" 
          >
            {title.toUpperCase()}
          </Text>
        </Float>

        {/* Orbiting Skills */}
        <group ref={groupRef}>
          {skills.map((skill, i) => {
             const angle = (i / skills.length) * Math.PI * 2;
             const x = Math.cos(angle) * radius;
             const z = Math.sin(angle) * radius;
             return <SkillOrb key={i} text={skill} position={[x, 0, z] as [number, number, number]} />;
          })}
        </group>
    </group>
  );
};

export const Skills: React.FC = () => {
  return (
    <section className="py-32 bg-[#030303] border-t border-white/10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
              Technical Arsenal
            </h2>
            <p className="text-3xl md:text-5xl font-['Syne'] font-bold text-white">
              Interactive Proficiency
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {skillCategories.map((category, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="h-[350px] w-full bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors"
             >
                <div className="absolute top-4 left-6 z-10">
                   <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                     // SYSTEM_{idx + 1} :: {category.title.toUpperCase()}
                   </span>
                </div>
                
                {/* 3D Scene */}
                <div className="w-full h-full cursor-grab active:cursor-grabbing">
                  <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                     <ambientLight intensity={1} />
                     <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
                     <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
                     <CategoryGroup title={category.title} skills={category.skills} />
                  </Canvas>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <div className="w-8 h-8 border-r border-b border-white"></div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};