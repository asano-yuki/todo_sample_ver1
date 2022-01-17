import express from 'express'
import { Request, Response } from 'express'
import mysql from 'mysql'
import cors from 'cors'

const allowOrigin = [
  'http://localhost:3000',
  'http://localhost:3001'
]

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    if (origin && allowOrigin.includes(origin)) return callback(null, true)
  }
}))

const connection = mysql.createConnection({
  host: '172.30.0.5',
  user: 'root',
  password: 'root',
  database: 'Todo_Sample_Ver1'
})

connection.connect(err => {
  if (!err) return
  console.log(`error connecting: ${err.stack}`)
})

app.get('/todos', (req: Request, res: Response) => {
  connection.query(
    'SELECT * FROM Todos',
    (err, results) => {
      if (err) return res.status(500).send('Failed to get todos')
      return res.send(results)
    }
  )
})

app.post('/todo', (req: Request, res: Response) => {
  const name: string = req.body.name
  connection.query(
    'INSERT INTO Todos SET ?',
    { name },
    (err, results) => {
      console.log(err?.message)
      if (err) return res.status(500).send('Failed to register todo')
      return res.send({ id: results.insertId, name })
    }
  )
})

app.delete('/todo/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  connection.query(
    'DELETE FROM Todos WHERE ID = ?',
    [id],
    (err) => {
      if (err) return res.status(500).send('Failed to delete todo')
      return res.status(204).send(null)
    }
  )
})

app.listen(8080)
