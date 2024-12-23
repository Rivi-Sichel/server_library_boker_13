import { bookModel } from "../models/book.js"


// export const getAllBooks = (req, res) => {
//     bookModel.find().then(data => {
//         res.json(data)
//     }).catch(err => {
//         console.log(err)
//         res.status(400).json({ title: "cannot get all", message: err.message })
//     })
// }
export const getAllBooks = async (req, res) => {
    try {
        let data = await bookModel.find();
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

export const getById = async (req, res) => {
    let { id } = req.params
    try {
        let data = await bookModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "book with such id not found" })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get byid", message: err.message })
    }
}

export const update = async (req, res) => {
    let { id } = req.params
    let body = req.body;
    try {

        let data = await bookModel.findByIdAndUpdate(id, body, { new: true })
        if (!data)
            return res.status(404).json({ title: "cannot update by id", message: "book with such id not found" })
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message })
    }
}
export const deleteById = async (req, res) => {
    let { id } = req.params
    try {
        let data = await bookModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({ title: "cannot delete by id", message: "book with such id not found" })
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot delete", message: err.message })
    }
}
export const add = async (req, res) => {

    let { body } = req;
    if (!body.name || !body.numPages)
        return res.json({ title: "cannot add", message: "missing parameters name or numPages" })
    try {
        let newBook = new bookModel(body);
        let data = await newBook.save()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add", message: err.message })
    }
}