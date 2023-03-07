require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const connectDB = require('./db/connect')
const userRouter = require('./routes/user-routes')
const blogRouter = require('./routes/blog-routes')



const port = process.env.PORT || 3000


app.use('/api/v1/users', userRouter)
app.use('/api/v1/blogs', blogRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listeniing on ${port}...`))
    } catch (error) {
        console.log(err)
    }
}

start()