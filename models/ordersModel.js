const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: [{
        meal: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Meal'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    status: {
        type: String,
        enum: ['processing', 'delivered'],
        default: 'processing'
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = model(Order, orderSchema)