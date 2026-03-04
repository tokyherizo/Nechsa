const router = require('express').Router()
const { Op } = require('sequelize')
const { MarketplaceItem } = require('../models')
const { auth } = require('../middleware/auth')

// GET /api/marketplace
router.get('/', auth, async (req, res) => {
  try {
    const { category, search, page = 1, limit = 24 } = req.query
    const where = {}
    if (category && category !== 'all') where.category = category
    if (search) where.title = { [Op.iLike]: `%${search}%` }

    const { rows: items, count } = await MarketplaceItem.findAndCountAll({
      where,
      include: [{ association: 'company', attributes: ['id', 'name', 'logo_url'] }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['is_featured', 'DESC'], ['rating', 'DESC']],
    })
    res.json({ items, total: count })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch marketplace' })
  }
})

// GET /api/marketplace/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id, {
      include: [{ association: 'company' }],
    })
    if (!item) return res.status(404).json({ error: 'Item not found' })
    res.json({ item })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

// POST /api/marketplace
router.post('/', auth, async (req, res) => {
  try {
    const item = await MarketplaceItem.create({ ...req.body, company_id: req.company?.id })
    res.status(201).json({ item })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create listing' })
  }
})

module.exports = router
