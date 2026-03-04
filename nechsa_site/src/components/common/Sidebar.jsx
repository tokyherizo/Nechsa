import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, FolderKanban, MessageSquare,
  ShoppingBag, FileText, Sparkles, Settings, LogOut,
  ChevronRight, X,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { getInitials } from '@/utils/helpers'

const navItems = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/matching',   icon: Sparkles,        label: 'AI Matching',  badge: 'New' },
  { to: '/companies',  icon: Building2,       label: 'Companies' },
  { to: '/projects',   icon: FolderKanban,    label: 'Projects' },
  { to: '/messages',   icon: MessageSquare,   label: 'Messages' },
  { to: '/contracts',  icon: FileText,        label: 'Contracts' },
  { to: '/marketplace',icon: ShoppingBag,     label: 'Marketplace' },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 flex flex-col
          bg-dark-800 border-r border-white/5
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-lg font-bold text-white">Necha</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <Icon size={18} />
              <span className="flex-1 font-medium text-sm">{label}</span>
              {badge && (
                <span className="text-xs font-semibold bg-primary-600/30 text-primary-400 px-2 py-0.5 rounded-full border border-primary-500/30">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Settings + User */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Settings size={18} />
            <span className="font-medium text-sm">Settings</span>
          </NavLink>

          {/* User card */}
          <div className="mt-3 p-3 rounded-lg bg-dark-700/50 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">
                  {getInitials(user?.company_name || user?.name || 'U')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.company_name || user?.name}
                </p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 w-full flex items-center justify-center gap-2 text-slate-400 hover:text-red-400 text-xs font-medium py-1.5 rounded transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
