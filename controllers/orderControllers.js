const Order = require('../models/ordersModel')
const Meal = require('../models/mealsModel')
const User = require('../models/usersModel')
const { catchWrapper } = require('./../utils/helpers');
const response = require('./../utils/response')


exports.makeOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    console.log(userId);
    const { mealId, quantity, officeRoomNumber } = req.body
    let meal = await Meal.findById(mealId)
    console.log(meal);
    if (!meal || !quantity || !officeRoomNumber) return next(Error(`Oops! Please provide a Meal Id, Quantity and OfficeRoomNumber you want to Order`))
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
    res.status(200).json(response(true, "Here are all the orders", order))
})

//get all orders of a specific user
exports.myOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    const order = await Order.find({ user: userId })
    if (!order) return next(Error(`Oops! You have not bought from Sauce Resturant before... Make an order today`))
    res.status(200).json(response(true, "Here are your Order list", order))
})


//update Order delivery status
exports.updateOrder = catchWrapper(async(req, res, next) => {
    const userId = req.user._id
    const { orderId, status } = req.body
    if (!orderId || !status) return next(Error(`Oops! you need to provide OrderId and delivery Status- [delivered or Cancelled ]`))
    const order = await Order.findById({ _id: orderId })
    if (!order) return next(Error(`Oops! the orderid ${orderId} doesn't exist here`))
    const updateOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
    res.status(200).json(response(true, "Your Order Status has been Updated correctly", updateOrder))
})


// user edit order 
// exports.editOrder = catchWrapper(async(req, res, next) => {
//     const userId = req.user._id
//     const { orderId, mealid, quantity, officeRoomNumber, } = req.body.orderId
//         //get order that match user and Order id
//     const order = await Order.findOne({ user: userId, _id: orderId })
//     if (!order) return next(Error(`Oops! seems you're trying an order that is not yours... Try Again`))

//     const updateOrder = await Order.findByIdAndUpdate({meal:mealId, })
//     res.status(200).json(response(true, "Your Order Status has been Updated correctly", order))
// })