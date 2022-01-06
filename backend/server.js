import express from 'express'
import userRouter from './routes/userRoutes'
import goalsRouter from './routes/goalsRoutes'

const app = express()

app.use(express.json())

app.use('/user', userRouter)

app.use('/goals', goalsRouter)

app.listen(5000, () => {
    console.log("app listening at http://localhost:5000")
})