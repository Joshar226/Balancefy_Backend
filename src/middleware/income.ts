import { Request, Response, NextFunction } from "express";
import Income, { IncomeType } from "../models/Incomes";

declare global {
    namespace Express {
        interface Request {
            income: IncomeType
        }
    }
}

export async function incomeExist(req: Request, res: Response, next: NextFunction) {
    try {
        const {incomeId} = req.params
        const income = await Income.findById(incomeId)
        if(!income) {
            const error = new Error('Income not found')
            res.status(404).json({error: error.message})
            return
        }
        req.income = income
        next()
    } catch (error) {
        res.status(500).json({error})
    }
}