const router = require('express').Router()
const { Collaboration } = require('../models')
const { auth } = require('../middleware/auth')

// GET /api/collaboration
router.get('/', auth, async (req, res) => {
  try {
    const collabs = await Collaboration.findAll({
      where: {
        $or: [{ requester_id: req.company?.id }, { receiver_id: req.company?.id }],
      },
    })
    res.json({ collaborations: collabs })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch collaborations' })
  }
})

// POST /api/collaboration/request
router.post('/request', auth, async (req, res) => {
  try {
    const { receiver_id, project_id, type, message } = req.body
    const existing = await Collaboration.findOne({
      where: { requester_id: req.company?.id, receiver_id },
    })
    if (existing) return res.status(409).json({ error: 'Collaboration request already sent' })

    const collab = await Collaboration.create({
      requester_id: req.company?.id,
      receiver_id,
      project_id,
      type,
      message,
    })
    res.status(201).json({ collaboration: collab })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send request' })
  }
})

// PUT /api/collaboration/:id/respond
router.put('/:id/respond', auth, async (req, res) => {
  try {
    const { action } = req.body // 'accept' | 'reject'
    const collab = await Collaboration.findByPk(req.params.id)
    if (!collab) return res.status(404).json({ error: 'Not found' })
    if (collab.receiver_id !== req.company?.id) return res.status(403).json({ error: 'Forbidden' })
    const status = action === 'accept' ? 'accepted' : 'rejected'
    await collab.update({ status })
    res.json({ collaboration: collab })
  } catch (err) {
    res.status(500).json({ error: 'Failed to respond' })
  }
})

module.exports = router
