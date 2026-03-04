import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authAPI } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await authAPI.login(data)
      login(res.data.user, res.data.token)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  // Demo login
  const demoLogin = async () => {
    setLoading(true)
    setTimeout(() => {
      login(
        { id: 'demo', name: 'Demo User', email: 'demo@necha.io', company_name: 'Necha Demo Corp', role: 'company' },
        'demo-token-xxxx'
      )
      toast.success('Welcome to Necha Demo!')
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-8"
    >
      <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
      <p className="text-slate-400 text-sm mb-6">Sign in to your Necha account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              {...register('email')}
              type="email"
              placeholder="you@company.com"
              className="input-dark pl-10"
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-300">Password</label>
            <Link to="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="input-dark pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : (
            <>Sign in <ArrowRight size={16} /></>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-slate-500 text-xs">or</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Demo */}
      <button
        onClick={demoLogin}
        disabled={loading}
        className="w-full btn-secondary text-sm"
      >
        Try Demo Account
      </button>

      <p className="text-center text-slate-400 text-sm mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
          Create one free
        </Link>
      </p>
    </motion.div>
  )
}
