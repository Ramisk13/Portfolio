import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import heroData from '@/data/hero.json'
import socialData from '@/data/social.json'
import type { SocialLink } from '@/types/content'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
}

const links = socialData as SocialLink[]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950 px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-xs text-white/40">
          © {new Date().getFullYear()} {heroData.name}. Built with React, Tailwind &amp; a lot of easing curves.
        </p>
        <div className="flex items-center gap-4">
          {links.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor-hover
                aria-label={link.name}
                className="text-white/50 transition-colors hover:text-cyan-400"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
