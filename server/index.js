// import package here to load environment
require("dotenv").config()

const express = require('express')

const cors = require('cors');

// const port = process.env.PORT || 5000;


// Get routes to the variabel
const router = require('./src/routes')

const app = express()

const port = 5000

app.use(express.json())
app.use(cors());

// Add endpoint grouping and router
app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))

app.listen(port, () => console.log(`Listening on port ${port}!`))
