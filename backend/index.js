import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

app.use(express.json())

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