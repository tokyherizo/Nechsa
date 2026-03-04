import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Building2, MapPin, Globe, Shield, Users, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { SECTORS, COMPANY_SIZES, getInitials } from '@/utils/helpers'

// Mock companies — replaced by API
const mockCompanies = [
  { id: 1, name: 'QuantumAI Labs', country: 'USA', sector: 'Technology', size: '51-200', verified: true, description: 'Building next-generation AI infrastructure for enterprise.', tags: ['AI', 'ML', 'Cloud'], score: 4.9, logo: 'QA', color: 'from-primary-600 to-blue-600' },
  { id: 2, name: 'GreenFuture Energy', country: 'Germany', sector: 'Energy', size: '201-500', verified: true, description: 'Leading renewable energy solutions across Europe and Asia.', tags: ['Solar', 'Wind', 'ESG'], score: 4.7, logo: 'GF', color: 'from-green-600 to-teal-600' },
  { id: 3, name: 'FinTechBridge', country: 'Singapore', sector: 'Finance', size: '11-50', verified: true, description: 'Cross-border payment and DeFi solutions for emerging markets.', tags: ['Payments', 'Blockchain', 'DeFi'], score: 4.8, logo: 'FB', color: 'from-yellow-600 to-orange-600' },
  { id: 4, name: 'MedConnect Asia', country: 'Japan', sector: 'Healthcare', size: '51-200', verified: false, description: 'AI-powered telemedicine connecting rural communities with specialist care.', tags: ['Health-AI', 'Telemedicine'], score: 4.5, logo: 'MC', color: 'from-red-600 to-pink-600' },
  { id: 5, name: 'DataBridge Labs', country: 'Estonia', sector: 'Technology', size: '1-10', verified: true, description: 'Real-time data analytics and business intelligence platform.', tags: ['Data', 'Analytics', 'SaaS'], score: 4.6, logo: 'DB', color: 'from-cyan-600 to-blue-600' },
  { id: 6, name: 'AfriTech Innovations', country: 'Ghana', sector: 'Technology', size: '11-50', verified: true, description: 'Fintech and agritech solutions for African markets.', tags: ['Fintech', 'AgriTech', 'Africa'], score: 4.4, logo: 'AT', color: 'from-orange-600 to-amber-600' },
  { id: 7, name: 'BioSynth Corp', country: 'Switzerland', sector: 'Healthcare', size: '201-500', verified: true, description: 'Synthetic biology and precision medicine research.', tags: ['BioTech', 'Pharma', 'R&D'], score: 4.9, logo: 'BS', color: 'from-violet-600 to-indigo-600' },
  { id: 8, name: 'CloudScale Inc.', country: 'Canada', sector: 'Technology', size: '51-200', verified: true, description: 'Multi-cloud orchestration and DevOps automation platform.', tags: ['Cloud', 'DevOps', 'K8s'], score: 4.7, logo: 'CS', color: 'from-indigo-600 to-primary-600' },
  { id: 9, name: 'SolarNova Brasil', country: 'Brazil', sector: 'Energy', size: '11-50', verified: false, description: 'Decentralized solar energy microgrids for rural areas.', tags: ['Solar', 'LatAm', 'Clean'], score: 4.3, logo: 'SN', color: 'from-yellow-500 to-green-500' },
]

export default function CompaniesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [selectedSector, setSelectedSector] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = mockCompanies.filter(c => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase()) &&
        !c.description.toLowerCase().includes(query.toLowerCase()) &&
        !c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))) return false
    if (selectedSector && c.sector !== selectedSector) return false
    if (selectedSize && c.size !== selectedSize) return false
    if (verifiedOnly && !c.verified) return false
    return true
  })

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      {/* Header */}
      <div className="bg-dark-800/50 border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-white mb-3"
          >
            Discover Companies
          </motion.h1>
          <p className="text-slate-400 text-lg mb-8">
            Connect with {mockCompanies.length.toLocaleString()}+ verified businesses worldwide
          </p>

          {/* Search */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-2xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, sector, technology..."
                className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 text-sm"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-medium transition ${
                showFilters ? 'bg-primary-600/20 border-primary-500/50 text-primary-400' : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-dark-700/50 rounded-xl border border-white/5 flex flex-wrap gap-4"
            >
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Sector</label>
                <select
                  value={selectedSector}
                  onChange={e => setSelectedSector(e.target.value)}
                  className="bg-dark-600 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500/50"
                >
                  <option value="">All sectors</option>
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Company Size</label>
                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="bg-dark-600 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500/50"
                >
                  <option value="">Any size</option>
                  {COMPANY_SIZES.map(s => <option key={s} value={s}>{s} employees</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={e => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 accent-primary-500 rounded"
                  />
                  <span className="text-slate-300 text-sm flex items-center gap-1">
                    <Shield size={14} className="text-primary-400" /> Verified only
                  </span>
                </label>
              </div>
              {(selectedSector || selectedSize || verifiedOnly) && (
                <div className="flex items-end">
                  <button
                    onClick={() => { setSelectedSector(''); setSelectedSize(''); setVerifiedOnly(false) }}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
                  >
                    <X size={14} /> Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-slate-400 text-sm mb-6">
          Showing <strong className="text-white">{filtered.length}</strong> companies
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/company/${company.id}`}
                className="block glass-card rounded-2xl p-6 hover:border-primary-500/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-white font-black text-lg">{company.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-white font-bold truncate group-hover:text-primary-300 transition">{company.name}</h3>
                      {company.verified && (
                        <Shield size={14} className="text-primary-400 flex-shrink-0" title="Verified" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={11} />{company.country}</span>
                      <span>·</span>
                      <span>{company.sector}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{company.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {company.tags.map(tag => (
                    <span key={tag} className="text-xs bg-primary-600/10 text-primary-400 border border-primary-500/20 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1"><Users size={12} />{company.size} employees</div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    ★ {company.score}
                  </div>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-primary-400 transition" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Building2 size={48} className="text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 text-lg font-medium">No companies found</p>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
