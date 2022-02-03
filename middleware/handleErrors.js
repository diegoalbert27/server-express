const logger = require('./utils/logger')
const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),

  defaultError: (res, error) => {
    logger.error(error.name)
    res.status(500).end()
  },

  ValidationError: (res, error) => {
    logger.info(error.name)
    res.status(400).json({ error: error.message })
  }
}

module.exports = (error, req, res, next) => {
  const handler = ERROR_HANDLERS[error.name]

  handler(res, error)
}
