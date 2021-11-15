const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const phonebookSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: [3, 'Must be at least 3, got {VALUE}'] },
  number: { type: String, required: true, minlength: [8, 'Must be at least 8, got {VALUE}'] }
})

phonebookSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator', required: true })

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phonebook = model('Phonebook', phonebookSchema)

module.exports = Phonebook
