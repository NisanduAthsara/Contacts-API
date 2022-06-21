const express = require('express')
const app = express()
const PORT = 8080

require("dotenv").config();

const db = require('./utilities/db')
db.connect()

app.use(express.json())

const routes = require('./services/routes/router')
app.use('/api/',routes)

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
})