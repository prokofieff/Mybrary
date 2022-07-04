const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.render('index')         // refers to index.ejs in views folder
})

module.exports = router