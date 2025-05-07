import type { Request, Response } from "express"
import Asset from "../models/Asset"

export class AssetController {
    static createAsset = async (req: Request, res: Response) => {
        const asset = new Asset(req.body)
        asset.owner = req.user.id
        try {
            await asset.save()
            res.send('Asset Created')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static getAllAssets = async (req: Request, res: Response) => {
        try {
            const assets = await Asset.find({owner: req.user.id})
            res.json(assets)
        } catch (error) {
            console.log(error)
        }
    }

    static getAssetById = async (req: Request, res: Response) => {
        try {
            res.json(req.asset)
        } catch (error) {
            console.log(error)
        }
    }

    static updateAssetById = async (req: Request, res: Response) => {
        try {
            req.asset.title = req.body.title
            req.asset.value = req.body.value
            await req.asset.save()
            res.send('Asset Updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static deleteAssetById = async (req: Request, res: Response) => {
        try {
            await req.asset.deleteOne()
            res.send('Asset Deleted')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }
}