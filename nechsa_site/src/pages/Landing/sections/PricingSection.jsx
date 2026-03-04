import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Sparkles, Zap, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for startups and small businesses exploring global partnerships.',
    icon: Zap,
    color: 'from-slate-500 to-slate-600',
    features: [
      'Company profile (public)',
      'Basic company search',
      'Up to 5 partnership requests/month',
      '1 active project',
      'In-app messaging (limited)',
      'Community support',
    ],
    cta: 'Get Started Free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Business',
    price: { monthly: 99, annual: 79 },
    description: 'For growing companies ready to build serious international partnerships.',
    icon: Sparkles,
    color: 'from-primary-500 to-secondary-500',
    features: [
      'Everything in Starter',
      'AI Matching (unlimited)',
      'Unlimited partnership requests',
      'Unlimited projects & tasks',
      'Full messaging + video calls',
      'Digital contract signing',
      'Marketplace listing',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Start 14-day Free Trial',
    href: '/register?plan=business',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: { monthly: 399, annual: 299 },
    description: 'For large companies with strategic global partnership programs.',
    icon: Building2,
    color: 'from-orange-500 to-amber-500',
    features: [
      'Everything in Business',
      'Dedicated account manager',
      'Custom AI matching models',
      'API access',
      'SSO & advanced security',
      'Team roles & permissions',
      'White-label options',
      'Custom contracts & SLA',
      'Onboarding & training',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlight: false,
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" ref={ref} className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Simple pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Plans for every <span className="gradient-text">stage of growth</span>
          </h2>
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-primary-600' : 'bg-dark-600'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-slate-400'}`}>
              Annual
              <span className="ml-2 text-xs text-green-400 font-semibold bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(({ name, price, description, icon: Icon, color, features, cta, href, highlight, badge }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-8 flex flex-col relative ${
                highlight ? 'border-primary-500/50 glow-primary' : ''
              }`}
            >
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    {badge}
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={22} className="text-white" />
              </div>

              <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
              <p className="text-slate-400 text-sm mb-6">{description}</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-white">
                  ${annual ? price.annual : price.monthly}
                </span>
                {price.monthly > 0 && (
                  <span className="text-slate-400 text-sm ml-1">/month</span>
                )}
                {price.monthly === 0 && (
                  <span className="text-slate-400 text-sm ml-1">forever</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={15} className="text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={href}
                className={`w-full text-center font-semibold py-3 rounded-xl transition-all text-sm ${
                  highlight
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white shadow-lg hover:shadow-primary-500/30'
                    : 'border border-white/10 hover:border-primary-500/50 text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
