if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine','ejs')    //see https://expressjs.com/en/api.html#app.set application settings
app.set('views',path.join(__dirname,'/views'))    //see https://expressjs.com/en/api.html#app.set application settings
app.set('layout','layouts/layout')   //must be something used by ejs?  layouts is subfolder of views

app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error',error => {
    console.log(error);
})
db.once('open',()=>console.log('Connected to db'))

app.use('/',indexRouter)

app.listen(process.env.PORT || 3200,()=>console.log('Server listening on port 3200'))