export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string; // e.g., 'emerald', 'cyan', 'blue', 'indigo'
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Databases' | 'Cloud' | 'AI' | 'Tools';
  level: number; // 1-5
  experience: string;
  projectsUsedIn: string[];
  description: string;
  iconName: string; // Lucide icon mapping name
}

export interface TimelineEvent {
  year: string;
  title: string;
  institution: string;
  description: string;
  skills: string[];
  type: 'education' | 'milestone' | 'project';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeUrl: string;
  credentialUrl?: string;
  skillsCovered: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
