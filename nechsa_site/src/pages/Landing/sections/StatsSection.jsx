import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '10K+', label: 'Verified Companies', color: 'from-primary-500 to-blue-500' },
  { value: '150+', label: 'Countries', color: 'from-secondary-500 to-pink-500' },
  { value: '25K+', label: 'Projects Launched', color: 'from-green-500 to-emerald-500' },
  { value: '$2B+', label: 'Deals Facilitated', color: 'from-yellow-500 to-orange-500' },
]

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 border-y border-white/5 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
                {value}
              </div>
              <div className="text-slate-400 text-sm font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
