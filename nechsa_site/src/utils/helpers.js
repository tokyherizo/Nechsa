import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date, options = {}) {
  const opts = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }
  return new Intl.DateTimeFormat('en-US', opts).format(new Date(date))
}

export function formatRelativeTime(date) {
  const now = new Date()
  const d = new Date(date)
  const diff = now - d
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, notation: 'compact',
  }).format(amount)
}

export function formatNumber(n) {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(n)
}

export function truncate(str, length = 100) {
  if (!str) return ''
  return str.length > length ? str.slice(0, length) + '…' : str
}

export function getInitials(name = '') {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export const SECTORS = [
  'Technology', 'Finance', 'Healthcare', 'Energy', 'Manufacturing',
  'Retail', 'Education', 'Real Estate', 'Transportation', 'Agriculture',
  'Media & Entertainment', 'Consulting', 'Legal', 'Construction', 'Other',
]

export const COMPANY_SIZES = [
  '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+',
]

export const COLLABORATION_TYPES = [
  'Strategic Partnership', 'Joint Venture', 'Investment', 'Technology Exchange',
  'Distribution', 'Research & Development', 'Licensing', 'Subcontracting',
]

export const PROJECT_STATUS_COLORS = {
  planning:    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  active:      'bg-green-500/20 text-green-400 border-green-500/30',
  on_hold:     'bg-orange-500/20 text-orange-400 border-orange-500/30',
  completed:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cancelled:   'bg-red-500/20 text-red-400 border-red-500/30',
}

export const CONTRACT_STATUS_COLORS = {
  draft:    'bg-slate-500/20 text-slate-400 border-slate-500/30',
  pending:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  active:   'bg-green-500/20 text-green-400 border-green-500/30',
  signed:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
  archived: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  expired:  'bg-red-500/20 text-red-400 border-red-500/30',
}
