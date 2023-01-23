const express = require("express")
const http = require("http")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routes")
const logger= require("./logger/logger")
require("dotenv").config()


const conecction = process.env.URL_DB
const port = process.env.PORT

mongoose.connect(conecction,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => logger.info("connected to chatDB "))
.catch((err) => logger.info(err))

const app = express();
const server = http.createServer(app);
server.listen(port, () => {logger.info("server listen in port "+port)})

app.use(cors())
app.use(express.json())
app.use("/api", routes)
app.use(express.urlencoded({extended: false}))


