import { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    startYear: 2026,
    role: "Full Stack Engineer",
    company: {
      name: "Interseguro",
      url: "https://www.interseguro.pe",
    },
    description: {
      en: "I'm part of the Customer Experience squad, developing end-to-end solutions that directly impact the user experience. I work on frontend and backend, collaborating with the team to build maintainable, scalable, user-centered digital products.",
      es: "Integro el squad de Experiencia al Cliente, desarrollando soluciones end-to-end que impactan directamente en la experiencia de los usuarios. Trabajo en frontend y backend, colaborando con el equipo en la construcción de productos digitales mantenibles, escalables y centrados en el usuario.",
    },
    technologies: [
      "Go",
      "TypeScript",
      "Node.js",
      "Vue",
      "MongoDB",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
      "GCP",
    ],
  },
  {
    startYear: 2016,
    endYear: 2025,
    role: "Full Stack Developer",
    company: {
      name: "Nativos Digitales",
      url: "https://nativosdigitales.pe",
    },
    description: {
      en: "As a Full Stack Developer, I built and maintained web applications across the entire stack. I developed features using Astro, Next.js, React, .NET and Node.js, integrated with PostgreSQL, MySQL and SQL Server, and worked with the team to deliver projects on time. I contributed to both frontend and backend, from UI components to APIs and databases.",
      es: "Como Full Stack Developer, construí y mantuve aplicaciones web en todo el stack. Desarrollé funcionalidades con Astro, Next.js, React, .NET y Node.js, integré con PostgreSQL, MySQL y SQL Server, y trabajé con el equipo para entregar proyectos a tiempo. Contribuí en frontend y backend, desde componentes de UI hasta APIs y bases de datos.",
    },
    technologies: [
      "TypeScript",
      "Astro",
      "Next.js",
      "React",
      ".NET",
      "NestJS",
      "Symfony",
      "Tailwind CSS",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Prisma",
      "Docker",
    ],
  },
];
