import express from 'express'
import db from './db'

const app = express() 
const PORT = 3000

//temporary test route
app.get('/add-user', (req, res) => {
    const email = `user${Date.now()}@mail.com` 
    db.prepare(`INSERT INTO users (email) VALUES (?)`).run(email)
    res.send(`added ${email}`)
})

// lists every user currently in the database
app.get('/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all()
  res.json(users)
})

app.get('/', (req, res) => {
    res.send('lockit backend it alive!')
})
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})

