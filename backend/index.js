import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URL } from "./config.js";
import { Book } from "./models/bookModel.js"

const app = express();

app.use(express.json())

function Validate(req) { 
    if (!req.body.title || !req.body.author || !req.body.publishYear){
        return false
    }
    return true
}

function ResultMessage(res, action){
    return !res ? {message: "Book not found"} : { message: `Book ${action} successfully`}
}

const validationMessage = {
    message: 'Send all required fields: title, author, publish year',
};

// Route to create a Book
app.post('/books', async(request, response) => {
    try{
        if(!Validate(request)){
            return response.status(400).send(validationMessage)
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook)
        return response.status(200).send(book)
    } catch(error){
        console.log(error.message);
    }
});

// Route to fetch all the books
app.get('/books', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        })
    }catch (error){
        response.status(500).json({
            Error: error.message
        })
    }
})

// Route a specific book
app.get('/books/:id', async (request, response) => {
    try{
        const { id } = request.params
        const book = await Book.findById(id);
        return response.status(200).json(book)
    }catch (error){
        response.status(500).json({
            Error : error.message
        })
    }
})

// Update a specific book
app.put('/books/:id', async (request, response) => {
    try{
        if(!Validate(request)){
            return response.status(400).send(validationMessage)
        }
        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)
        return response.status(200).send(ResultMessage(result, 'Updated'))
    }catch (error){
        response.status(500).json({
            'Error': error.message
        })
    }
})

// Delete a specific book
app.delete('/books/:id', async (request, response) => {
    try{
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)
        return response.status(200).send(ResultMessage(result, 'Deleted'))
    }catch (error){
        response.status(500).json({
            'Error': error.message
        })
    }
})

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcom to MERN project')
});

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('App connected Database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    })
})
.catch((error) => {
    console.log(error);
});