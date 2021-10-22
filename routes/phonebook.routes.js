const express = require('express')
const router = express.Router()

let { persons } = require('../db.json')

router.get('/', (req, res) => {
  res.status(200).json(persons)
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.status(200).json(person)
  } else {
    res.status(404).end()
  }
})

router.post('/', (req, res) => {
  const person = req.body

  if (!person || !person.name || !person.number) {
    return res.status(400).json({
      error: 'person content is missing'
    })
  }

  const personFind = persons.find(personFind => personFind.name === person.name)

  if (!personFind) {
    const ids = persons.map(person => person.id)
    const maxId = Math.max(...ids)

    const newPerson = {
      id: maxId + 1,
      name: person.name,
      number: person.number
    }

    persons = [...persons, newPerson]

    res.status(201).json(newPerson)
  } else {
    res.status(400).json({ error: 'name must be unique' })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  persons = persons.filter(person => person.id !== Number(id))
  res.status(204).end()
})

module.exports = router
