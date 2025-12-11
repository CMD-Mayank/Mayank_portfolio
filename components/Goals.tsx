import React from 'react';

const roadmap = [
  {
    year: "Current",
    role: "Founder & Architect",
    entity: "Shraya.ai",
    description: "Building modular AI agents & scalable backend systems."
  },
  {
    year: "Target",
    role: "Principal Engineer",
    entity: "High-Impact Roles",
    description: "Delivering enterprise-grade systems (~₹1cr/yr value)."
  },
  {
    year: "Vision",
    role: "Brand Builder",
    entity: "Global Gen Z Ventures",
    description: "Scaling digital businesses via AI automation."
  }
];

export const Goals: React.FC = () => {
  return (
    <section className="py-24 bg-[#030303]">
       <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                  Career Roadmap
                </h2>
             </div>
             
             <div className="md:col-span-8">
                {roadmap.map((item, i) => (
                   <div key={i} className="flex flex-col md:flex-row justify-between md:items-center py-8 border-b border-white/10 group hover:bg-white/5 transition-colors px-4 -mx-4 cursor-default">
                      <div className="mb-4 md:mb-0">
                         <h4 className="text-xl md:text-2xl font-['Syne'] font-bold text-white mb-1">{item.role}</h4>
                         <p className="text-gray-500">{item.entity}</p>
                         <p className="text-sm text-gray-600 mt-2 md:hidden">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono text-white/60 block mb-1">{item.year}</span>
                        <span className="text-xs text-gray-600 hidden md:block">{item.description}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};