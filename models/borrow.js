import { Schema, model, Types } from "mongoose";

import { bookSchema } from "./book.js";

const borrowSchema = Schema({
    date: { type: Date, default: new Date() },
    returnDate: {
        type: Date, default: () => {
            let d = new Date()
            return d.setDate(d.getDate() + 7)
        }
    },
    userId: {
        type: Types.ObjectId,
        ref: "users"//ממנה בעת הצורך הוא ידע לשלוך את היוזר המתאים לפי הקוד
    },
    books: [bookSchema],
    isBack: { type: Boolean, default: false }


})

export const borrowModel = model("borrow", borrowSchema);
 