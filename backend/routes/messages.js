const router = require('express').Router()
const { Op } = require('sequelize')
const { Message, User } = require('../models')
const { auth } = require('../middleware/auth')

const getConvId = (a, b) => [a, b].sort().join('_')

// GET /api/messages/conversations
router.get('/conversations', auth, async (req, res) => {
  try {
    const userId = req.user.id
    const messages = await Message.findAll({
      where: { [Op.or]: [{ sender_id: userId }, { receiver_id: userId }] },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name', 'avatar_url'] },
        { model: User, as: 'receiver', attributes: ['id', 'name', 'avatar_url'] },
      ],
      order: [['created_at', 'DESC']],
    })

    // Group by conversation
    const convMap = {}
    for (const msg of messages) {
      const otherId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id
      const other = msg.sender_id === userId ? msg.receiver : msg.sender
      if (!convMap[otherId]) {
        convMap[otherId] = {
          conversation_id: getConvId(userId, otherId),
          other_user: other,
          last_message: msg,
          unread_count: 0,
        }
      }
      if (!msg.is_read && msg.receiver_id === userId) convMap[otherId].unread_count++
    }
    res.json({ conversations: Object.values(convMap) })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversations' })
  }
})

// GET /api/messages/:userId
router.get('/:userId', auth, async (req, res) => {
  try {
    const myId = req.user.id
    const otherId = req.params.userId
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: myId, receiver_id: otherId },
          { sender_id: otherId, receiver_id: myId },
        ],
      },
      include: [{ model: User, as: 'sender', attributes: ['id', 'name', 'avatar_url'] }],
      order: [['created_at', 'ASC']],
    })
    // Mark as read
    await Message.update(
      { is_read: true, read_at: new Date() },
      { where: { sender_id: otherId, receiver_id: myId, is_read: false } }
    )
    res.json({ messages })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

// POST /api/messages
router.post('/', auth, async (req, res) => {
  try {
    const { receiver_id, content, type } = req.body
    const message = await Message.create({
      sender_id: req.user.id,
      receiver_id,
      content,
      type: type || 'text',
      conversation_id: getConvId(req.user.id, receiver_id),
    })

    // Emit via socket
    const io = req.app.get('io')
    io?.to(receiver_id).emit('new_message', message)

    res.status(201).json({ message })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' })
  }
})

module.exports = router
