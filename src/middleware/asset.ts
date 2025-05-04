import { Request, Response, NextFunction } from "express";
import Asset, { AssetType } from "../models/Asset";

declare global {
    namespace Express {
        interface Request {
            asset: AssetType
        }
    }
}

export async function assetExist(req: Request, res: Response, next: NextFunction) {
    try {
        const {assetId} = req.params
        const asset = await Asset.findById(assetId)
        if(!asset) {
            const error = new Error('Asset not found')
            res.status(404).json({error: error.message})
            return
        }
        req.asset = asset
        next()
    } catch (error) {
        res.status(500).json({error})
    }
}