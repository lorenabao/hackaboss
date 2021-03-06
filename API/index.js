require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const DEFAULT_PORT = 5000
const currentPort = process.env.PORT || DEFAULT_PORT

// Controladores
const { registro } = require('./controllers/registro')
const { login } = require('./controllers/login')
const { random } = require('./controllers/random')

// Middlewares
const { isAuthenticated } = require('./middlewares/auth')

app.post('/registro', registro)
app.post('/login', login)
app.get('/got', isAuthenticated, random)


// 404 handler
app.use( (req, res, next) => res.status(404).send('404 Not found'))

app.listen(currentPort, () => console.log(`Running on port ${currentPort}`));
