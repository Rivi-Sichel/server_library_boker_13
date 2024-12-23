import { Router } from "express";
//שורת רווח בין ייבוא של ספריות לבין ייבוא של קוד שאנחנו בנינו
import {addBorrow ,getAllBorrows, getBorrowById, getBorrowsByUserId, returnBorrow, updateReturnDateById } from "../controllers/borrow.js";

const router = Router();
router.get("/", getAllBorrows)
router.get("/:id", getBorrowById)
router.get("/byuserid/:userid", getBorrowsByUserId)
router.put("/:id", returnBorrow)
router.put("/putreturndate/:id", updateReturnDateById)
router.post("/", addBorrow)
export default router;

