export type PortfolioConfig = {
  name: string
  title: string
  bio: string
  status: string
  location: string
  timezone: string
  email: string
  resumeUrl: string
  avatar?: string
  terminal: {
    commands: Record<string, string[]>
  }
  techStack: {
    frontend: string[]
    backend: string[]
    cloud: string[]
    ai: string[]
  }
  projects: Array<{
    id: string
    name: string
    description: string
    tech: string[]
    github: string
    demo: string
    stars: number
    gradient: string
  }>
  metrics: Array<{
    label: string
    value: string
  }>
  socials: {
    github: string
    linkedin: string
    twitter: string
    email: string
  }
}

export const portfolioConfig: PortfolioConfig = {
  name: "Alex Chen",
  title: "Full-Stack Engineer & Systems Architect",
  bio: "Crafting ultra-premium digital experiences with a focus on performance, design systems, and developer tooling.",
  status: "Available for opportunities",
  location: "San Francisco, CA",
  timezone: "PST (UTC-8)",
  email: "alex@bento-os.dev",
  resumeUrl: "/resume.pdf",
  terminal: {
    commands: {
      whoami: ["alexchen", "Full-Stack Engineer passionate about building delightful products."],
      stack: [
        "Frontend: TypeScript, React, Next.js, Tailwind CSS",
        "Backend: Node.js, tRPC, Prisma, PostgreSQL",
        "Cloud/DevOps: Vercel, AWS, Docker, GitHub Actions",
        "AI: OpenAI, LangChain, Vector DBs"
      ],
      experience: [
        "7+ years building scalable web applications",
        "Led engineering teams at high-growth startups",
        "Specialized in performance optimization & design systems"
      ],
      contact: ["Email: alex@bento-os.dev", "LinkedIn: linkedin.com/in/alexchen", "GitHub: github.com/alexchen"],
      clear: []
    }
  },
  techStack: {
    frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "tRPC", "Prisma", "PostgreSQL", "Redis"],
    cloud: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare"],
    ai: ["OpenAI", "LangChain", "V0", "Cursor", "Vector DBs"]
  },
  projects: [
    {
      id: "nexus",
      name: "Nexus Design System",
      description: "Enterprise-grade component library with 50+ components, full TypeScript support, and comprehensive documentation.",
      tech: ["React", "TypeScript", "Storybook", "Radix UI"],
      github: "https://github.com/alexchen/nexus",
      demo: "https://nexus.alexchen.dev",
      stars: 2847,
      gradient: "from-emerald-500/20 to-cyan-500/20"
    },
    {
      id: "flux",
      name: "Flux API Gateway",
      description: "High-performance API gateway with rate limiting, auth, caching, and real-time monitoring dashboard.",
      tech: ["Node.js", "Redis", "GraphQL", "Prometheus"],
      github: "https://github.com/alexchen/flux",
      demo: "https://flux.alexchen.dev",
      stars: 1923,
      gradient: "from-violet-500/20 to-fuchsia-500/20"
    },
    {
      id: "orbit",
      name: "Orbit Analytics",
      description: "Real-time analytics platform with interactive dashboards, custom visualizations, and team collaboration features.",
      tech: ["Next.js", "D3.js", "PostgreSQL", "WebSocket"],
      github: "https://github.com/alexchen/orbit",
      demo: "https://orbit.alexchen.dev",
      stars: 1654,
      gradient: "from-amber-500/20 to-orange-500/20"
    }
  ],
  metrics: [
    { label: "Years Experience", value: "7+ Yrs Exp" },
    { label: "Uptime", value: "99.9% Uptime" },
    { label: "Shipped Apps", value: "40+ Shipped Apps" }
  ],
  socials: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://x.com/alexchen",
    email: "mailto:alex@bento-os.dev"
  }
}
