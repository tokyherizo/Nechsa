const router = require('express').Router()
const { Op } = require('sequelize')
const { Company, User } = require('../models')
const { auth } = require('../middleware/auth')

// GET /api/companies
router.get('/', auth, async (req, res) => {
  try {
    const { search, sector, size, verified, page = 1, limit = 20 } = req.query
    const where = {}
    if (search) where.name = { [Op.iLike]: `%${search}%` }
    if (sector) where.sector = sector
    if (size) where.size = size
    if (verified === 'true') where.is_verified = true

    const { rows: companies, count } = await Company.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['is_verified', 'DESC'], ['rating', 'DESC']],
    })
    res.json({ companies, total: count, page: parseInt(page), pages: Math.ceil(count / limit) })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch companies' })
  }
})

// GET /api/companies/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [{ model: User, as: 'members', attributes: ['id', 'name', 'job_title', 'avatar_url'] }],
    })
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json({ company })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch company' })
  }
})

// PUT /api/companies/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id)
    if (!company) return res.status(404).json({ error: 'Company not found' })
    if (company.id !== req.company?.id) return res.status(403).json({ error: 'Forbidden' })
    await company.update(req.body)
    res.json({ company })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update company' })
  }
})

// GET /api/companies/matching/suggestions
router.get('/matching/suggestions', auth, async (req, res) => {
  try {
    const myCompany = req.company
    const suggestions = await Company.findAll({
      where: {
        id: { [Op.ne]: myCompany?.id || '' },
        sector: myCompany?.sector || '',
      },
      limit: 10,
      order: [['rating', 'DESC']],
    })
    res.json({ suggestions })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suggestions' })
  }
})

module.exports = router
