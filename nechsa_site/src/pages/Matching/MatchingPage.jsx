import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Target, TrendingUp, Users, MessageSquare, Handshake, RefreshCw, Filter, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const mockMatches = [
  {
    id: 1, name: 'QuantumLeap AI', country: 'USA', flag: '🇺🇸', sector: 'Artificial Intelligence', size: '11-50',
    score: 97, description: 'Specializes in large language models and enterprise AI deployment. Perfect alignment with your AI infrastructure goals.',
    strengths: ['NLP', 'Computer Vision', 'MLOps'],
    whyMatch: 'Complementary tech stack and shared target market in financial services.',
    verified: true, color: 'from-primary-600 to-blue-600',
  },
  {
    id: 2, name: 'EcoTech Solutions GmbH', country: 'Germany', flag: '🇩🇪', sector: 'Clean Technology', size: '51-200',
    score: 94, description: 'Europe\'s leading B2B clean tech platform. Looking for technology partners to expand into Asian markets.',
    strengths: ['IoT', 'Carbon Analytics', 'Regulatory'],
    whyMatch: 'Your data platform can power their ESG reporting needs.',
    verified: true, color: 'from-green-600 to-teal-600',
  },
  {
    id: 3, name: 'Pacific Finserv', country: 'Singapore', flag: '🇸🇬', sector: 'Financial Technology', size: '201-500',
    score: 91, description: 'Cross-border payment infrastructure serving 20M businesses across Southeast Asia.',
    strengths: ['Payments', 'Compliance', 'APIs'],
    whyMatch: 'Seeking ML partners to improve fraud detection accuracy.',
    verified: true, color: 'from-yellow-600 to-orange-600',
  },
  {
    id: 4, name: 'HealthBridge Africa', country: 'Kenya', flag: '🇰🇪', sector: 'Healthcare Tech', size: '11-50',
    score: 88, description: 'Connecting rural communities with digital health services across Sub-Saharan Africa.',
    strengths: ['Mobile Health', 'Telemedicine', 'Impact'],
    whyMatch: 'Your technical capabilities can scale their telemedicine platform.',
    verified: false, color: 'from-red-600 to-pink-600',
  },
  {
    id: 5, name: 'AutomateIQ', country: 'Canada', flag: '🇨🇦', sector: 'Industrial Automation', size: '51-200',
    score: 86, description: 'Industrial process automation using computer vision and robotics. IPO planned for 2027.',
    strengths: ['Robotics', 'CV', 'Manufacturing'],
    whyMatch: 'Your ML models could enhance their defect detection accuracy by 30%+.',
    verified: true, color: 'from-slate-600 to-slate-500',
  },
  {
    id: 6, name: 'Nordia Ventures', country: 'Sweden', flag: '🇸🇪', sector: 'Venture Capital', size: '1-10',
    score: 83, description: 'Pan-European VC fund focused on B2B tech & sustainability. $250M AUM.',
    strengths: ['Funding', 'EU Network', 'Scale'],
    whyMatch: 'Actively seeking AI infrastructure companies for Series B+ investment.',
    verified: true, color: 'from-indigo-600 to-violet-600',
  },
]

export default function MatchingPage() {
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const refresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-500/10 border-green-500/30'
    if (score >= 80) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    return 'text-orange-400 bg-orange-500/10 border-orange-500/30'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-white">AI Matching</h1>
            <span className="text-xs font-semibold bg-primary-600/20 text-primary-400 border border-primary-500/30 px-2.5 py-0.5 rounded-full">
              Powered by ML
            </span>
          </div>
          <p className="text-slate-400 text-sm">Companies our AI recommends as your best potential partners</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 border border-white/10 hover:border-primary-500/50 text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh Matches
        </button>
      </div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border-primary-500/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold mb-1">AI Analysis Complete</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Based on your company profile, sector (Technology), existing partnerships, and strategic goals, our AI has analyzed <strong className="text-white">10,247 companies</strong> and identified <strong className="text-white">{mockMatches.length} high-compatibility matches</strong>. 
              Top opportunities include investment prospects, technology exchange partnerships, and joint venture candidates in AI, Clean Tech, and FinTech sectors.
            </p>
            <div className="flex gap-4 mt-3">
              {[
                { icon: Target, text: '94% avg match accuracy' },
                { icon: Globe, text: '6 countries represented' },
                { icon: Users, text: '3 investment opportunities' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Icon size={12} className="text-primary-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Matches */}
      <div className="space-y-4">
        {mockMatches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all"
          >
            <div className="flex items-start gap-5">
              {/* Logo */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${match.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <span className="text-2xl">{match.flag}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="text-white font-bold text-lg">{match.name}</h3>
                    <p className="text-slate-400 text-sm">{match.country} · {match.sector} · {match.size} employees</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-black px-3 py-1 rounded-full border ${getScoreColor(match.score)}`}>
                      {match.score}% match
                    </span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="mt-3 mb-3">
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${match.score}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.07 }}
                      className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
                    />
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-3">{match.description}</p>

                {/* Why match */}
                <div className="flex items-start gap-2 mb-3 p-3 bg-primary-600/5 border border-primary-500/20 rounded-lg">
                  <Sparkles size={13} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-xs"><strong className="text-primary-400">Why you match:</strong> {match.whyMatch}</p>
                </div>

                {/* Strengths */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="text-slate-500 text-xs">Strengths:</span>
                  {match.strengths.map(s => (
                    <span key={s} className="text-xs bg-dark-600 text-slate-400 border border-white/5 px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link to={`/company/${match.id}`} className="btn-secondary text-sm py-2 px-4">
                    View Profile
                  </Link>
                  <Link to={`/messages?to=${match.id}`} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
                    <MessageSquare size={14} /> Connect
                  </Link>
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg transition">
                    <Handshake size={14} /> Propose Partnership
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
