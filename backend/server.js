import express from 'express'
import { connectDB } from './Database/database.js'
import dotenv from 'dotenv'
import authRoute from './Routes/userRoute.js'
dotenv.config({})

const app = express()
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json()) // allows us to parse incoming requests req.body

app.use('/api',authRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on PORT:${PORT}`)
})