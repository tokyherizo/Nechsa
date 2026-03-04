import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Sparkles, Shield, Zap } from 'lucide-react'

const floatingCompanies = [
  { name: 'TechCorp', country: '🇺🇸', sector: 'AI' },
  { name: 'FinEdge', country: '🇬🇧', sector: 'Fintech' },
  { name: 'GreenPower', country: '🇩🇪', sector: 'Energy' },
  { name: 'MediSync', country: '🇯🇵', sector: 'Health' },
  { name: 'CloudBase', country: '🇨🇦', sector: 'Cloud' },
  { name: 'DataFlow', country: '🇫🇷', sector: 'Data' },
]

const badges = [
  { icon: Shield, text: 'Verified Companies' },
  { icon: Sparkles, text: 'AI-Powered Matching' },
  { icon: Globe, text: '150+ Countries' },
  { icon: Zap, text: 'Real-time Collaboration' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-dark-900">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent" />

      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary-600/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles size={14} className="text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">AI-Powered Business Matching</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6"
            >
              Connect.{' '}
              <span className="gradient-text">Collaborate.</span>
              {' '}Grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              The global platform that connects businesses worldwide. Find partners, launch collaborative projects, sign contracts, and unlock international opportunities — all in one place.
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {badges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Icon size={13} className="text-primary-400" />
                  <span className="text-slate-300 text-xs font-medium">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 text-base"
              >
                Start for Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-primary-500/50 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/5 text-base"
              >
                Explore Features
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-slate-500 text-sm mt-6"
            >
              Trusted by <strong className="text-slate-300">10,000+</strong> companies in <strong className="text-slate-300">150+</strong> countries
            </motion.p>
          </div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Central hub */}
            <div className="relative w-96 h-96 mx-auto">
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-primary-500/20" />
              <div className="absolute inset-8 rounded-full border border-primary-500/15" />
              <div className="absolute inset-16 rounded-full border border-primary-500/10" />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/40 glow-primary">
                  <Globe size={48} className="text-white" />
                </div>
              </div>

              {/* Orbiting company cards */}
              {floatingCompanies.map((company, i) => {
                const angle = (i / floatingCompanies.length) * 360
                const rad = (angle * Math.PI) / 180
                const r = 170
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r
                return (
                  <motion.div
                    key={company.name}
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'linear' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'linear' }}
                      className="glass-card rounded-xl px-3 py-2 whitespace-nowrap"
                    >
                      <span className="text-sm">{company.country}</span>
                      <span className="text-white text-xs font-semibold ml-1">{company.name}</span>
                      <span className="text-primary-400 text-xs ml-1">·{company.sector}</span>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Floating match card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -right-4 glass-card rounded-xl p-4 w-64"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-primary-400" />
                <span className="text-primary-400 text-xs font-semibold">AI Match Found!</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SF</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">SolarFuture GmbH</p>
                  <p className="text-slate-400 text-xs">🇩🇪 Renewable Energy · 94% match</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-dark-600 rounded-full">
                <div className="h-full w-[94%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
