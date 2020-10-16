const { Schema, model } = require('mongoose')


const mealSchema = new Schema({

    name: {
        type: String,
        minlength: [5, "Meal name must be more than 5 characters"],
        required: [true, "Meal name is Required"]
    },
    description: {
        type: String,
        required: [true, "Meal description is required"],
        minlength: [10, "Meal Description must be more than 10 Characters"]
    },
    price: {
        type: Number,
        required: [true, "Meal Price is required"]

    },
    photo: {
        type: String,
        required: [true, "Meal photo is required"]
    },
    isAvaliable: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Meal', mealSchema)

mealSchema.pre('save', async function(next) {
    this.isAvaliable = true
    next()
})