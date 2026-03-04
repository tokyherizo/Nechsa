const User = require('./User')
const Company = require('./Company')
const Project = require('./Project')
const Collaboration = require('./Collaboration')
const Message = require('./Message')
const Contract = require('./Contract')
const MarketplaceItem = require('./MarketplaceItem')

// Company ↔ User
Company.hasMany(User, { foreignKey: 'company_id', as: 'members' })
User.belongsTo(Company, { foreignKey: 'company_id', as: 'company' })

// Company ↔ Project
Company.hasMany(Project, { foreignKey: 'company_id', as: 'projects' })
Project.belongsTo(Company, { foreignKey: 'company_id', as: 'company' })

// Company ↔ MarketplaceItem
Company.hasMany(MarketplaceItem, { foreignKey: 'company_id', as: 'marketplace_items' })
MarketplaceItem.belongsTo(Company, { foreignKey: 'company_id', as: 'company' })

// Message sender / receiver
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sent_messages' })
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'received_messages' })
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' })
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' })

module.exports = { User, Company, Project, Collaboration, Message, Contract, MarketplaceItem }

