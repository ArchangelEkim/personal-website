const express = require('express')
const passport = require('passport')
const app = express()

const port = 3000

app.use('/', express.static('public'))
app.use('/dev', express.static('development'))

app.listen(port, () => console.log(`Web application listening at https:\\localhost:${port}`))