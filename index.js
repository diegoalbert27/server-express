const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const phonebook = require('./routes/phonebook.routes')
const notes = require('./routes/notes.routes')

const PORT = 3001

const { persons } = require('./db.json')

// Configuration
app.set('port', process.env.PORT || PORT)

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/phonebook', phonebook)
app.use('/api/notes', notes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.listen(app.get('port'), () => console.log(`server listening on port ${app.get('port')}`))
