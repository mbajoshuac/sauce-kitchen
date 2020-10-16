const Meal = require('../models/mealsModel')
const { asyncWrapper } = require('./../utils/helpers');


exports.makeOrder = (req, res, next) => {


    res.send(200).json({ message: "hello" })
}