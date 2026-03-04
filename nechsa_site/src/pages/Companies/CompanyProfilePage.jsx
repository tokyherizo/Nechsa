import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, MapPin, Globe, Users, Star, ExternalLink, MessageSquare,
  Handshake, FolderKanban, Award, BarChart3, ArrowLeft, CheckCircle,
} from 'lucide-react'

// Mock data
const mockCompany = {
  id: 1,
  name: 'QuantumAI Labs',
  tagline: 'Building next-generation AI infrastructure for enterprise',
  country: 'USA',
  city: 'San Francisco',
  sector: 'Technology',
  size: '51-200',
  founded: 2019,
  website: 'https://quantumai-labs.io',
  verified: true,
  logo: 'QA',
  color: 'from-primary-600 to-blue-600',
  score: 4.9,
  description: `QuantumAI Labs is a cutting-edge artificial intelligence company focused on building scalable, enterprise-grade ML infrastructure. We specialize in computer vision, NLP, and predictive analytics solutions deployed across Fortune 500 companies and fast-growing startups alike.

Our team of 80+ engineers, researchers, and strategists operates from San Francisco, London, and Singapore, serving clients in 40+ countries.`,
  certifications: ['ISO 27001', 'SOC 2 Type II', 'AI Ethics Certified'],
  stats: { projects: 42, partners: 28, contracts: 15, rating: 4.9 },
  services: [
    { name: 'Custom ML Models', description: 'End-to-end ML pipeline design and deployment' },
    { name: 'AI Consulting', description: 'Strategic AI roadmap for enterprise transformation' },
    { name: 'Data Infrastructure', description: 'Scalable data platforms on AWS/GCP/Azure' },
    { name: 'API Marketplace', description: '15+ pre-built AI APIs available for licensing' },
  ],
  partners: [
    { name: 'TechBridge Global', country: '🇬🇧', sector: 'Cloud' },
    { name: 'Pacific Analytics', country: '🇯🇵', sector: 'Data' },
    { name: 'EuroSoft AG', country: '🇩🇪', sector: 'Enterprise' },
  ],
  reviews: [
    { author: 'Marco Rossi', company: 'ItalTech S.r.l', rating: 5, text: 'Excellent partner. Deep technical expertise and very professional communication.' },
    { author: 'Yuki Tanaka', company: 'Nippon AI', rating: 5, text: 'Delivered our ML project ahead of schedule. Would definitely partner again.' },
  ],
}

export default function CompanyProfilePage() {
  const { id } = useParams()
  const company = mockCompany // In production: fetch by id

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link to="/companies" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition">
          <ArrowLeft size={16} /> Back to Companies
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center shadow-xl flex-shrink-0`}>
                  <span className="text-white font-black text-2xl">{company.logo}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h1 className="text-3xl font-black text-white">{company.name}</h1>
                    {company.verified && (
                      <span className="badge-verified">
                        <Shield size={12} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 mb-3">{company.tagline}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={13} />{company.city}, {company.country}</span>
                    <span className="flex items-center gap-1"><Users size={13} />{company.size} employees</span>
                    <span className="flex items-center gap-1"><Star size={13} className="text-yellow-400" /> {company.score}/5</span>
                    {company.website && (
                      <a href={company.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition">
                        <Globe size={13} /> Website <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-dark-700/40 rounded-xl">
                {[
                  { value: company.stats.projects, label: 'Projects' },
                  { value: company.stats.partners, label: 'Partners' },
                  { value: company.stats.contracts, label: 'Contracts' },
                  { value: `${company.stats.rating}/5`, label: 'Rating' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-black text-white">{s.value}</p>
                    <p className="text-slate-400 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-white font-bold text-lg mb-4">About</h2>
              <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{company.description}</div>

              {/* Certifications */}
              <div className="mt-4 flex flex-wrap gap-2">
                {company.certifications.map(cert => (
                  <span key={cert} className="flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                    <Award size={12} /> {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-white font-bold text-lg mb-4">Products & Services</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {company.services.map(service => (
                  <div key={service.name} className="p-4 bg-dark-700/40 rounded-xl border border-white/5">
                    <div className="flex items-start gap-2 mb-1">
                      <CheckCircle size={14} className="text-primary-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white font-semibold text-sm">{service.name}</p>
                    </div>
                    <p className="text-slate-400 text-xs pl-5">{service.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="text-white font-bold text-lg mb-4">Partner Reviews</h2>
              <div className="space-y-4">
                {company.reviews.map(review => (
                  <div key={review.author} className="p-4 bg-dark-700/40 rounded-xl">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm italic mb-3">"{review.text}"</p>
                    <p className="text-slate-400 text-xs">— {review.author}, {review.company}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — actions + sidebar */}
          <div className="space-y-4">
            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4">Connect with {company.name}</h3>
              <div className="space-y-3">
                <Link to={`/messages?to=${company.id}`}
                  className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare size={16} /> Send Message
                </Link>
                <button className="w-full btn-secondary flex items-center justify-center gap-2 text-sm">
                  <Handshake size={16} /> Propose Partnership
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-sm py-2.5 rounded-lg transition">
                  <FolderKanban size={16} /> Invite to Project
                </button>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4">Company Details</h3>
              <dl className="space-y-3 text-sm">
                {[
                  ['Sector', company.sector],
                  ['Headquarters', `${company.city}, ${company.country}`],
                  ['Company Size', `${company.size} employees`],
                  ['Founded', company.founded],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-slate-400">{label}</dt>
                    <dd className="text-white font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* Current Partners */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4">Current Partners</h3>
              <div className="space-y-2.5">
                {company.partners.map(p => (
                  <div key={p.name} className="flex items-center gap-2.5 p-2.5 bg-dark-700/40 rounded-lg">
                    <span className="text-lg">{p.country}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{p.name}</p>
                      <p className="text-slate-400 text-xs">{p.sector}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
