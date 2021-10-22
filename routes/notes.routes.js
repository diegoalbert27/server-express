const express = require('express')
const router = express.Router()

let { notes } = require('../db.json')

router.get('/', (req, res) => {
  res.status(200).json(notes)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(note => note.id === Number(id))
  res.status(200).json(note)
})

router.post('/', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { content, important } = req.body

  notes = notes.filter(note => note.id !== Number(id))

  const note = {
    id: Number(id),
    content,
    date: new Date().toISOString(),
    important
  }

  notes = notes.concat(note)

  res.status(201).json(note)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== Number(id))
  res.status(204).end()
})

module.exports = router
