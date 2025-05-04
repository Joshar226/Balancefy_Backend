import type { Request, Response } from "express"
import Expense from "../models/Expenses"

export class ExpenseController {
    static createExpense = async (req: Request, res: Response) => {
        const expense = new Expense(req.body)
        try {
            await expense.save()
            res.send('Expense Created')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static getAllExpenses = async (req: Request, res: Response) => {
        try {
            const incomes = await Expense.find()
            res.json(incomes)
        } catch (error) {
            console.log(error)
        }
    }

    static getExpenseById = async (req: Request, res: Response) => {
        try {
            res.json(req.expense)
        } catch (error) {
            console.log(error)
        }
    }

    static updateExpenseById = async (req: Request, res: Response) => {
        try {
            req.expense.title = req.body.title
            req.expense.value = req.body.value
            await req.expense.save()
            res.send('Expense Updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static deleteExpensebyId = async (req: Request, res: Response) => {
        try {
            await req.expense.deleteOne()
            res.send('Expense Deleted')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }
}