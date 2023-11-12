import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router()

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

// Route for book creation
router.post('/', async(request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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

export default router
