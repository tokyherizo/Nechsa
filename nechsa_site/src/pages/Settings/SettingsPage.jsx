import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building2, Bell, Shield, Globe, Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { SECTORS, COMPANY_SIZES } from '@/utils/helpers'

const tabs = [
  { id: 'profile', label: 'Company Profile', icon: Building2 },
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)

  const save = () => {
    setSaving(true)
    setTimeout(() => {
      toast.success('Settings saved!')
      setSaving(false)
    }, 800)
  }

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <h1 className="text-2xl font-black text-white">Settings</h1>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Tabs nav */}
        <nav className="lg:w-52 flex-shrink-0">
          <div className="glass-card rounded-2xl p-2 flex lg:flex-col gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition text-left w-full ${
                  activeTab === id ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
            {activeTab === 'profile' && (
              <>
                <h2 className="text-white font-bold text-lg">Company Profile</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Name</label>
                    <input defaultValue={user?.company_name} className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Sector</label>
                    <select className="input-dark">
                      {SECTORS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Country</label>
                    <input defaultValue="United States" className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Size</label>
                    <select className="input-dark">
                      {COMPANY_SIZES.map(s => <option key={s}>{s} employees</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Website</label>
                    <input defaultValue="https://" placeholder="https://yourcompany.com" className="input-dark" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
                    <textarea rows={4} className="input-dark resize-none" placeholder="Tell potential partners about your company..." />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'account' && (
              <>
                <h2 className="text-white font-bold text-lg">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                    <input defaultValue={user?.name} className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                    <input defaultValue={user?.email} type="email" className="input-dark" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <h2 className="text-white font-bold text-lg">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    ['New partnership requests', true],
                    ['Project updates', true],
                    ['New AI matches', true],
                    ['Contract activity', true],
                    ['New messages', true],
                    ['Marketplace activity', false],
                    ['Weekly digest', true],
                    ['Marketing emails', false],
                  ].map(([label, defaultChecked]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                        <div className="w-10 h-5 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:bg-primary-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition" />
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <>
                <h2 className="text-white font-bold text-lg">Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••" className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="input-dark" />
                  </div>
                  <div className="p-4 bg-primary-600/5 border border-primary-500/20 rounded-xl">
                    <p className="text-sm text-white font-semibold mb-1">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-400 mb-3">Add an extra layer of security to your account.</p>
                    <button className="btn-secondary text-sm">Enable 2FA</button>
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-white/5">
              <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
