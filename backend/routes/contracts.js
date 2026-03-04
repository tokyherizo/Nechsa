const router = require('express').Router()
const { Op } = require('sequelize')
const { Contract } = require('../models')
const { auth } = require('../middleware/auth')
const { validate, contractSchema } = require('../middleware/validate')

// GET /api/contracts
router.get('/', auth, async (req, res) => {
  try {
    const { status, search } = req.query
    const companyId = req.company?.id || ''
    const where = {
      [Op.or]: [{ company_a_id: companyId }, { company_b_id: companyId }],
    }
    if (status && status !== 'all') where.status = status
    if (search) where.title = { [Op.iLike]: `%${search}%` }

    const contracts = await Contract.findAll({ where, order: [['created_at', 'DESC']] })
    res.json({ contracts })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contracts' })
  }
})

// GET /api/contracts/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id)
    if (!contract) return res.status(404).json({ error: 'Contract not found' })
    res.json({ contract })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contract' })
  }
})

// POST /api/contracts
router.post('/', auth, validate(contractSchema), async (req, res) => {
  try {
    const contract = await Contract.create({ ...req.body, created_by: req.user.id, company_a_id: req.company?.id })
    res.status(201).json({ contract })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contract' })
  }
})

// PUT /api/contracts/:id/sign
router.put('/:id/sign', auth, async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id)
    if (!contract) return res.status(404).json({ error: 'Not found' })
    await contract.update({ status: 'signed', signed_at: new Date() })
    res.json({ contract })
  } catch (err) {
    res.status(500).json({ error: 'Failed to sign contract' })
  }
})

// DELETE /api/contracts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id)
    if (!contract) return res.status(404).json({ error: 'Not found' })
    if (contract.created_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' })
    await contract.destroy()
    res.json({ message: 'Contract deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contract' })
  }
})

module.exports = router
