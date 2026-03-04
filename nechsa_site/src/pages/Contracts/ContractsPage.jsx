import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, Search, Eye, PenLine, Archive, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { CONTRACT_STATUS_COLORS, formatDate } from '@/utils/helpers'

const mockContracts = [
  { id: 'CTR-001', title: 'AI Supply Chain Partnership Agreement', parties: ['Your Company', 'DataBridge Labs'], status: 'signed', value: '$250,000', created: '2025-10-15', signed: '2025-10-20', expires: '2026-10-20', type: 'Partnership' },
  { id: 'CTR-002', title: 'Software Development Services Agreement', parties: ['Your Company', 'CloudScale Inc.'], status: 'active', value: '$85,000', created: '2026-01-01', signed: '2026-01-05', expires: '2026-07-05', type: 'Services' },
  { id: 'CTR-003', title: 'Data Sharing & Licensing Agreement', parties: ['Your Company', 'QuantumAI Labs', 'BioSynth Corp'], status: 'pending', value: '$30,000', created: '2026-02-20', signed: null, expires: null, type: 'Licensing' },
  { id: 'CTR-004', title: 'Joint Venture Agreement — Green Energy Project', parties: ['Your Company', 'GreenFuture Energy'], status: 'draft', value: '$500,000', created: '2026-03-01', signed: null, expires: null, type: 'Joint Venture' },
  { id: 'CTR-045', title: 'API Usage & Integration MOU', parties: ['Your Company', 'FinTechBridge'], status: 'signed', value: '$12,000', created: '2025-12-01', signed: '2025-12-10', expires: '2026-12-10', type: 'MOU' },
]

const statusIcons = {
  signed: CheckCircle,
  active: CheckCircle,
  pending: Clock,
  draft: PenLine,
  archived: Archive,
  expired: AlertCircle,
}

export default function ContractsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = mockContracts.filter(c => {
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Digital Contracts</h1>
          <p className="text-slate-400 text-sm mt-1">Create, sign, and manage business agreements</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> New Contract
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Contracts', value: mockContracts.length, color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { label: 'Active/Signed', value: mockContracts.filter(c => ['active','signed'].includes(c.status)).length, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Pending Signature', value: mockContracts.filter(c => c.status === 'pending').length, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
          { label: 'Total Value', value: '$877K', color: 'text-secondary-400', bg: 'bg-secondary-500/10' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="stat-card">
            <p className={`text-2xl font-black ${color} mb-1`}>{value}</p>
            <p className="text-slate-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search contracts..." className="input-dark pl-9 text-sm py-2.5" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'signed', 'pending', 'draft'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                statusFilter === status ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="table-dark">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Type</th>
              <th>Parties</th>
              <th>Value</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contract, i) => {
              const StatusIcon = statusIcons[contract.status] || FileText
              return (
                <motion.tr
                  key={contract.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/2 transition"
                >
                  <td>
                    <div>
                      <p className="text-white font-semibold text-sm">{contract.title}</p>
                      <p className="text-slate-500 text-xs">{contract.id}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-slate-300 text-xs">{contract.type}</span>
                  </td>
                  <td>
                    <div className="flex flex-col gap-0.5">
                      {contract.parties.map(p => (
                        <span key={p} className="text-slate-300 text-xs">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="text-white font-semibold text-sm">{contract.value}</span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${CONTRACT_STATUS_COLORS[contract.status]}`}>
                      <StatusIcon size={11} />
                      {contract.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-slate-400 text-xs">
                      {contract.signed ? formatDate(contract.signed) : formatDate(contract.created)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 transition">
                        <Eye size={14} />
                      </button>
                      {['draft', 'pending'].includes(contract.status) && (
                        <button className="p-1.5 text-slate-400 hover:text-primary-400 rounded hover:bg-primary-500/10 transition">
                          <PenLine size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText size={40} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400">No contracts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
