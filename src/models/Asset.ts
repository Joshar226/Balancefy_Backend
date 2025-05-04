import mongoose, { Document, Schema, Types } from "mongoose";

export type AssetType = Document & {
    title: string,
    value: number
}

export const assetSchema : Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Asset = mongoose.model<AssetType>('Asset', assetSchema)
export default Asset