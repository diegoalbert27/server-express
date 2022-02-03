require('dotenv').config()
require('./mongo')

const logger = require('./utils/logger')
const path = require('path')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const phonebook = require('./routes/phonebook.routes')
const notes = require('./routes/notes.routes')

const handleErrors = require('./middleware/handleErrors.js')
const notFound = require('./middleware/notFound.js')

const PORT = 3001

// Configuration
app.set('port', process.env.PORT || PORT)

// Middleware
app.use(cors())
app.use(morgan('dev'))

Sentry.init({
  dsn: 'https://b7f724e6263a4019805fadb1010da3a4@o1065088.ingest.sentry.io/6056400',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())
app.use(express.static('build'))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/phonebook', phonebook)
app.use('/api/notes', notes)

app.use(notFound)

app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const server = app.listen(app.get('port'), () => logger.info(`server listening on port ${app.get('port')}`))

module.exports = { app, server }
