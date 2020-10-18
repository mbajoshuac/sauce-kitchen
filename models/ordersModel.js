const { Schema, model } = require('mongoose')


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: {
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
    },
    officeRoomNumber: String,
    status: {
        type: String,
        lowercase: true,
        enum: ['processing', 'delivered', 'cancelled'],
        default: 'processing'
    },
    totalPrice: {
        type: String,
    }
}, { timestamps: true })


orderSchema.pre(/^find/, async function(next) {
    this.populate({
        path: 'user',
        select: 'firstName lastName phone'
    }).populate({
        path: 'orders.meal',
        select: 'name isAvaliable price'
    })
})
module.exports = model('Order', orderSchema)