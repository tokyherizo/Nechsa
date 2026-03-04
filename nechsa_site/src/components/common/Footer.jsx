import { Link } from 'react-router-dom'
import { Globe, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Features', href: '/#features' },
    { label: 'Companies', href: '/companies' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socials = [
  { icon: Twitter,  href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/Toky-Herizo', label: 'GitHub' },
  { icon: Mail,     href: 'mailto:contact@necha.io', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-white">Necha</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              The global platform connecting businesses worldwide. Find partners, collaborate on projects, and grow your international presence.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-dark-700 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Necha. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <Globe size={14} />
            <span>Available worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
