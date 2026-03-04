const { z } = require('zod')

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (err) {
    const errors = err.errors?.map(e => ({ field: e.path.join('.'), message: e.message }))
    res.status(400).json({ error: 'Validation failed', details: errors })
  }
}

// Schemas
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  company_name: z.string().min(2),
  sector: z.string().optional(),
  country: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const projectSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  sector: z.string().optional(),
  collaboration_type: z.string().optional(),
  budget_min: z.number().optional(),
  budget_max: z.number().optional(),
  duration_months: z.number().int().optional(),
})

const contractSchema = z.object({
  title: z.string().min(3),
  type: z.string().optional(),
  value: z.number().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})

module.exports = { validate, registerSchema, loginSchema, projectSchema, contractSchema }
