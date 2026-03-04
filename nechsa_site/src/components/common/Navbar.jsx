import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Companies', href: '/companies' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Pricing', href: '/#pricing' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-white">Necha</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary-500/30"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-white/5">
                Sign in
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-primary-500/25">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}
                  className="block text-slate-400 hover:text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary text-center text-sm">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/login" className="btn-secondary text-center text-sm">Sign in</Link>
                    <Link to="/register" className="btn-primary text-center text-sm">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
