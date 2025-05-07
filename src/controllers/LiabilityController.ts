import type { Request, Response } from "express"
import Liability from "../models/Liability"

export class LiabilityController {
    static createLiability = async (req: Request, res: Response) => {
        const liability = new Liability(req.body)
        liability.owner = req.user.id

        try {
            await liability.save()
            res.send('Liability Created')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static getAllLiabilities = async (req: Request, res: Response) => {
        try {
            const liability = await Liability.find({owner: req.user.id})
            res.json(liability)
        } catch (error) {
            console.log(error)
        }
    }

    static getLiabilityById = async (req: Request, res: Response) => {
        try {
            res.json(req.liability)
        } catch (error) {
            console.log(error)
        }
    }

    static updateLiabilitybyId = async (req: Request, res: Response) => {
        try {
            req.liability.title = req.body.title
            req.liability.value = req.body.value
            await req.liability.save()
            res.send('Liability Updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static deleteLiabilitybyId = async (req: Request, res: Response) => {
        try {
            await req.liability.deleteOne()
            res.send('Liability Deleted')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }
}