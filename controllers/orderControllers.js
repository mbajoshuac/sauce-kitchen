const Order = require('../models/ordersModel')
const Meal = require('../models/mealsModel')
const { catchWrapper } = require('./../utils/helpers');
const response = require('./../utils/response')

//user places order
exports.makeOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    console.log(userId);
    const { mealId, quantity, officeRoomNumber } = req.body
    let meal = await Meal.findById(mealId)
    console.log(meal);
    if (!meal || !quantity || !officeRoomNumber) return next(Error(`Oops! Please provide a Meal Id, Quantity and OfficeRoomNumber you want to Order`))
        //check if meal is avaliable
    if (meal.isAvaliable === false) return next(Error(`Oops! This meal is no more available - 😰`))
        //order list
    let userOrder = {
        meal: mealId,
        quantity: quantity
    }
    let totalPrice = (meal.price * 1) * quantity // calculate the toal price
    const newOrder = new Order({
            user: userId,
            orders: userOrder,
            totalPrice,
            officeRoomNumber
        })
        // sending the order details to DB
    const order = await newOrder.save({ new: true, runValidation: true })
    res.status(201).json(response(true, "Your Meal order has been placed. We are deliverying it ASAP", order))
})


// get all orders on the DB
exports.allOrder = catchWrapper(async(req, res, next) => {
    const order = await Order.find().select('-__v')
    if (!order) return next(Error(`Oops - Nobody has placed order here. Madam Sauce hold on`))
    res.status(200).json(response(true, "Here are all the orders - 😎", order))
})

//get all orders of a specific user
exports.myOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    const order = await Order.find({ user: userId })
    if (!order) return next(Error(`Oops! You have not bought from Sauce Resturant before... Make an order today`))
    res.status(200).json(response(true, "Here are your Order list - 🙅", order))
})



//user cancels order that was placed
exports.cancelOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    const { orderId } = req.body
    if (!orderId) return next(Error(`Oops! you need to provide OrderId cancel your Meal order`))
    const order = await Order.findById({ _id: orderId })
    if (!order) return next(Error(`Oops! the orderid ${orderId} doesn't exist here`))
    const cancelledOrder = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true, omitUndefined: true })
    res.status(200).json(response(true, "We are so sad you cancelled your order - 😭", cancelledOrder))
})

//user complete their order when meal is delivered
exports.completeOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    const { orderId } = req.body
    if (!orderId) return next(Error(`Oops! you need to provide OrderId cancel your Meal order`))
    const order = await Order.findById({ _id: orderId })
    if (!order) return next(Error(`Oops! the orderid ${orderId} doesn't exist here`))

    const completedOrder = await Order.findByIdAndUpdate(orderId, { status: 'delivered' }, { new: true, omitUndefined: true })
    res.status(200).json(response(true, "We are so sad you cancelled your order - 😭", completedOrder))
})

//admin deletes order record
exports.deleteOrder = catchWrapper(async(req, res, next) => {
    const orderId = req.params.id
    if (!orderId) return next(Error(`Oops! you're trying to delete an order that doesn't exist - 😏`))
    const order = await Order.findByIdAndDelete({ _id: orderId }, { new: true })
    if (!order) return next(Error(`The order with this id: ${id} does not exist - 😢`))
    res.status(204).json(response(true, "You have successfully deleted this order - ⚡", null))
})