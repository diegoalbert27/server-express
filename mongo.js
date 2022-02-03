const mongoose = require('mongoose')
const logger = require('./utils/logger')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// comment for students puposes
if (!connectionString) {
  logger.error('Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso).')
}

// Conexión a mongo.db
mongoose.connect(connectionString)
  .then(() => logger.info('Database Connect'))
  .catch(err => logger.error(err))

process.on('uncaughtException', error => {
  logger.error(error)
  mongoose.disconnect()
})
