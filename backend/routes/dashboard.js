const router = require('express').Router()
const { Op } = require('sequelize')
const { sequelize } = require('../config/database')
const { Project, Collaboration, Contract, Message } = require('../models')
const { auth } = require('../middleware/auth')

// GET /api/dashboard
router.get('/', auth, async (req, res) => {
  try {
    const companyId = req.company?.id || ''

    const [projectCount, activeCollabs, contractCount, unreadMessages] = await Promise.all([
      Project.count({ where: { company_id: companyId } }),
      Collaboration.count({ where: {
        [Op.or]: [{ requester_id: companyId }, { receiver_id: companyId }],
        status: 'active',
      }}),
      Contract.count({ where: {
        [Op.or]: [{ company_a_id: companyId }, { company_b_id: companyId }],
      }}),
      Message.count({ where: { receiver_id: req.user.id, is_read: false } }),
    ])

    res.json({
      stats: {
        projects: projectCount,
        partners: activeCollabs,
        contracts: contractCount,
        unread_messages: unreadMessages,
      },
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' })
  }
})

module.exports = router
