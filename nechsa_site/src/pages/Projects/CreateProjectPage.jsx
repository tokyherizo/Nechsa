import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight, FolderKanban } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SECTORS, COLLABORATION_TYPES } from '@/utils/helpers'

const schema = z.object({
  name: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  sector: z.string().min(1, 'Select a sector'),
  budget: z.string().min(1, 'Budget is required'),
  duration: z.string().min(1, 'Duration is required'),
  collaboration_type: z.string().min(1, 'Select a collaboration type'),
  skills_needed: z.string().min(1, 'List at least one skill'),
  objectives: z.string().min(10, 'Add project objectives'),
})

export default function CreateProjectPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setTimeout(() => {
      toast.success('Project created successfully!')
      navigate('/projects/1')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white">Create New Project</h1>
        <p className="text-slate-400 text-sm mt-1">Define your collaborative project and start finding partners</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Basic Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-primary-600/20 border border-primary-500/30 rounded-lg flex items-center justify-center">
                <FolderKanban size={16} className="text-primary-400" />
              </div>
              <h2 className="text-white font-bold">Project Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Project Title *</label>
                <input {...register('name')} placeholder="e.g. AI-Powered Fraud Detection System" className="input-dark" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
                <textarea {...register('description')} rows={4} placeholder="Describe what you're building, the problem it solves, and what kind of partners you're looking for..." className="input-dark resize-none" />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Objectives *</label>
                <textarea {...register('objectives')} rows={2} placeholder="List the main goals and deliverables of this project" className="input-dark resize-none" />
                {errors.objectives && <p className="text-red-400 text-xs mt-1">{errors.objectives.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Sector *</label>
                  <select {...register('sector')} className="input-dark">
                    <option value="">Select sector</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.sector && <p className="text-red-400 text-xs mt-1">{errors.sector.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Collaboration Type *</label>
                  <select {...register('collaboration_type')} className="input-dark">
                    <option value="">Select type</option>
                    {COLLABORATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.collaboration_type && <p className="text-red-400 text-xs mt-1">{errors.collaboration_type.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Budget *</label>
                  <input {...register('budget')} placeholder="e.g. $50,000 - $100,000" className="input-dark" />
                  {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Duration *</label>
                  <input {...register('duration')} placeholder="e.g. 3 months" className="input-dark" />
                  {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Skills / Technologies Needed *</label>
                <input {...register('skills_needed')} placeholder="e.g. React, Node.js, Machine Learning, AWS" className="input-dark" />
                <p className="text-slate-500 text-xs mt-1">Separate with commas</p>
                {errors.skills_needed && <p className="text-red-400 text-xs mt-1">{errors.skills_needed.message}</p>}
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/projects')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 flex-1 justify-center">
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>Create Project <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
