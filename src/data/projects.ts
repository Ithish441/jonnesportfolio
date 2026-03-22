export interface Project {
  id: number;
  name: string;
  type: string;
  year: string;
  status: 'Live' | 'In Progress' | 'Concept';
  description: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Project #1',
    type: 'Full-Stack Web App',
    year: '2024',
    status: 'Live',
    description: 'Description coming soon. Update this in src/data/projects.ts',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 2,
    name: 'Project #2',
    type: 'Graphic Design',
    year: '2024',
    status: 'Live',
    description: 'Description coming soon. Update this in src/data/projects.ts',
    tags: ['Figma', 'Illustrator', 'Photoshop'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 3,
    name: 'Project #3',
    type: 'Full-Stack Web App',
    year: '2024',
    status: 'In Progress',
    description: 'Description coming soon. Update this in src/data/projects.ts',
    tags: ['Next.js', 'Tailwind', 'PostgreSQL'],
    liveUrl: '#',
    sourceUrl: '#',
  },
];
