import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-primary-600/20 via-transparent to-transparent rounded-3xl" />

          <div className="relative glass-card rounded-3xl p-12 lg:p-16 overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

            <Globe size={48} className="text-primary-400 mx-auto mb-6" />

            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Ready to go{' '}
              <span className="gradient-text">global?</span>
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of companies already building the future of business together. Your next partnership is one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 text-base"
              >
                Create Free Company Profile
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/companies"
                className="flex items-center justify-center font-semibold px-10 py-4 rounded-xl border border-white/10 hover:border-primary-500/50 text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/5 text-base"
              >
                Browse Companies
              </Link>
            </div>

            <p className="text-slate-500 text-sm mt-6">
              Free forever · No credit card required · Set up in 5 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
