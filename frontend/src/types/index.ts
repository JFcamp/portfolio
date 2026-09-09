export type ProjectCategory =
  | 'Machine Learning'
  | 'Computer Vision'
  | 'Generative AI'
  | 'RAG'
  | 'LLMs'
  | 'Agents'
  | 'MLOps'
  | 'Edge AI'
  | 'Data Engineering'
  | 'Research'
  | 'Data Science'
  | 'Automation'
  | 'Backend';

/** Lifecycle status shown as an honest label on each project. */
export type ProjectStatus = 'shipped' | 'in-progress' | 'research';

/** Engineering signals recruiters scan for at a glance. */
export type ProjectBadge =
  | 'CI/CD'
  | 'Live demo'
  | 'Open source'
  | 'Benchmarked'
  | 'Published paper'
  | 'Observability'
  | 'Dockerized'
  | 'Edge deploy'
  | 'From scratch'
  | 'Real-time';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  secondaryTitle: string;
  greeting: string;
  tagline: string;
  specialties: string[];
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  stats: ProfileStat[];
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  dataset: string;
  architecture: string;
  approach: string;
  model: string;
  training: string;
  evaluation: string;
  results: string;
  challenges: string;
  learned: string;
  metrics?: ProjectMetric[];
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  summary: string;
  problem: string;
  /** "What was done" — the engineering narrative. */
  solution: string;
  stack: string[];
  results: string;
  /** Concrete artifact a recruiter can click/see (demo, repo, paper, video). */
  deliverable?: string;
  badges?: ProjectBadge[];
  /** Headline metrics shown on the card / case study (may contain TODO_). */
  metrics?: ProjectMetric[];
  githubUrl: string;
  demoUrl?: string;
  paperUrl?: string;
  caseStudy?: CaseStudy;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  tech: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface TechItem {
  name: string;
}

// ---- Chat / RAG API contracts ----
export type ChatMode = 'default' | 'recruiter';

export interface ChatSource {
  source: string;
  category?: string;
  project?: string;
  section?: string;
}

export interface RetrievedChunk {
  rank: number;
  score: number;
  source: string;
  section?: string | null;
  project?: string | null;
  preview: string;
}

export interface ChatRequest {
  message: string;
  mode?: ChatMode;
  lang?: 'en' | 'pt';
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
  confidence: number;
  retrieved?: RetrievedChunk[];
}
