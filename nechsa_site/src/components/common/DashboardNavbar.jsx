import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, Menu, Plus, MessageSquare } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { getInitials } from '@/utils/helpers'

export default function DashboardNavbar({ onMenuClick }) {
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/companies?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="h-16 bg-dark-800/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-20">
      {/* Mobile menu */}
      <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg">
        <Menu size={20} />
      </button>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search companies, projects..."
            className="w-full bg-dark-700/60 border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 transition"
          />
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <Link to="/projects/create"
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={16} />
          New Project
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        {/* Messages */}
        <Link to="/messages" className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
          <MessageSquare size={20} />
        </Link>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center cursor-pointer flex-shrink-0">
          <span className="text-white text-sm font-bold">
            {getInitials(user?.company_name || user?.name || 'U')}
          </span>
        </div>
      </div>
    </header>
  )
}
