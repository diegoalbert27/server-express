const express = require('express')
const router = express.Router()
const logger = require('./utils/logger')

const Note = require('../models/Note.js')

router.get('/', (req, res) => {
  Note.find({})
    .then(notes => res.status(200).json(notes))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Note.findById(id)
    .then(note => {
      if (note) return res.status(200).json(note)
      res.status(404).end()
    })
    .catch(err => next(err))
})

router.post('/', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save()
    .then(savedNote => res.status(201).json(savedNote))
    .catch(err => logger.info(err))
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  const newNoteInfo = {
    content,
    important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

module.exports = router
