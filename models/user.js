import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    fine: { type: Number, default: 0 }
})

export const userModel = model("user", userSchema)