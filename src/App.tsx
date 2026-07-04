import { useState } from 'react'
import { useLenis } from '@/hooks/useLenis'
import Loader from '@/components/layout/Loader'
import CustomCursor from '@/components/layout/CustomCursor'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
