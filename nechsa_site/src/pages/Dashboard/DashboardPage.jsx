import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Building2, FolderKanban, Users, TrendingUp, MessageSquare,
  FileText, Sparkles, ArrowRight, Plus, ChevronRight, CheckCircle,
  Clock, AlertCircle,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { formatRelativeTime, formatCurrency, PROJECT_STATUS_COLORS } from '@/utils/helpers'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data — replaced by real API calls when backend is connected
const statsData = [
  { icon: Building2,    label: 'Partners',       value: '24',  change: '+3 this month',  color: 'text-primary-400',  bg: 'bg-primary-500/10' },
  { icon: FolderKanban, label: 'Active Projects', value: '8',   change: '2 near deadline', color: 'text-green-400',    bg: 'bg-green-500/10' },
  { icon: MessageSquare,label: 'Messages',        value: '147', change: '12 unread',       color: 'text-yellow-400',   bg: 'bg-yellow-500/10' },
  { icon: TrendingUp,   label: 'Opportunities',   value: '36',  change: '+8 new today',    color: 'text-secondary-400',bg: 'bg-secondary-500/10' },
]

const chartData = [
  { month: 'Sep', partners: 12, projects: 4 },
  { month: 'Oct', partners: 15, projects: 6 },
  { month: 'Nov', partners: 18, projects: 7 },
  { month: 'Dec', partners: 19, projects: 7 },
  { month: 'Jan', partners: 21, projects: 8 },
  { month: 'Feb', partners: 24, projects: 8 },
  { month: 'Mar', partners: 24, projects: 8 },
]

const recentProjects = [
  { id: 1, name: 'AI Supply Chain Optimization', partners: 3, status: 'active', progress: 65, deadline: '2026-04-15' },
  { id: 2, name: 'FinTech Payment Gateway', partners: 2, status: 'active', progress: 40, deadline: '2026-05-01' },
  { id: 3, name: 'Green Energy Dashboard', partners: 4, status: 'planning', progress: 15, deadline: '2026-06-30' },
  { id: 4, name: 'Healthcare Data Platform', partners: 5, status: 'on_hold', progress: 80, deadline: '2026-03-20' },
]

const aiMatches = [
  { id: 1, name: 'QuantumLeap AI', country: '🇺🇸', sector: 'AI', score: 97 },
  { id: 2, name: 'EcoTech Solutions', country: '🇩🇪', sector: 'CleanTech', score: 94 },
  { id: 3, name: 'Pacific Finserv', country: '🇸🇬', sector: 'Fintech', score: 91 },
]

const activities = [
  { icon: CheckCircle, text: 'Partnership accepted by TechBridge Inc.', time: '2h ago', color: 'text-green-400' },
  { icon: FileText,    text: 'Contract #CTR-045 signed by all parties', time: '4h ago', color: 'text-blue-400' },
  { icon: Users,       text: 'New collaborator joined "AI Project"',     time: '6h ago', color: 'text-primary-400' },
  { icon: AlertCircle, text: 'Review milestone due: AI Supply Chain',    time: '1d ago', color: 'text-yellow-400' },
  { icon: Sparkles,    text: '5 new AI-matched partners available',      time: '1d ago', color: 'text-secondary-400' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            Welcome back, {user?.company_name || user?.name} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here's what's happening with your partnerships today.
          </p>
        </div>
        <Link to="/projects/create" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map(({ icon: Icon, label, value, change, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="stat-card"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            <p className="text-slate-400 text-sm font-medium mt-0.5">{label}</p>
            <p className="text-slate-500 text-xs mt-1">{change}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart + AI Matches */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Growth chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold">Partnership Growth</h2>
              <p className="text-slate-400 text-xs mt-0.5">Partners & projects over 7 months</p>
            </div>
            <span className="text-xs text-green-400 font-semibold bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full">
              +100% YoY
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="partnersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="projectsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="partners" name="Partners" stroke="#6366f1" fill="url(#partnersGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="projects" name="Projects" stroke="#a855f7" fill="url(#projectsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Matches */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary-400" />
              <h2 className="text-white font-bold text-sm">AI Matches</h2>
            </div>
            <Link to="/matching" className="text-primary-400 hover:text-primary-300 text-xs font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {aiMatches.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-xl hover:bg-dark-700 transition cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600/30 to-secondary-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span>{m.country}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{m.name}</p>
                  <p className="text-slate-400 text-xs">{m.sector}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-green-400 text-sm font-bold">{m.score}%</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/matching"
            className="mt-4 w-full flex items-center justify-center gap-2 text-primary-400 hover:text-white text-sm font-medium py-2.5 border border-primary-500/30 hover:border-primary-500 rounded-xl transition"
          >
            See all matches <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Projects + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent projects */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">Active Projects</h2>
            <Link to="/projects" className="text-primary-400 hover:text-primary-300 text-xs font-medium flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map(project => (
              <div key={project.id} className="p-4 bg-dark-700/40 rounded-xl hover:bg-dark-700/60 transition cursor-pointer">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <p className="text-white font-semibold text-sm">{project.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold flex-shrink-0 ${PROJECT_STATUS_COLORS[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Users size={12} />{project.partners} partners</span>
                  <span className="flex items-center gap-1"><Clock size={12} />Due {project.deadline}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs flex-shrink-0">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map(({ icon: Icon, text, time, color }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon size={13} className={color} />
                </div>
                <div>
                  <p className="text-slate-300 text-xs leading-relaxed">{text}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
