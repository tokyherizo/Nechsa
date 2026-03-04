import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, Building2, User, Globe, ArrowRight, Loader2, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authAPI } from '@/services/api'
import { useAuthStore } from '@/store/authStore'
import { SECTORS } from '@/utils/helpers'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company_name: z.string().min(2, 'Company name required'),
  sector: z.string().min(1, 'Please select a sector'),
  country: z.string().min(2, 'Country required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
})

const passwordRequirements = [
  { test: (p) => p.length >= 8, label: '8+ characters' },
  { test: (p) => /[A-Z]/.test(p), label: 'Uppercase letter' },
  { test: (p) => /[0-9]/.test(p), label: 'Number' },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await authAPI.register(data)
      login(res.data.user, res.data.token)
      toast.success('Welcome to Necha! 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-8"
    >
      <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
      <p className="text-slate-400 text-sm mb-6">Join 10,000+ companies on Necha</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name + Company */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input {...register('name')} placeholder="John Doe" className="input-dark pl-9 text-sm" />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Company Name</label>
            <div className="relative">
              <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input {...register('company_name')} placeholder="Acme Corp" className="input-dark pl-9 text-sm" />
            </div>
            {errors.company_name && <p className="text-red-400 text-xs mt-1">{errors.company_name.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input {...register('email')} type="email" placeholder="you@company.com" className="input-dark pl-9 text-sm" />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Sector + Country */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Sector</label>
            <select {...register('sector')} className="input-dark text-sm">
              <option value="">Select sector</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.sector && <p className="text-red-400 text-xs mt-1">{errors.sector.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Country</label>
            <div className="relative">
              <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input {...register('country')} placeholder="United States" className="input-dark pl-9 text-sm" />
            </div>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="input-dark pl-9 pr-9 text-sm"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {/* Requirements */}
          {password.length > 0 && (
            <div className="flex gap-3 mt-2">
              {passwordRequirements.map(req => (
                <div key={req.label} className={`flex items-center gap-1 text-xs ${req.test(password) ? 'text-green-400' : 'text-slate-500'}`}>
                  <Check size={11} />
                  {req.label}
                </div>
              ))}
            </div>
          )}
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input {...register('confirm_password')} type="password" placeholder="••••••••" className="input-dark pl-9 text-sm" />
          </div>
          {errors.confirm_password && <p className="text-red-400 text-xs mt-1">{errors.confirm_password.message}</p>}
        </div>

        {/* Terms */}
        <p className="text-slate-500 text-xs">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-primary-400 hover:underline">Terms of Service</Link> and{' '}
          <Link to="/privacy" className="text-primary-400 hover:underline">Privacy Policy</Link>.
        </p>

        <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
          {loading ? <Loader2 size={18} className="animate-spin" /> : (
            <>Create Account <ArrowRight size={16} /></>
          )}
        </button>
      </form>

      <p className="text-center text-slate-400 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
      </p>
    </motion.div>
  )
}
