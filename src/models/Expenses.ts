import mongoose, { Document, Schema, Types } from "mongoose";

export type ExpenseType = Document & {
    title: string,
    value: number,
    date: Date
}

export const expenseSchema : Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
}, {timestamps: true})

const Expense = mongoose.model<ExpenseType>('Expense', expenseSchema)
export default Expense