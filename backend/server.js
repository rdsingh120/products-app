import express from 'express'
import 'dotenv/config'
import path from 'path'
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.route.js'
const app = express()
const port = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(express.json())
app.use('/api/products', productRoutes)
console.log('Hello ' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  console.log('getting static files')
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

//connect to the database first
const startServer = async () => {
  await connectDB()
  app.listen(port, () => {
    console.log(`server is listening on port ${port}...`)
  })
}

startServer()
