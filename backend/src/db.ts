import Database from 'better-sqlite3'

//opens the file lockit.db (and creates it the first time)
const db = Database('lockit.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email TEXT NOT NULL UNIQUE
    )
`)

export default db