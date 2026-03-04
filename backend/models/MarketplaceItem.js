const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const MarketplaceItem = sequelize.define('MarketplaceItem', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  pricing_model: { type: DataTypes.ENUM('monthly', 'yearly', 'one_time', 'usage'), defaultValue: 'monthly' },
  price: { type: DataTypes.DECIMAL(10, 2) },
  currency: { type: DataTypes.STRING, defaultValue: 'USD' },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  logo_url: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  review_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  company_id: { type: DataTypes.UUID, references: { model: 'Companies', key: 'id' } },
})

module.exports = MarketplaceItem
