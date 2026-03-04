import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Target, TrendingUp, Users, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const matches = [
  { name: 'QuantumAI Labs', country: '🇺🇸', sector: 'AI / Machine Learning', score: 97, tags: ['Deep Learning', 'NLP', 'Computer Vision'] },
  { name: 'GreenFuture Energy', country: '🇩🇪', sector: 'Renewable Energy', score: 92, tags: ['Solar', 'Wind', 'Storage'] },
  { name: 'FinTechBridge', country: '🇸🇬', sector: 'Financial Technology', score: 89, tags: ['Payments', 'Blockchain', 'DeFi'] },
  { name: 'MedConnect Asia', country: '🇯🇵', sector: 'Healthcare Tech', score: 85, tags: ['Telemedicine', 'AI Diagnostics'] },
]

const aiPoints = [
  'Analyzes 50+ compatibility signals',
  'Considers market overlap & synergies',
  'Evaluates past project success rates',
  'Matches based on strategic goals',
  'Updated in real-time as you grow',
]

export default function MatchingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — demo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* AI Analysis card */}
            <div className="glass-card rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">AI Matching Engine</p>
                  <p className="text-slate-400 text-xs">Analyzing 10,247 companies…</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-green-400 font-semibold bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full">● Live</span>
                </div>
              </div>
              {/* Progress bars simulation */}
              {['Sector alignment', 'Tech stack', 'Market overlap', 'Strategic fit'].map((label, i) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-primary-400 font-semibold">{[97, 88, 93, 95][i]}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${[97, 88, 93, 95][i]}%` } : {}}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Match results */}
            <div className="space-y-3">
              {matches.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-primary-500/40 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600/30 to-secondary-600/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{m.country}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-semibold text-sm truncate">{m.name}</p>
                      <span className="text-xs text-green-400 font-bold flex-shrink-0">{m.score}% match</span>
                    </div>
                    <p className="text-slate-400 text-xs mb-1.5">{m.sector}</p>
                    <div className="flex flex-wrap gap-1">
                      {m.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark-600">
                      <div className="h-full bg-gradient-to-b from-green-500 to-transparent" style={{ height: `${m.score}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Our Main Innovation
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              AI that finds your{' '}
              <span className="gradient-text">perfect partners</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Stop spending weeks searching for the right partners. Necha's machine learning engine analyzes your company profile, goals, and capabilities to instantly surface the most compatible businesses worldwide.
            </p>

            <ul className="space-y-3 mb-8">
              {aiPoints.map(point => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-600/20 border border-primary-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-primary-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Target, value: '94%', label: 'Match accuracy' },
                { icon: TrendingUp, value: '3x', label: 'Faster deals' },
                { icon: Users, value: '8,000+', label: 'Active matches' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center p-4 glass-card rounded-xl">
                  <Icon size={18} className="text-primary-400 mx-auto mb-2" />
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-slate-400 text-xs">{label}</div>
                </div>
              ))}
            </div>

            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              Try AI Matching Free
              <Sparkles size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
