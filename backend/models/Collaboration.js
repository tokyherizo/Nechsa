const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Collaboration = sequelize.define('Collaboration', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'active', 'completed'),
    defaultValue: 'pending',
  },
  type: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  requester_id: { type: DataTypes.UUID, references: { model: 'Companies', key: 'id' } },
  receiver_id: { type: DataTypes.UUID, references: { model: 'Companies', key: 'id' } },
  project_id: { type: DataTypes.UUID, references: { model: 'Projects', key: 'id' } },
})

module.exports = Collaboration
