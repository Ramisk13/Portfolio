import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, Phone } from 'lucide-react'
import contactData from '@/data/contact.json'
import socialData from '@/data/social.json'
import type { ContactData, SocialLink } from '@/types/content'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { assetUrl } from '@/lib/assetUrl'

const data = contactData as ContactData
const links = (socialData as SocialLink[]).filter((l) => l.icon === 'linkedin' || l.icon === 'github')

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail, phone: Phone }

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-grid-glow" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-display text-4xl font-bold text-white sm:text-6xl"
        >
          {data.heading}
        </motion.h2>

        <motion.p variants={fadeUp} custom={2} className="max-w-xl text-lg text-white/60">
          {data.subheading}
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="mt-4">
          <MagneticButton href={`mailto:${data.email}`} variant="primary" strength={0.5}>
            <Mail size={18} />
            {data.email}
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`tel:${data.phone.replace(/\s/g, '')}`}
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            <Phone size={16} /> {data.phone}
          </a>

          {links.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition-colors hover:border-violet-400/40 hover:text-white"
              >
                <Icon size={16} /> {link.name}
              </a>
            )
          })}

          <a
            href={assetUrl(data.resumeUrl)}
            download
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition-colors hover:border-signal-400/40 hover:text-white"
          >
            <Download size={16} /> Resume
          </a>
        </motion.div>

        <motion.p variants={fadeUp} custom={5} className="mt-6 font-mono text-xs text-white/30">
          {data.location}
        </motion.p>
      </motion.div>
    </section>
  )
}
