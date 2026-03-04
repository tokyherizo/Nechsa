import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Target, Clock, CheckCircle, Circle, Plus, FileText, MessageSquare, BarChart3 } from 'lucide-react'
import { PROJECT_STATUS_COLORS } from '@/utils/helpers'

const mockProject = {
  id: 1,
  name: 'AI Supply Chain Optimization',
  description: 'Building ML models to optimize global supply chain routing and inventory management across 12 warehouses in 4 continents.',
  sector: 'Technology',
  status: 'active',
  progress: 65,
  budget: '$250,000',
  duration: '6 months',
  deadline: '2026-04-15',
  owner: 'Your Company',
  skills: ['Python', 'Machine Learning', 'Data Science', 'PostgreSQL'],
  partners: [
    { name: 'DataBridge Labs', country: '🇪🇪', role: 'Data Engineering' },
    { name: 'BioSynth Corp', country: '🇨🇭', role: 'ML Models' },
    { name: 'CloudScale Inc.', country: '🇨🇦', role: 'Infrastructure' },
  ],
  tasks: [
    { id: 1, title: 'Define data schemas & pipeline architecture', status: 'done', assignee: 'DataBridge' },
    { id: 2, title: 'Collect and clean historical shipment data', status: 'done', assignee: 'DataBridge' },
    { id: 3, title: 'Train baseline demand forecasting model', status: 'done', assignee: 'BioSynth' },
    { id: 4, title: 'Deploy model to staging environment', status: 'in_progress', assignee: 'CloudScale' },
    { id: 5, title: 'A/B test routing optimization algorithm', status: 'in_progress', assignee: 'BioSynth' },
    { id: 6, title: 'Performance benchmarking & reporting', status: 'todo', assignee: 'Your Company' },
    { id: 7, title: 'Production deployment & monitoring', status: 'todo', assignee: 'CloudScale' },
  ],
}

const taskStatusColors = {
  done: 'text-green-400',
  in_progress: 'text-yellow-400',
  todo: 'text-slate-500',
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = mockProject

  const done = project.tasks.filter(t => t.status === 'done').length
  const inProgress = project.tasks.filter(t => t.status === 'in_progress').length
  const todo = project.tasks.filter(t => t.status === 'todo').length

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-black text-white">{project.name}</h1>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${PROJECT_STATUS_COLORS[project.status]}`}>
                {project.status}
              </span>
            </div>
            <p className="text-slate-400">{project.description}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Target, label: 'Budget', value: project.budget },
            { icon: Clock, label: 'Duration', value: project.duration },
            { icon: Users, label: 'Partners', value: project.partners.length },
            { icon: BarChart3, label: 'Progress', value: `${project.progress}%` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-3 bg-dark-700/40 rounded-xl text-center">
              <Icon size={16} className="text-primary-400 mx-auto mb-1" />
              <p className="text-white font-bold">{value}</p>
              <p className="text-slate-400 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-white font-semibold">{project.progress}%</span>
          </div>
          <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white font-bold">Tasks</h2>
              <div className="flex gap-3 text-xs">
                <span className="text-green-400">{done} done</span>
                <span className="text-yellow-400">{inProgress} in progress</span>
                <span className="text-slate-500">{todo} todo</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-xs">{project.tasks.length} total tasks</p>
              <button className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-xs font-medium">
                <Plus size={13} /> Add Task
              </button>
            </div>

            <div className="space-y-2">
              {project.tasks.map(task => (
                <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl border transition hover:bg-dark-700/40 ${
                  task.status === 'done' ? 'border-green-500/20 bg-green-500/5' :
                  task.status === 'in_progress' ? 'border-yellow-500/20 bg-yellow-500/5' :
                  'border-white/5 bg-dark-700/20'
                }`}>
                  {task.status === 'done' ? (
                    <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle size={18} className={`flex-shrink-0 ${task.status === 'in_progress' ? 'text-yellow-400' : 'text-slate-600'}`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{task.assignee}</span>
                  <span className={`text-xs font-semibold flex-shrink-0 ${taskStatusColors[task.status]}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — partners + actions */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-bold mb-4">Project Team</h3>
            <div className="space-y-3">
              {project.partners.map(p => (
                <div key={p.name} className="flex items-center gap-3 p-2.5 bg-dark-700/40 rounded-lg">
                  <span className="text-lg">{p.country}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{p.name}</p>
                    <p className="text-slate-400 text-xs">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-2 text-primary-400 hover:text-white text-sm border border-primary-500/30 hover:border-primary-500 py-2 rounded-lg transition">
              <Plus size={14} /> Invite Partner
            </button>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-bold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 text-slate-400 hover:text-white text-sm py-2.5 px-3 rounded-lg hover:bg-white/5 transition text-left">
                <MessageSquare size={15} className="text-primary-400" /> Team Discussion
              </button>
              <button className="w-full flex items-center gap-2 text-slate-400 hover:text-white text-sm py-2.5 px-3 rounded-lg hover:bg-white/5 transition text-left">
                <FileText size={15} className="text-blue-400" /> Share Document
              </button>
              <button className="w-full flex items-center gap-2 text-slate-400 hover:text-white text-sm py-2.5 px-3 rounded-lg hover:bg-white/5 transition text-left">
                <FileText size={15} className="text-green-400" /> Create Contract
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-bold mb-3">Skills Needed</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map(s => (
                <span key={s} className="text-xs bg-primary-600/10 text-primary-400 border border-primary-500/20 px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
