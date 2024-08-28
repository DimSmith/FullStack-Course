import mongoose, { Document,Schema,model } from "mongoose";

export interface AccountOperation extends Document{
    id:string;
    accountNumber:number;
    actionType: 'withdrawal' | 'deposit' | 'loan';
    amount: number;
    date: Date;
    interest?: number;
    numberOfPayments?: number;
}

const AccountOperationSchema = new Schema<AccountOperation>(
    {
        accountNumber: {
            type: Number,
            required: [true, "missing account Number"],
            min: [0, "account number cannot be negative"],
            trim: true,
            unique: false,
        },
        actionType: {
            type: String,
            required: true,
            enum: ['withdrawal', 'deposit', 'loan'],
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        interest: {
            type: Number,
            min: [0, "interest cannot be negative"],
            required: function(this: AccountOperation) {
                return this.actionType === 'loan';
            },
        },
        numberOfPayments: {
            type: Number,
            min: [1, "number of payments cannot be less than 1"],  
            required: function(this: AccountOperation) {
                return this.actionType === 'loan';
            },
        },
    },
    {
        versionKey: false, 
        toJSON: {virtuals: true}
    }
);

export const AccountOperationModel = model<AccountOperation>("AccountOperation", AccountOperationSchema, "accountOperations");