import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Search, FolderKanban, Users, Clock, Target, Filter } from 'lucide-react'
import { PROJECT_STATUS_COLORS, formatDate } from '@/utils/helpers'

const mockProjects = [
  { id: 1, name: 'AI Supply Chain Optimization', description: 'Building ML models to optimize global supply chain routing and inventory management.', sector: 'Technology', budget: '$250K', duration: '6 months', status: 'active', progress: 65, skills: ['Python', 'ML', 'Data Science'], partners: 3, owner: 'Your Company', deadline: '2026-04-15', created: '2025-10-01' },
  { id: 2, name: 'FinTech Payment Gateway', description: 'Cross-border payment processing system supporting 50+ currencies with blockchain settlement.', sector: 'Finance', budget: '$180K', duration: '4 months', status: 'active', progress: 40, skills: ['Node.js', 'Blockchain', 'API'], partners: 2, owner: 'FinTechBridge', deadline: '2026-05-01', created: '2026-01-15' },
  { id: 3, name: 'Green Energy Dashboard', description: 'Real-time monitoring and analytics dashboard for renewable energy microgrids.', sector: 'Energy', budget: '$90K', duration: '3 months', status: 'planning', progress: 15, skills: ['React', 'IoT', 'Charts'], partners: 4, owner: 'GreenFuture', deadline: '2026-06-30', created: '2026-02-01' },
  { id: 4, name: 'Healthcare Data Platform', description: 'Secure, HIPAA-compliant data sharing platform for healthcare research institutions.', sector: 'Healthcare', budget: '$320K', duration: '9 months', status: 'on_hold', progress: 80, skills: ['Security', 'DB', 'API'], partners: 5, owner: 'MedConnect', deadline: '2026-03-20', created: '2025-07-01' },
  { id: 5, name: 'Smart Agriculture IoT', description: 'IoT sensor network and AI analytics for precision agriculture in Sub-Saharan Africa.', sector: 'Agriculture', budget: '$140K', duration: '5 months', status: 'planning', progress: 5, skills: ['IoT', 'AI', 'Mobile'], partners: 2, owner: 'AfriTech', deadline: '2026-08-01', created: '2026-03-01' },
]

export default function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = mockProjects.filter(p => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.description.toLowerCase().includes(query.toLowerCase())) return false
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your collaborative projects</p>
        </div>
        <Link to="/projects/create" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> New Project
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects..." className="input-dark pl-9 text-sm py-2.5" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'planning', 'on_hold', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                statusFilter === status ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Link to={`/projects/${project.id}`} className="block glass-card rounded-2xl p-6 hover:border-primary-500/40 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3">
                  <h3 className="text-white font-bold group-hover:text-primary-300 transition">{project.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{project.sector} · {project.owner}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${PROJECT_STATUS_COLORS[project.status]}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skills.map(s => (
                  <span key={s} className="text-xs bg-dark-600 text-slate-400 border border-white/5 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white font-semibold">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-white/5">
                <span className="flex items-center gap-1"><Users size={12} />{project.partners} partners</span>
                <span className="flex items-center gap-1"><Target size={12} />{project.budget}</span>
                <span className="flex items-center gap-1"><Clock size={12} />Due {project.deadline}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 glass-card rounded-2xl">
          <FolderKanban size={48} className="text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">No projects found</p>
          <Link to="/projects/create" className="btn-primary inline-flex items-center gap-2 mt-4 text-sm">
            <Plus size={16} /> Create your first project
          </Link>
        </div>
      )}
    </div>
  )
}
