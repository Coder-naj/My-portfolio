export const portfolioData = {
  profile: {
    name: "Abdullah",
    role: "Frontend Engineer & AI Enthusiast",
    availability: "Available for Projects",
    location: "Dhaka, Bangladesh",
    timezone: "Asia/Dhaka",
    coordinates: "23.8103° N, 90.4125° E",
    currently: { role: "Freelance Web Developer", company: "Upwork,freelancer.com" },
    image: "pt.png", 
    // optional: transparent PNG in /public shows the cut-out portrait in the hero
    email: "zillu.naj@gmail.com",
    tagline: "Crafting scalable architectures and high-impact interactive web experiences.",
    manifesto: "I CRAFT RESILIENT CODE, MODERN ARCHITECTURES & HIGH-IMPACT EXPERIENCES.",
    stats: [
      { count: 2, label: "Years Experience" },
      { count: 2, label: "Shipped Projects" },
      { count: 2, label: "Cloud Deployments" }
    ],
    socials: [
      { name: "GitHub", url: "https://github.com/Coder-naj" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/md-zillur-rahman-70b59051/" },
      { name: "Twitter/X", url: "https://x.com/ZillurN" }
    ]
  },
  projects: [
  {
    id: "physistep",
    index: "01",
    title: "PhysiStep",
    category: "Cloud & DevOps",
    categoryLabel: "Cloud & DevOps",
    year: "2026",
    summary: "Physics & Math problem-solving web application.",
    tags: ["TypeScript", "Vite", "Bun", "React", "Google AI Studio"],
    metrics: "Interactive solver with real-time calculation support",
    description: "A modern web app designed to help users solve physics and mathematics problems step-by-step. Built with TypeScript and Vite, featuring a clean interface and backend support via server.ts.",
    solution: "Leveraged Vite + TypeScript for fast development and type safety, integrated Bun for package management, and structured the app for easy extension with AI-assisted solving capabilities."
  },
  {
    id: "movie-explorer",
    index: "02",
    title: "Movie Explorer",
    category: "Full-Stack",
    categoryLabel: "Full-Stack",
    year: "2026",
    summary: "Responsive movie browsing and discovery application.",
    tags: ["JavaScript", "React", "Vite", "Vercel"],
    metrics: "Deployed live on Vercel",
    description: "A React-based movie explorer that allows users to search, browse, and discover movies. Built with Vite for fast development and hot module replacement, deployed at movie-explorer-three25.vercel.app.",
    solution: "Used React + Vite template with modern ESLint configuration for a clean, maintainable frontend focused on smooth user experience and responsive design."
  },
  {
    id: "weather-app",
    index: "03",
    title: "Weather App",
    category: "Creative/UI",
    categoryLabel: "Creative/UI",
    year: "2026",
    summary: "Real-time weather information web application.",
    tags: ["JavaScript", "React", "Vite"],
    metrics: "Clean and responsive weather dashboard",
    description: "A lightweight weather application built with React and Vite that fetches and displays current weather data with a modern, user-friendly interface.",
    solution: "Implemented using the React + Vite stack for rapid prototyping and efficient rendering of dynamic weather information."
  },
  {
    id: "futuristic-cv",
    index: "04",
    title: "Futuristic CV",
    category: "web",
    categoryLabel: "Web Development",
    year: "2026",
    summary: "Modern, futuristic-style personal portfolio / CV website.",
    tags: ["JavaScript", "React", "Vite", "GitHub Actions"],
    metrics: "Includes CI workflow for automated builds",
    description: "A visually striking personal CV/portfolio site with a futuristic design aesthetic. Built as a React single-page application with Vite and includes GitHub Actions for continuous integration.",
    solution: "Created a polished frontend experience using React + Vite and automated the deployment pipeline with GitHub Actions workflows."
  },
  {
    id: "foundation-assignment",
    index: "05",
    title: "Foundation Program Assignment",
    category: "learning",
    categoryLabel: "Learning & Practice",
    year: "2026",
    summary: "JavaScript solution for Foundation Program Assignment 1.",
    tags: ["JavaScript"],
    metrics: "Completed coding assignment",
    description: "A focused JavaScript solution repository for Foundation Program Assignment 1, containing the core answer implementation.",
    solution: "Delivered a clean and functional JavaScript solution demonstrating foundational programming concepts."
  }

  ],
  services: [
    {
      number: "01",
      title: "Backend & Systems",
      desc: "Architecting reliable, high-throughput APIs and distributed systems using Python, Go, and Node."
    },
    {
      number: "02",
      title: "Cloud & DevOps",
      desc: "Automated CI/CD pipelines, container orchestration with Kubernetes, Docker, and IaC with Terraform."
    },
    {
      number: "03",
      title: "Frontend Engineering",
      desc: "Delivering fast, accessible, interactive web applications using React, Next.js, Tailwind, and GSAP."
    },
    {
      number: "04",
      title: "Performance & Security",
      desc: "Auditing bottlenecks, implementing Redis caching layers, and establishing zero-trust access controls."
    }
  ],
  skills: [
    "Python", "Django", "TypeScript", "React", "Next.js", "Tailwind CSS", "GSAP"
  ],
  experience: [
    {
      role: "Freelance Web Developer",
      company: "Freelance",
      period: "2026 — Present",
      desc: "Overseeing cloud infrastructure migration, reducing latency by 35% and mentoring engineering teams."
    },
    {
      role: "Full-Stack Developer",
      company: "Freelance",
      period: "2026 — present",
      desc: "Engineered scalable microservices and customer-facing interfaces serving 500k monthly active users."
    },
    {
      role: "Software Developer",
      company: "Freelance",
      period: "2026 — Present",
      desc: "Developed RESTful APIs and real-time WebSocket communication backends for collaborative tools."
    }
  ]
};
