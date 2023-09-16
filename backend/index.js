import express from "express";
import mongoose from "mongoose";
// import { PORT, MONGO_URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const MONGO_URL = "mongodb+srv://root:root@bookstore.s9aj3hl.mongodb.net/books-collection?retryWrites=true&w=majority";
const PORT = 5555
const app = express();

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcom to MERN project')
});

app.use('/books', booksRoute)

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