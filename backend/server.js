require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const { createServer } = require('http')
const { Server } = require('socket.io')
const rateLimit = require('express-rate-limit')

const { sequelize } = require('./config/database')
const setupSocket = require('./socket')

// Routes
const authRoutes = require('./routes/auth')
const companiesRoutes = require('./routes/companies')
const projectsRoutes = require('./routes/projects')
const collaborationRoutes = require('./routes/collaboration')
const messagesRoutes = require('./routes/messages')
const contractsRoutes = require('./routes/contracts')
const marketplaceRoutes = require('./routes/marketplace')
const dashboardRoutes = require('./routes/dashboard')

const app = express()
const httpServer = createServer(app)

// Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
setupSocket(io)
app.set('io', io)

// Security
app.use(helmet({ crossOriginEmbedderPolicy: false }))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: { error: 'Too many requests, please try again later.' },
}))
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
}))

// Middleware
app.use(compression())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/companies', companiesRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/collaboration', collaborationRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/contracts', contractsRoutes)
app.use('/api/marketplace', marketplaceRoutes)
app.use('/api/dashboard', dashboardRoutes)

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  const status = err.status || err.statusCode || 500
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected')
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
    console.log('✅ Models synced')
    httpServer.listen(PORT, () => {
      console.log(`🚀 Necha API running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ Startup error:', err)
    process.exit(1)
  }
}

start()
