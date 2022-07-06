const express = require('express')
const router = express.Router()

const Author = require('../models/author')

// all authors
router.get('/',async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        console.log(authors);
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
         })
    } catch (error) {
        res.redirect('/')
    }
})

// new author (present form)
router.get('/new',(req,res) => {
    res.render('authors/new',{ author: new Author() })         // refers to views/authors/new.ejs
})

// new author (create)
router.post('/',async (req,res) => {
    const author = new Author({ name: req.body.name })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id})
        console.log(process.env.DATABASE_URL);
        console.log(newAuthor);
        res.redirect('/')
    } catch (err) {
        console.log(err._message)
        res.render('authors/new',{ author: author, errorMessage: `Error creating author: ${err}` })
    }
})

module.exports = router