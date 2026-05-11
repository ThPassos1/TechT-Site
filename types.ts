
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Nova Estrutura - Growth System (TechT Growth System)
export interface SystemStep {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  details?: string;
}

// Funnel Flow - Como funciona
export interface FunnelStep {
  step: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Benefícios
export interface Benefit {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

// Funcionalidades IA
export interface AIFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  hint?: string;
}

// Planos
export interface PlanCard {
  name: string;
  badge?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

// Problemas/Dores
export interface ProblemItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
