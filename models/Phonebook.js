const { Schema, model } = require('mongoose')

const phonebookSchema = new Schema({
  name: String,
  number: String
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phonebook = model('Phonebook', phonebookSchema)

module.exports = Phonebook
