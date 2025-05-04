import mongoose, { Document, Schema } from "mongoose";

export type UserType = Document & {
    email: string,
    password: string,
    name: string,
    confirmed: boolean,
    token: string
}

export const userSchema : Schema = new Schema({
    email: {
        type : String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
})

const User = mongoose.model<UserType>('User', userSchema)
export default User