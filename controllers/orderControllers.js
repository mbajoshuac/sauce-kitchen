const Order = require('../models/orderModel')
const { catchWrapper } = require('./../utils/helpers');
const response = require('./../utils/response')


exports.makeOrder = catchWrapper(async(req, res, next) => {

    //userid from headers token
    const userId = req.params.id

    //productid
    const { mealId, quantity, officeNumber } = req.body
    const meal = Meal.findById(mealId)

    //order list
    const userOrder = {
        meal: mealId,
        quantity: quantity
    }

    const totalPrice = (meal.price * 1) * quantity
    const newOrder = {
        user: userId,
        orders: userOrder,
        totalPrice,
        officeNumber
    }

    const order = await Order.create({ newOrder }, { new: true, runValidation: true })


    res.status(201).json(response(true, "Successsss", order))
})