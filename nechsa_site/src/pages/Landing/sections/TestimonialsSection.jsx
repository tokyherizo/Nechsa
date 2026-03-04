import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "Necha helped us find three strategic partners in Southeast Asia within a week. The AI matching is genuinely impressive — every suggestion was highly relevant to our expansion goals.",
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'CloudMatrix Technologies',
    country: '🇸🇬',
    rating: 5,
    avatar: 'SC',
    color: 'from-primary-600 to-blue-600',
  },
  {
    quote: "We signed two partnership contracts and launched a joint AI project, all through Necha. The digital contract system saved us weeks of back-and-forth legal work.",
    name: 'Marc Dubois',
    role: 'Business Development Director',
    company: 'EuroTech Solutions',
    country: '🇫🇷',
    rating: 5,
    avatar: 'MD',
    color: 'from-secondary-600 to-pink-600',
  },
  {
    quote: "As an investor, Necha is a goldmine. I've found 12 high-potential startups in emerging markets that I never would have discovered through traditional channels.",
    name: 'Kaito Yamamoto',
    role: 'Managing Partner',
    company: 'Pacific Ventures',
    country: '🇯🇵',
    rating: 5,
    avatar: 'KY',
    color: 'from-green-600 to-teal-600',
  },
  {
    quote: "The collaborative workspace is phenomenal. Our team of 3 companies across 4 time zones works together seamlessly. Necha literally made our project possible.",
    name: 'Amara Osei',
    role: 'Project Lead',
    company: 'AfriTech Innovations',
    country: '🇬🇭',
    rating: 5,
    avatar: 'AO',
    color: 'from-orange-600 to-amber-600',
  },
  {
    quote: "We were a small startup with big international dreams. Necha leveled the playing field — we're now partnered with companies 100x our size and growing fast.",
    name: 'Elena Petrov',
    role: 'Founder',
    company: 'DataBridge Labs',
    country: '🇪🇪',
    rating: 5,
    avatar: 'EP',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    quote: "The marketplace feature allowed us to monetize our proprietary API and generated $200K in new revenue within the first quarter on the platform.",
    name: 'Raj Patel',
    role: 'CTO',
    company: 'Finserv India',
    country: '🇮🇳',
    rating: 5,
    avatar: 'RP',
    color: 'from-violet-600 to-indigo-600',
  },
]

export default function TestimonialsSection() {
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
            Trusted worldwide
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Businesses love <span className="gradient-text">Necha</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-slate-400">4.9/5 from 2,000+ reviews</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, company, country, rating, avatar, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{avatar}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-slate-400 text-xs">{role} · {country} {company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
