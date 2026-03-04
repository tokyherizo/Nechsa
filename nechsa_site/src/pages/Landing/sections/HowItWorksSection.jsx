import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, Search, MessageSquare, FileText, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create your company profile',
    description: 'Set up a verified professional profile with your sector, capabilities, and partnership goals.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10 border-primary-500/30',
  },
  {
    icon: Search,
    step: '02',
    title: 'Discover & get matched',
    description: 'Our AI instantly surfaces the most compatible companies, investors, and collaborators for your goals.',
    color: 'text-secondary-400',
    bg: 'bg-secondary-500/10 border-secondary-500/30',
  },
  {
    icon: MessageSquare,
    step: '03',
    title: 'Connect & collaborate',
    description: 'Reach out, start conversations, and build your project workspace with selected partners.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
  },
  {
    icon: FileText,
    step: '04',
    title: 'Sign agreements',
    description: 'Formalize partnerships with legally binding digital contracts signed right on the platform.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/30',
  },
  {
    icon: TrendingUp,
    step: '05',
    title: 'Grow internationally',
    description: 'Execute projects, track progress, measure impact, and scale your global business network.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/30',
  },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Simple process
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            How <span className="gradient-text">Necha</span> works
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            From sign-up to your first signed partnership in under 30 minutes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-secondary-500/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map(({ icon: Icon, step, title, description, color, bg }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-start gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row`}
              >
                <div className={i % 2 === 0 ? 'lg:flex-1 lg:text-right' : 'lg:flex-1'}>
                  <div className={`glass-card rounded-2xl p-6 inline-block max-w-md ${i % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl border ${bg} flex items-center justify-center mb-4`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className={`text-5xl font-black ${color} opacity-20 mb-1`}>{step}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative flex-shrink-0 w-16 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 ring-4 ring-dark-900 z-10`} />
                </div>

                <div className="lg:flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
