require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())


const port = process.env.PORT || 3000

const start = async () => {
    try {
        // connect to DB
        app.listen(port, console.log(`Server is listeniing on ${port}...`))
    } catch (error) {
        console.log(err)
    }
}

start()