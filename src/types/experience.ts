export type Experience = {
  startYear: number;
  endYear?: number;
  role: string;
  company: {
    name: string;
    url?: string;
  };
  description: {
    en: string;
    es: string;
  };
  technologies?: string[];
};
