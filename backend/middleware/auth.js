const jwt = require('jsonwebtoken')
const { User } = require('../models')

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Access token required' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id, {
      include: [{ association: 'company' }],
    })
    if (!user || !user.is_active) return res.status(401).json({ error: 'Invalid or expired token' })

    req.user = user
    req.company = user.company
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
  next()
}

module.exports = { auth, adminOnly }
