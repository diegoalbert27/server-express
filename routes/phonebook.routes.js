const express = require('express')
const router = express.Router()

const Phonebook = require('../models/Phonebook')

router.get('/', (req, res) => {
  Phonebook.find({})
    .then(persons => res.status(200).json(persons))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  Phonebook.findById(id)
    .then(person => {
      if (person) return res.status(200).json(person)
      res.status(404).end()
    })
})

router.post('/', (req, res, next) => {
  const person = req.body

  // if (!person || !person.name || !person.number) {
  //   return res.status(400).json({
  //     error: 'person content is missing'
  //   })
  //

  const newPerson = new Phonebook({
    name: person.name,
    number: person.number
  })

  newPerson.save()
    .then(personSaved => res.status(201).json(personSaved))
    .catch(err => next(err))

  // Phonebook.find({ name: person.name })
  //   .then(personPhone => {
  //     if (personPhone.length === 0) {
  //       const newPerson = new Phonebook({
  //         name: person.name,
  //         number: person.number
  //       })
  //       newPerson.save()
  //         .then(personSaved => res.status(201).json(personSaved))
  //         .catch(err => next(err))
  //     } else {
  //       res.status(400).json({ error: 'name must be unique' })
  //     }
  //   })
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const person = req.body

  const newPerson = {
    name: person.name,
    number: person.number
  }

  Phonebook.findByIdAndUpdate(id, newPerson, { new: true, runValidators: true, context: 'query' })
    .then(person => {
      res.status(201).json(person)
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  Phonebook.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

router.get('/info/persons', (req, res) => {
  Phonebook.find({})
    .then(persons => {
      const date = new Date()
      res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
    })
})

module.exports = router
