const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require("./routes/routes")
const session = require('express-session')
require('dotenv').config();

// sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1800000 }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(process.env.PORT,() => {
    console.log("Servidor rodando")
});
