const setupSocket = (io) => {
  // Track online users
  const onlineUsers = new Map()

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`)

    // Join user's personal room
    socket.on('join', (userId) => {
      socket.join(userId)
      onlineUsers.set(userId, socket.id)
      io.emit('user_online', { userId, online: true })
      console.log(`👤 User ${userId} joined`)
    })

    // Join conversation room
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conv_${conversationId}`)
    })

    // Send message via socket
    socket.on('send_message', (data) => {
      const { receiver_id, conversation_id, message } = data
      // Emit to receiver's personal room
      io.to(receiver_id).emit('new_message', message)
      // Emit to conversation room
      io.to(`conv_${conversation_id}`).emit('message', message)
    })

    // Typing indicator
    socket.on('typing', ({ conversation_id, user_id, is_typing }) => {
      socket.to(`conv_${conversation_id}`).emit('typing', { user_id, is_typing })
    })

    // Read receipt
    socket.on('mark_read', ({ conversation_id, user_id }) => {
      socket.to(`conv_${conversation_id}`).emit('messages_read', { user_id })
    })

    // Disconnect
    socket.on('disconnect', () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId)
          io.emit('user_online', { userId, online: false })
          console.log(`👋 User ${userId} disconnected`)
          break
        }
      }
    })
  })
}

module.exports = setupSocket
