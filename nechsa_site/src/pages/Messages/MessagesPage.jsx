import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Send, Paperclip, Phone, Video, MoreHorizontal, Circle } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { formatRelativeTime, getInitials } from '@/utils/helpers'

const mockConversations = [
  { id: 1, name: 'DataBridge Labs', country: '🇪🇪', lastMessage: "Sure! We can join your supply chain project.", time: '2h ago', unread: 2, online: true, color: 'from-cyan-600 to-blue-600' },
  { id: 2, name: 'GreenFuture Energy', country: '🇩🇪', lastMessage: 'Please review the contract draft when ready.', time: '4h ago', unread: 0, online: false, color: 'from-green-600 to-teal-600' },
  { id: 3, name: 'FinTechBridge', country: '🇸🇬', lastMessage: "Let's schedule a call to discuss the API integration.", time: 'Yesterday', unread: 1, online: true, color: 'from-yellow-600 to-orange-600' },
  { id: 4, name: 'AfriTech Innovations', country: '🇬🇭', lastMessage: 'Thank you for the partnership proposal!', time: '2d ago', unread: 0, online: false, color: 'from-orange-500 to-amber-600' },
  { id: 5, name: 'BioSynth Corp', country: '🇨🇭', lastMessage: 'The ML model results look very promising.', time: '3d ago', unread: 0, online: true, color: 'from-violet-600 to-indigo-600' },
]

const mockMessages = {
  1: [
    { id: 1, from: 'them', text: "Hi! I saw your supply chain optimization project. Very interesting initiative!", time: '09:30' },
    { id: 2, from: 'me', text: "Thanks! We're looking for data engineering expertise. Is that something your team could help with?", time: '09:35' },
    { id: 3, from: 'them', text: "Absolutely. We have 5 senior data engineers with experience in ML pipelines and distributed systems.", time: '09:37' },
    { id: 4, from: 'me', text: "Great! Could you share a quick overview of your tech stack and past similar projects?", time: '09:40' },
    { id: 5, from: 'them', text: "Sure! We can join your supply chain project.", time: '10:15' },
  ],
}

export default function MessagesPage() {
  const { id: chatId } = useParams()
  const [selectedConv, setSelectedConv] = useState(chatId ? parseInt(chatId) : 1)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages[1] || [])
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)
  const { user } = useAuthStore()

  const conversation = mockConversations.find(c => c.id === selectedConv)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setMessages(mockMessages[selectedConv] || [
      { id: 1, from: 'them', text: 'Hello! How can I help you today?', time: '10:00' }
    ])
  }, [selectedConv])

  const sendMessage = () => {
    if (!message.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: message, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, newMsg])
    setMessage('')
  }

  const filteredConvs = mockConversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-0 glass-card rounded-2xl overflow-hidden animate-fade-in">
      {/* Conversation list */}
      <div className="w-72 flex-shrink-0 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-white font-bold mb-3">Messages</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-dark-700/60 border border-white/5 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-white/3 transition text-left border-b border-white/3 ${selectedConv === conv.id ? 'bg-primary-600/10' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${conv.color} flex items-center justify-center`}>
                  <span className="text-white text-sm font-bold">{conv.country}</span>
                </div>
                {conv.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-dark-800 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-white text-sm font-semibold truncate">{conv.name}</p>
                  <span className="text-slate-500 text-xs flex-shrink-0 ml-1">{conv.time}</span>
                </div>
                <p className="text-slate-400 text-xs truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {conversation ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${conversation.color} flex items-center justify-center`}>
                <span className="text-white text-sm font-bold">{conversation.country}</span>
              </div>
              <div>
                <p className="text-white font-semibold">{conversation.name}</p>
                <p className={`text-xs ${conversation.online ? 'text-green-400' : 'text-slate-500'}`}>
                  {conversation.online ? '● Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                <Phone size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                <Video size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-sm lg:max-w-md ${msg.from === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-br-sm'
                      : 'bg-dark-600 text-slate-200 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-slate-500 text-xs">{msg.time}</span>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3 bg-dark-700/60 border border-white/10 rounded-xl px-4 py-3">
              <button className="text-slate-400 hover:text-white transition">
                <Paperclip size={18} />
              </button>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white hover:from-primary-500 hover:to-secondary-500 transition disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400">Select a conversation</p>
        </div>
      )}
    </div>
  )
}
