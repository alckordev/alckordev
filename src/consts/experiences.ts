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
      en: "As a Full Stack Engineer, I design and build scalable systems end-to-end. I own architecture decisions, define technical standards, and implement solutions across backend and frontend. I work with NestJS, Go, Vue and Nuxt to deliver robust applications, and I collaborate with product and other teams to align technical delivery with business objectives.",
      es: "Como Full Stack Engineer, diseño y construyo sistemas escalables de punta a punta. Me responsabilizo de decisiones de arquitectura, defino estándares técnicos e implemento soluciones en backend y frontend. Trabajo con NestJS, Go, Vue y Nuxt para entregar aplicaciones robustas, y colaboro con producto y otros equipos para alinear la entrega técnica con los objetivos del negocio.",
    },
    technologies: [
      "Go",
      "TypeScript",
      "NestJS",
      "Vue",
      "Nuxt",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AWS",
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
