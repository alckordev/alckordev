export type Experience = {
  startYear: number;
  endYear?: number;
  role: string;
  company: {
    name: string;
    url?: string;
  };
  description: string;
  technologies?: string[];
};
