const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Company = sequelize.define('Company', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.TEXT },
  sector: { type: DataTypes.STRING },
  size: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  logo_url: { type: DataTypes.STRING },
  cover_url: { type: DataTypes.STRING },
  founded_year: { type: DataTypes.INTEGER },
  revenue: { type: DataTypes.STRING },
  languages: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  certifications: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  services: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_premium: { type: DataTypes.BOOLEAN, defaultValue: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  review_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  project_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  partner_count: { type: DataTypes.INTEGER, defaultValue: 0 },
})

module.exports = Company
