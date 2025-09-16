
export interface CompanyProfile {
  industry: string;
  hasTF: boolean | null;
  specialists: string;
  hasTraining: boolean | null;
  technologies: string[];
  otherTechnologies: string;
  priorityArea: string;
}

export interface ParsedStrategy {
  diagnosis: string;
  strategy: string;
  roadmap: string;
  review: string;
}

export const TECHNOLOGIES = [
    "OCR (Optical Character Recognition)",
    "NLP (Natural Language Processing)",
    "Computer Vision",
    "Speech Recognition",
    "Chatbots & Conversational AI",
    "Predictive Analytics",
    "Recommender Systems",
    "Generative AI (Text, Image, etc.)",
    "LLM (Large Language Models)",
    "RPA (Robotic Process Automation)",
    "Digital Twin",
    "Reinforcement Learning",
    "AI-powered Cybersecurity",
    "Data Infrastructure & MLOps",
    "기타 (Other)",
];
