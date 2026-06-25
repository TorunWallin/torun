export interface Package {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  colorTheme: "terracotta" | "moss" | "clay" | "sage";
  originalPrice?: string;
  badge?: string;
  outputGoal?: string;
  buttonText?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  quote: string;
  tags: string[];
}

export interface Article {
  id: string;
  title: string;
  category: "Menscykel" | "Styrketräning" | "Återhämtning" | "Mindset";
  readTime: string;
  excerpt: string;
  content: string[];
}

export interface ApplicationAnswers {
  name: string;
  email: string;
  packageId: string;
  currentPhase: string; // e.g., Klimakteriet, Postpartum, Stressig vardag
  mainIntention: string; // e.g., Bygga styrka inifrån, Hitta träningsglädje
  historyWithFitness: string;
  anythingElse: string;
}
