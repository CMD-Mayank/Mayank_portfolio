import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
}

const projects: ProjectData[] = [
  { 
    id: "01",
    title: "Shraya.ai", 
    category: "AI Agent Platform", 
    year: "2024",
    description: "Modular AI platform featuring Spring Boot backend and culturally adaptive, multilingual agents." 
  },
  { 
    id: "02",
    title: "SwiftWash", 
    category: "Service Platform", 
    year: "2023",
    description: "Doorstep car washing service with Java + PostgreSQL architecture and integrated payment gateways." 
  },
  { 
    id: "03",
    title: "Portfolio 2024", 
    category: "Interactive Web", 
    year: "2024",
    description: "Recruiter-optimized interactive experience showcasing backend mastery through live API concepts." 
  },
  { 
    id: "04",
    title: "Echo Sim", 
    category: "EdTech", 
    year: "2023",
    description: "Realistic scenario simulation engine for student training." 
  },
];

interface ProjectItemProps {
  project: ProjectData;
  index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative border-t border-white/10 py-12 md:py-20 cursor-pointer transition-colors hover:bg-white/5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-baseline justify-between gap-6 md:gap-12 relative z-10">
        
        {/* Index */}
        <span className="text-sm font-mono text-gray-500">/ {project.id}</span>
        
        {/* Title */}
        <h3 className="text-4xl md:text-7xl font-bold font-['Syne'] text-white group-hover:translate-x-4 transition-transform duration-500">
          {project.title}
        </h3>

        {/* Info */}
        <div className="md:ml-auto md:w-80">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs uppercase tracking-widest text-gray-400">{project.category}</span>
             <span className="text-xs font-mono text-gray-500">{project.year}</span>
           </div>
           <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300 leading-relaxed">
             {project.description}
           </p>
        </div>

        {/* Icon */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <ArrowUpRight className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-[#030303]">
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400 mb-8">Featured Projects</h2>
      </div>

      <div className="w-full">
        {projects.map((project, idx) => (
          <ProjectItem key={idx} project={project} index={idx} />
        ))}
      </div>
      
      <div className="container mx-auto px-6 md:px-12 pt-20 border-t border-white/10">
         <a href="https://github.com/CMD-Mayank" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg hover:underline underline-offset-4 text-white">
            View Github Archive <ArrowUpRight className="w-4 h-4" />
         </a>
      </div>
    </section>
  );
};