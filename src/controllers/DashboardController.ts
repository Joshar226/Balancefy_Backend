import type { Request, Response } from "express"
import Liability from "../models/Liability"
import Expense from "../models/Expenses"
import Asset from "../models/Asset"
import Income from "../models/Incomes"

export class DashboardController {
    static getAllData = async (req: Request, res: Response) => {
        try {
            const incomes = await Income.find({owner: req.user.id})
            const expenses = await Expense.find({owner: req.user.id})
            const assets = await Asset.find({owner: req.user.id})
            const liabilities = await Liability.find({owner: req.user.id})

            const data = {
                incomes,
                expenses,
                assets,
                liabilities
            }

            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }

    static getIncomeExpenseData = async (req: Request, res: Response) => {
        try {
            const incomes = await Income.find({owner: req.user.id})
            const expenses = await Expense.find({owner: req.user.id})

            const data = {
                incomes,
                expenses
            }

            res.json(data)
        } catch (error) {
            console.log(error)
        }
    }
}