const express = require('express')
const controller = require('../controller/controller')
const app = express.Router()

app.post('/addNew',controller.addContact)
app.get('/getAll',controller.getAllContact)
app.get('/getSpecific/:id',controller.getSpecificContact)
app.put('/updateContact/:id',controller.updateContact)
app.delete('/deleteContact/:id',controller.deleteContact)

module.exports = app