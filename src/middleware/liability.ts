import { Request, Response, NextFunction } from "express";
import Liability, { LiabilityType } from "../models/Liability";

declare global {
    namespace Express {
        interface Request {
            liability: LiabilityType
        }
    }
}

export async function liabilityExist(req: Request, res: Response, next: NextFunction) {
    try {
        const {liabilityId} = req.params
        const liability = await Liability.findById(liabilityId)
        if(!liability) {
            const error = new Error('Liability not found')
            res.status(404).json({error: error.message})
            return
        }
        req.liability = liability
        next()
    } catch (error) {
        res.status(500).json({error})
    }
}