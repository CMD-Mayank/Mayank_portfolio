import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: 'AI' | 'Backend' | 'Product';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string; // Lucide icon name or 3d model ref
  category: 'Automation' | 'Development' | 'Branding';
}

export interface Goal {
  year: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'future';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}