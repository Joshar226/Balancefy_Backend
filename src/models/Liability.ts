import mongoose, { Document, Schema } from "mongoose";

export type LiabilityType = Document & {
    title: string,
    value: number
}

export const liabilitySchema : Schema = new Schema ({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Liability = mongoose.model<LiabilityType>('Liability', liabilitySchema)
export default Liability