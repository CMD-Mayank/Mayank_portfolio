import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Goals } from './components/Goals';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Goals />
        <Contact />
      </main>
    </div>
  );
}

export default App;