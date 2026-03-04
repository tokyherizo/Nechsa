const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Project = sequelize.define('Project', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  objectives: { type: DataTypes.TEXT },
  sector: { type: DataTypes.STRING },
  collaboration_type: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('draft', 'open', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'open',
  },
  budget_min: { type: DataTypes.DECIMAL(15, 2) },
  budget_max: { type: DataTypes.DECIMAL(15, 2) },
  duration_months: { type: DataTypes.INTEGER },
  skills_needed: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  progress: { type: DataTypes.INTEGER, defaultValue: 0 },
  start_date: { type: DataTypes.DATEONLY },
  end_date: { type: DataTypes.DATEONLY },
  company_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Companies', key: 'id' } },
  created_by: { type: DataTypes.UUID, references: { model: 'Users', key: 'id' } },
})

module.exports = Project
