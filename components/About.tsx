import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400 sticky top-32">
              The Developer
            </h2>
          </div>

          <div className="md:col-span-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-['Syne'] font-medium leading-[1.2] text-white mb-16"
            >
              "Modular minds. <span className="text-gray-500">Human hearts.</span>"
            </motion.p>

            <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-400 leading-relaxed">
               <p>
                 I am a Founder-turned-AI automation specialist and aspiring edtech entrepreneur. My expertise lies in Java backend development (Spring Boot, Hibernate, REST APIs) and modern frontend frameworks like React and Next.js.
               </p>
               <p>
                 My focus is on building scalable, recruiter-ready systems that blend technical mastery with strategic branding. Whether architecting Modular RAG systems or designing emotionally intelligent interfaces, I aim to create technology that feels human.
               </p>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { label: "Role", value: "Java Specialist" },
                 { label: "Focus", value: "AI Automation" },
                 { label: "Backend", value: "Spring Boot" },
                 { label: "Frontend", value: "React/Next.js" }
               ].map((item, i) => (
                 <div key={i}>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">{item.label}</h4>
                    <p className="text-white text-xl font-['Syne']">{item.value}</p>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};