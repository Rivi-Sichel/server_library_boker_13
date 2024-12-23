import { model, Schema } from "mongoose";


const authorSchema = Schema({
    firstName: String,
    lastName: String,
    address: String
})


export const bookSchema = Schema({
    name: String,
    numPages: Number,
    publishDate: { type: Date, default: new Date() },
    categories: [String],
    author: authorSchema
    /*    author: {//_id כך הוא לא מקבל 
            firstName: String,
            lastName: String,
            address: String
        }*/
})
//לכתוב שם ביחיד כי הוא הופך לרבים

export const bookModel = model("book", bookSchema);
// export const authorModel = model("author", authorSchema);