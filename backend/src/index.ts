import bcrypt from 'bcryptjs'
import express from 'express'
import db from './db'

type User = { id : number; email : string; password_hash : string }

const app = express() 
const PORT = 3000

app.use(express.json())

app.post('/sign-up', (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).send('email and password are required')
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    try{
        db.prepare('INSERT INTO USERS (email, password_hash) VALUES (?, ?)').run(email, passwordHash)
        res.status(201).send(`account created for ${email}`)
    } catch (err) {
        res.status(409).send('that email is already taken')
    }
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).send('email and password are required')
    }
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return res.status(401).send('invalid email or password')
    }
    res.send(`welcome back ${user.email}`)
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

