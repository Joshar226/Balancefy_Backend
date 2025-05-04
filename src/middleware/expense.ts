import { Request, Response, NextFunction } from "express";
import Expense, { ExpenseType } from "../models/Expenses";

declare global {
    namespace Express {
        interface Request {
            expense: ExpenseType
        }
    }
}

export async function expenseExist(req: Request, res: Response, next: NextFunction) {
    try {
        const {expenseId} = req.params
        const expense = await Expense.findById(expenseId)
        if(!expense) {
            const error = new Error('Expense not found')
            res.status(404).json({error: error.message})
            return
        }
        req.expense = expense
        next()
    } catch (error) {
        res.status(500).json({error})
    }
}