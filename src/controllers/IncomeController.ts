import type { Request, Response } from "express"
import Income from "../models/Incomes"

export class IncomeController {
    static createIncome = async (req: Request, res: Response) => {
        const income = new Income(req.body)

        try {
            await income.save()
            res.send('Income Created')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static getAllIncomes = async (req: Request, res: Response) => {
        try {
            const incomes = await Income.find()
            res.json(incomes)
        } catch (error) {
            console.log(error)
        }
    }

    static getIncomeById = async (req: Request, res: Response) => {
        try {
            res.json(req.income)
        } catch (error) {
            console.log(error)
        }
    }

    static updateIncomebyId = async (req: Request, res: Response) => {
        try {
            req.income.title = req.body.title
            req.income.value = req.body.value
            await req.income.save()
            res.send('Income Updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static deleteIncomebyId = async (req: Request, res: Response) => {
        try {
            await req.income.deleteOne()
            res.send('Income Deleted')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }
}