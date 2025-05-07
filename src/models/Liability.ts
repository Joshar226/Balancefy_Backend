import mongoose, { Document, Schema, Types } from "mongoose";

export type LiabilityType = Document & {
    title: string,
    value: number,
    owner: Types.ObjectId
}

export const liabilitySchema : Schema = new Schema ({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Liability = mongoose.model<LiabilityType>('Liability', liabilitySchema)
export default Liability