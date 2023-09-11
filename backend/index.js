import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URL } from "./config.js";
import { Book } from "./models/bookModel.js"

const app = express();

app.use(express.json())

// Route to create a Book
app.post('/books', async(request, response) => {
    try{
        console.log(request.body);
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publish year',
            });
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
        return response.status(200).send({
            count: books.length,
            data: books
        })
    }catch (error){
        console.log(error.message);
        response.status(500).send({'Error': error.message})
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