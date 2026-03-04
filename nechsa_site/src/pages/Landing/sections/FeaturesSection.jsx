import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Search, Sparkles, FolderKanban, MessageSquare,
  FileText, ShoppingBag, BarChart3, Shield, Globe,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description: 'Our ML engine analyzes thousands of signals to suggest the perfect business partners, investors, and collaborators for your company.',
    color: 'from-primary-500 to-violet-500',
    tag: 'Core Innovation',
  },
  {
    icon: Search,
    title: 'Advanced Company Search',
    description: 'Filter by sector, country, technology, company size, and partnership type. Find exactly who you need with precision.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FolderKanban,
    title: 'Collaborative Projects',
    description: 'Create projects, invite partners, manage tasks, share documents, and track progress — all in a dedicated workspace.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MessageSquare,
    title: 'Secure Messaging',
    description: 'End-to-end encrypted professional messaging with team chat, video calls, and file sharing. Keep your business conversations private.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FileText,
    title: 'Digital Contracts',
    description: 'Create, negotiate, sign, and archive legally binding contracts online. Legally compliant electronic signatures in 190+ countries.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: ShoppingBag,
    title: 'Resource Marketplace',
    description: 'Discover and share APIs, services, technologies, and expertise. Monetize your capabilities or find what you need.',
    color: 'from-secondary-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights into your partnership performance, project status, market opportunities, and company growth metrics.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Trust & Verification',
    description: 'Multi-layer company verification system with trust scores, reputation badges, and peer reviews for authentic partnerships.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Globe,
    title: 'World Map View',
    description: 'Visualize partner companies on an interactive global map. Explore emerging markets and identify geographic opportunities.',
    color: 'from-orange-500 to-amber-500',
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" ref={ref} className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Everything you need
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            All-in-one{' '}
            <span className="gradient-text">partnership platform</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            From initial discovery to signed contracts, Necha provides every tool your business needs to build powerful global partnerships.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, tag }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass-card rounded-2xl p-6 hover:border-primary-500/40 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className="text-white" />
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold text-lg">{title}</h3>
                {tag && (
                  <span className="text-xs font-semibold text-primary-400 bg-primary-600/20 border border-primary-500/30 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                    {tag}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
