import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, Star, Globe, Code, Brain, Cloud, CreditCard, Plus } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All', icon: ShoppingBag },
  { id: 'api', label: 'APIs', icon: Code },
  { id: 'ai', label: 'AI Services', icon: Brain },
  { id: 'cloud', label: 'Cloud', icon: Cloud },
  { id: 'fintech', label: 'Fintech', icon: CreditCard },
  { id: 'consulting', label: 'Consulting', icon: Globe },
]

const mockItems = [
  { id: 1, name: 'FraudShield API', category: 'api', company: 'FinTechBridge', country: '🇸🇬', description: 'Real-time transaction fraud detection API with 99.8% accuracy. Supports 50+ currencies.', price: '$0.001/call', rating: 4.9, reviews: 142, tags: ['Fraud', 'Payments', 'ML'], badge: 'Top Rated' },
  { id: 2, name: 'NLP Text Analytics Suite', category: 'ai', company: 'QuantumAI Labs', country: '🇺🇸', description: 'Sentiment analysis, entity extraction, and classification in 45 languages. REST & GraphQL.', price: '$299/mo', rating: 4.8, reviews: 89, tags: ['NLP', 'AI', 'Analytics'] },
  { id: 3, name: 'SolarGrid Monitor SDK', category: 'api', company: 'GreenFuture Energy', country: '🇩🇪', description: 'IoT SDK for monitoring renewable energy grids. Real-time data, alerts, and analytics.', price: '$149/mo', rating: 4.7, reviews: 54, tags: ['IoT', 'Energy', 'SDK'] },
  { id: 4, name: 'Distributed Cloud Infra', category: 'cloud', company: 'CloudScale Inc.', country: '🇨🇦', description: 'Multi-region cloud orchestration with auto-scaling. SOC2 certified, 99.99% SLA.', price: 'From $500/mo', rating: 4.9, reviews: 67, tags: ['AWS', 'GCP', 'K8s'], badge: 'Verified' },
  { id: 5, name: 'AI Strategy Consulting', category: 'consulting', company: 'QuantumAI Labs', country: '🇺🇸', description: '12-week AI transformation program for enterprises. Includes roadmap, PoC, and team training.', price: '$15K/project', rating: 5.0, reviews: 23, tags: ['Strategy', 'AI', 'Enterprise'] },
  { id: 6, name: 'Cross-Border Payment API', category: 'fintech', company: 'FinTechBridge', country: '🇸🇬', description: 'Send and receive payments in 180 countries. Transparent fees, instant settlement.', price: '0.5% per tx', rating: 4.8, reviews: 201, tags: ['Payments', 'Global', 'API'], badge: 'Best Value' },
  { id: 7, name: 'Medical Data Anonymizer', category: 'api', company: 'BioSynth Corp', country: '🇨🇭', description: 'HIPAA & GDPR compliant medical data anonymization pipeline. Batch and real-time.', price: '$499/mo', rating: 4.6, reviews: 31, tags: ['Healthcare', 'Privacy', 'HIPAA'] },
  { id: 8, name: 'AgriTech IoT Platform', category: 'cloud', company: 'AfriTech Innovations', country: '🇬🇭', description: 'End-to-end crop monitoring platform for large-scale farms. Satellite + ground sensors.', price: '$299/mo', rating: 4.5, reviews: 19, tags: ['Agriculture', 'IoT', 'Analytics'] },
]

const badgeColors = {
  'Top Rated': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Verified': 'bg-primary-500/20 text-primary-400 border-primary-500/30',
  'Best Value': 'bg-green-500/20 text-green-400 border-green-500/30',
}

export default function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = mockItems.filter(item => {
    if (category !== 'all' && item.category !== category) return false
    if (query && !item.name.toLowerCase().includes(query.toLowerCase()) && !item.description.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      {/* Header */}
      <div className="bg-dark-800/50 border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black text-white mb-3">Resource Marketplace</h1>
            <p className="text-slate-400 text-lg mb-8">Discover and share APIs, technologies, and expert services</p>
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 max-w-2xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services, APIs, technologies..." className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 text-sm" />
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus size={16} /> List Your Service
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                category === id ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5 hover:border-primary-500/40 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-sm group-hover:text-primary-300 transition mb-0.5">{item.name}</h3>
                  <p className="text-slate-400 text-xs">{item.country} {item.company}</p>
                </div>
                {item.badge && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeColors[item.badge]} flex-shrink-0 ml-2`}>
                    {item.badge}
                  </span>
                )}
              </div>

              <p className="text-slate-400 text-xs leading-relaxed mb-3 flex-1">{item.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map(t => (
                  <span key={t} className="text-xs bg-dark-600 text-slate-400 border border-white/5 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-slate-300 text-xs font-semibold">{item.rating}</span>
                  <span className="text-slate-500 text-xs">({item.reviews})</span>
                </div>
                <span className="text-primary-400 text-sm font-bold">{item.price}</span>
              </div>

              <button className="mt-3 w-full text-center text-sm font-semibold py-2 rounded-lg border border-primary-500/30 text-primary-400 hover:bg-primary-600/10 hover:border-primary-500 transition">
                Get Access
              </button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No services found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
