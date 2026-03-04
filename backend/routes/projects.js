const router = require('express').Router()
const { Op } = require('sequelize')
const { Project } = require('../models')
const { auth } = require('../middleware/auth')
const { validate, projectSchema } = require('../middleware/validate')

// GET /api/projects
router.get('/', auth, async (req, res) => {
  try {
    const { search, status, sector, page = 1, limit = 20 } = req.query
    const where = {}
    if (search) where.title = { [Op.iLike]: `%${search}%` }
    if (status && status !== 'all') where.status = status
    if (sector) where.sector = sector

    const { rows: projects, count } = await Project.findAndCountAll({
      where,
      include: [{ association: 'company', attributes: ['id', 'name', 'logo_url', 'country'] }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['created_at', 'DESC']],
    })
    res.json({ projects, total: count })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// GET /api/projects/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ association: 'company' }],
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ project })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// POST /api/projects
router.post('/', auth, validate(projectSchema), async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      company_id: req.company?.id,
      created_by: req.user.id,
    })
    res.status(201).json({ project })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' })
  }
})

// PUT /api/projects/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    if (project.company_id !== req.company?.id) return res.status(403).json({ error: 'Forbidden' })
    await project.update(req.body)
    res.json({ project })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' })
  }
})

// DELETE /api/projects/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    if (project.company_id !== req.company?.id) return res.status(403).json({ error: 'Forbidden' })
    await project.destroy()
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

module.exports = router
