import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            requrired: true
        },
        author: {
            type: String,
            requrired: true
        },
        publishYear: {
            type: Number,
            requrired: true
        },
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('Books', bookSchema);