const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// Conexión a mongo.db
mongoose.connect(connectionString)
  .then(() => console.log('Database Connect'))
  .catch(err => console.error(err))
