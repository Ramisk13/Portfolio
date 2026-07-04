export interface HeroData {
  name: string
  title: string
  roles: string[]
  tagline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  location: string
}

export interface AboutStat {
  label: string
  value: string
}

export interface AboutData {
  heading: string
  paragraphs: string[]
  stats: AboutStat[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  companyUrl?: string
  period: string
  location: string
  description: string
  highlights: string[]
  tech: string[]
}

export interface ProjectItem {
  slug: string
  title: string
  summary: string
  description: string
  role: string
  year: string
  tech: string[]
  problem: string
  solution: string
  results: string[]
  liveUrl?: string
  repoUrl?: string
  image: string
  featured: boolean
}

export interface BlogPost {
  title: string
  excerpt: string
  url: string
  date: string
  readTime: string
}

export interface ContactData {
  heading: string
  subheading: string
  email: string
  phone: string
  location: string
  resumeUrl: string
}

export interface SocialLink {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'mail' | 'phone'
}
