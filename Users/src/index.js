const express = require('express')
const app = express()
const cors = require("cors")
const logger = require("./logger/logger")
const mongoose = require('mongoose')
const routes = require("./routes")
require("./passportConfig")
require("dotenv").config()

const port = process.env.PORT

app.use(express.json())
app.use(cors({origin: "*",}))
app.use("/api",routes)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => logger.info("connected to usersDB"))
	.catch(err => logger.error(err))



app.listen(port, () => {
	logger.info(`users microservice listening on port ${port}`)
})