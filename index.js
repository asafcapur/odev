const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT || 3000

app.use(express.json())

const Book = require('./models/Book')

// 

app.get('/', (req, res) => {
    try {

        res.status(201).send("hello world")

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})



app.post('/books', async (req, res) => {

    try {

        if (!req.body.title || !req.body.author) {
            return res.status(404).send({ message: "Hata! title ve author gerekli" })
        }

        const newBook = { title: req.body.title, author: req.body.author, publishYear: req.body.publishYear }
        const book = await Book.create(newBook)
        return res.status(201).send({ message: "Başarılı", data: book })

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

})

app.get('/books', async (req, res) => {

    try {

        const books = await Book.find({});
        return res.status(201).send({ message: "Başarılı", data: books, count: books.length })

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

})

app.get('/books/:id', async (req, res) => {

    const id = req.params.id
    // const {id, elma} = req.params

    console.log(id);


    try {

        const book = await Book.findById(id)
        return res.status(201).send({ message: "Başarılı", data: book })


    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

})


mongoose.connect(process.env.MONGO_URI)
    .then(
        app.listen(port, () => {
            console.log("sunucu çalışmaya başladı Kardeşım....." + port);
        })
    )
    .catch((error) => {
        console.log(error);
    })