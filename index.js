require('dotenv').config()
var morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('request', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.request(req, res)
    ].join(' ')
  })
)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const personsCount = persons.length
    const date = new Date();
    response.send(`
      <div>Phonebook has info for ${personsCount} people</div>
      <br/>
      <div>${date}</div>
    `)
  })
  
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number content missing"
    })
  }

  if (userExists(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const userExists = (name) => {
  Person.find({}).then(persons => {
    return persons.some(person => person.name === name)
  })
}


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})