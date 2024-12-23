import { borrowModel } from "../models/borrow.js"
import { userModel } from "../models/user.js";

export const getAllBorrows = async (req, res) => {

    try {
        let result = await borrowModel.find().populate("userId");
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}
export const getBorrowById = async (req, res) => {
    try {
        let result = await borrowModel.findById(req.params.id).populate("userId");
        if (!result)
            return res.status(404).json({ title: "cannot find by id", message: "borrow with such id not found" })
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get byID", message: err.message })
    }
}
export const getBorrowsByUserId = async (req, res) => {
    let { userid } = req.params;
    try {
        let result = await borrowModel.find({ userId: userid }).populate("userId");
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get all by user id", message: err.message })
    }

}
export const returnBorrow = async (req, res) => {
    try {
        let result = await borrowModel.findByIdAndUpdate(req.params.id, { isBack: true }, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "borrow with such id not found" })
        if (new Date(result.returnDate) < new Date()) {
            let user = await userModel.findByIdAndUpdate(result.userId, { $inc: { fine: result.books.length * 10 } }, { new: true })
            res.json({ result: result, message: "too late you got a fine" });
        }
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot update byID", message: err.message })
    }


}
export const updateReturnDateById = async (req, res) => {
    let body = req.body
    if (new Date(body.returnDate) < new Date())
        return res.status(404).json({ title: "cannot update too past date", message: "" })
    try {
        let x = await borrowModel.findById(req.params.id);
        if (x.date > body.returnDate)
            return res.status(409).json({ title: "cannot update return date", message: "return date cannot be before taking date" })
        let result = await borrowModel.findByIdAndUpdate(req.params.id, { returnDate: body.returnDate }, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "borrow with such id not found" })
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot update return date", message: err.message })
    }

}
export const addBorrow = async (req, res) => {
    let { body } = req;
    if (!body.userId || !body.books || !body.books.length)
        return res.status(404).json({ title: "cannot add borreow", message: "missing details:userId/books" })
    try {
        let user = await userModel.findById(body.userId)
        if (!user)
            return res.status(404).json({ title: "no such user", message: "" })
        if (user.fine > 0)
            return res.status(403).json({ title: "this user neewd to pay fine", message: "cannot borrow" })
        let newBorrow = new borrowModel(body)
        await newBorrow.save();
        res.json(newBorrow);
    }
    catch (err) {
        res.status(400).json({ title: "cannot update byID", message: err.message })
    }
}