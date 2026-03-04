const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User, Company } = require('../models')
const { validate, registerSchema, loginSchema } = require('../middleware/validate')
const { auth } = require('../middleware/auth')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password, company_name, sector, country } = req.body

    if (await User.findOne({ where: { email } }))
      return res.status(409).json({ error: 'Email already registered' })

    const company = await Company.create({ name: company_name, sector, country })
    const user = await User.create({ name, email, password, company_id: company.id, role: 'owner' })

    const token = signToken(user.id)
    res.status(201).json({ token, user: { ...user.toJSON(), company } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email }, include: [{ association: 'company' }] })
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid email or password' })

    await user.update({ last_login: new Date() })
    const token = signToken(user.id)
    res.json({ token, user: user.toJSON() })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

// GET /api/auth/me
router.get('/me', auth, (req, res) => res.json({ user: req.user.toJSON() }))

// POST /api/auth/logout (client-side: just discard the token)
router.post('/logout', auth, (req, res) => res.json({ message: 'Logged out successfully' }))

// PUT /api/auth/password
router.put('/password', auth, async (req, res) => {
  try {
    const { current_password, new_password } = req.body
    const user = await User.findByPk(req.user.id)
    if (!(await user.comparePassword(current_password)))
      return res.status(400).json({ error: 'Current password is incorrect' })
    await user.update({ password: new_password })
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Password update failed' })
  }
})

module.exports = router
