'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/lib/resume-data';
import TiltCard from '@/components/TiltCard';
import { Github, Linkedin, Mail, MapPin, Phone, ArrowDown, Code2, Sparkles, Briefcase, GraduationCap, FolderGit2, Rocket, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false, loading: () => null });
const BackgroundParticles = dynamic(() => import('@/components/BackgroundParticles'), { ssr: false, loading: () => null });
const SkillsCube = dynamic(() => import('@/components/SkillsCube'), { ssr: false, loading: () => null });

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && window.scrollY + 120 >= el.offsetTop) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-2 py-2 flex items-center gap-1"
    >
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={`relative text-sm font-medium px-4 py-2 rounded-full transition-colors ${active === s.id ? 'text-white' : 'text-white/60 hover:text-white'}`}>
          {active === s.id && (
            <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-pink-600" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
          )}
          <span className="relative z-10">{s.label}</span>
        </a>
      ))}
    </motion.nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070712]" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-white/80">{resumeData.status} · Open to work</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Hi, I&apos;m <br />
            <span className="glow-text">{resumeData.name}</span>
          </h1>
          <p className="mt-4 text-2xl md:text-3xl font-semibold text-white/90">
            <span className="text-violet-400">&lt;</span>
            {resumeData.title}
            <span className="text-violet-400"> /&gt;</span>
          </p>
          <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">{resumeData.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white border-0 rounded-full px-6 shine">
                <Rocket className="w-4 h-4 mr-2" /> View My Work
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Mail className="w-4 h-4 mr-2" /> Get in Touch
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a href={resumeData.contact.github} target="_blank" rel="noreferrer" className="glass p-3 rounded-full hover:scale-110 transition-transform"><Github className="w-5 h-5" /></a>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer" className="glass p-3 rounded-full hover:scale-110 transition-transform"><Linkedin className="w-5 h-5" /></a>
            <a href={`mailto:${resumeData.contact.email}`} className="glass p-3 rounded-full hover:scale-110 transition-transform"><Mail className="w-5 h-5" /></a>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent ml-2" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative h-[500px] lg:h-[600px]">
          <Scene3D />
        </motion.div>
      </div>

      <motion.a href="#about" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-16">
      <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
        <Icon className="w-4 h-4 text-violet-400" />
        <span className="text-xs uppercase tracking-[0.2em] text-white/70">{eyebrow}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold"><span className="glow-text">{title}</span></h2>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionTitle icon={Sparkles} eyebrow="About me" title="The story so far" />
        <div className="grid lg:grid-cols-3 gap-6">
          <TiltCard className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 h-full">
              <p className="text-lg text-white/80 leading-relaxed">{resumeData.about}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'WebSocket'].map((t) => (
                  <Badge key={t} className="bg-white/10 hover:bg-white/20 text-white border-white/10 rounded-full px-3 py-1">{t}</Badge>
                ))}
              </div>
            </div>
          </TiltCard>
          <TiltCard>
            <div className="glass rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <GraduationCap className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <div className="space-y-4">
                  {resumeData.education.map((ed, i) => (
                    <div key={i} className="border-l-2 border-violet-500 pl-3">
                      <p className="font-medium text-white">{ed.school}</p>
                      <p className="text-sm text-white/70">{ed.degree}</p>
                      <p className="text-xs text-white/50">{ed.date} · {ed.score}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { k: '30%', v: 'Load time reduced' },
            { k: '8+', v: 'Themes shipped' },
            { k: '95+', v: 'Lighthouse score' },
            { k: '$20K', v: 'Revenue generated' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold glow-text">{s.k}</p>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">{s.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionTitle icon={Briefcase} eyebrow="Experience" title="Where I've been building" />
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-pink-500 to-cyan-500" />
          {resumeData.experience.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`relative mb-12 md:mb-16 grid md:grid-cols-2 gap-8 ${i % 2 === 0 ? '' : 'md:[direction:rtl]'}`}>
              <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 ring-4 ring-[#070712] z-10" />
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:[direction:ltr]'}`}>
                <TiltCard max={6}>
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-violet-600/30 text-violet-200 border-violet-500/30 rounded-full">{exp.tag}</Badge>
                      <span className="text-xs text-white/50">{exp.dates}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-violet-300 text-sm mb-1">{exp.company}</p>
                    <p className="text-xs text-white/50 flex items-center gap-1 mb-4"><MapPin className="w-3 h-3" /> {exp.location}</p>
                    <ul className="space-y-2">
                      {exp.points.map((p, idx) => (
                        <li key={idx} className="text-sm text-white/75 flex gap-2"><span className="text-pink-400 mt-1">▸</span><span>{p}</span></li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </div>
              <div className="hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionTitle icon={Code2} eyebrow="Skills" title="My tech stack, in 3D" />
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-[500px] glass rounded-2xl">
            <SkillsCube skills={resumeData.skills} />
            <p className="text-center text-xs text-white/40 -mt-8 relative z-10">Drag to rotate · Each face = a skill category</p>
          </motion.div>
          <div className="space-y-4">
            {Object.entries(resumeData.skills).map(([category, items], i) => (
              <motion.div key={category} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <TiltCard max={4}>
                  <div className="glass rounded-xl p-5">
                    <h4 className="text-sm uppercase tracking-widest text-violet-300 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-violet-600/20 hover:border-violet-500/40 transition-colors">{s}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionTitle icon={FolderGit2} eyebrow="Projects" title="Things I've shipped" />
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {resumeData.projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <TiltCard max={10}>
                <div className="glass rounded-2xl overflow-hidden h-full group">
                  <div className="relative h-44 bg-gradient-to-br from-violet-700 via-fuchsia-600 to-pink-600 overflow-hidden">
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.4), transparent 40%)' }} />
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-7xl font-black text-white/15 group-hover:scale-110 transition-transform">{String(i + 1).padStart(2, '0')}</div>
                    </div>
                    <div className="absolute top-4 right-4"><Badge className="bg-black/40 backdrop-blur text-white border-white/20">Project</Badge></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <a href={p.link} target="_blank" rel="noreferrer" className="shrink-0 text-violet-300 hover:text-white"><ExternalLink className="w-4 h-4" /></a>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {p.points.map((pt, idx) => (
                        <li key={idx} className="text-sm text-white/70 flex gap-2"><span className="text-cyan-400 mt-1">▸</span><span>{pt}</span></li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-200 border border-violet-500/30">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionTitle icon={Mail} eyebrow="Contact" title="Let's build something together" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <TiltCard max={6}>
            <div className="glass rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-600/30 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-600/30 rounded-full blur-[80px]" />
              <div className="relative">
                <p className="text-white/70 mb-2">Available now · {resumeData.status}</p>
                <h3 className="text-3xl md:text-4xl font-bold mb-3">Let&apos;s create magic with code</h3>
                <p className="text-white/60 max-w-xl mx-auto mb-8">Whether you have an idea, a role, or just want to chat about React, Next.js, or 3D web experiences — I&apos;d love to hear from you.</p>
                <a href={`mailto:${resumeData.contact.email}`}>
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-full px-8 shine">
                    <Mail className="w-4 h-4 mr-2" /> {resumeData.contact.email}
                  </Button>
                </a>
                <div className="mt-8 grid sm:grid-cols-3 gap-3 text-left">
                  <a href={`tel:${resumeData.contact.phone}`} className="glass rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <Phone className="w-4 h-4 text-violet-300 mb-1" />
                    <p className="text-xs text-white/50">Phone</p>
                    <p className="text-sm">{resumeData.contact.phone}</p>
                  </a>
                  <div className="glass rounded-xl p-4">
                    <MapPin className="w-4 h-4 text-pink-300 mb-1" />
                    <p className="text-xs text-white/50">Location</p>
                    <p className="text-sm">{resumeData.contact.location}</p>
                  </div>
                  <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer" className="glass rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <Linkedin className="w-4 h-4 text-cyan-300 mb-1" />
                    <p className="text-xs text-white/50">LinkedIn</p>
                    <p className="text-sm">/in/mondira</p>
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
        <p className="text-center text-white/40 text-sm mt-16">Designed & coded in 3D with ♥ by {resumeData.name} · {new Date().getFullYear()}</p>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10 opacity-50 pointer-events-none">
        <BackgroundParticles />
      </div>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;