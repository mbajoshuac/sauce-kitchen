const Meal = require('./../models/meals')
const { asyncWrapper } = require('./../utils/helpers');


exports.addMeal = asyncWrapper(async(req, res, next) => {
    const { name, description, price, photo } = req.body
    let meal = await User.findOne({ name })
    if (meal) {
        return next(Error(`This Meal ${name} has already been adde. Kindly Update if any changes`))
    }
    user = await Meal.create({ name, description, price, photo })

    res.status(201).json({
        status: "Success",
        data: {
            meal
        }
    })
})

exports.getAllMeal = asyncWrapper(async(req, res, next) => {
    const meal = await Meal.find()
    res.status(200).send({
        status: "Success",
        message: {
            meal
        }
    })

})

exports.addMeal = asyncWrapper(async(req, res, next) => {

    res.status(201).send({ message: `Meal adding to db` })

})

exports.addMeal = asyncWrapper(async(req, res, next) => {

    res.status(201).send({ message: `Meal adding to db` })

})

exports.addMeal = asyncWrapper(async(req, res, next) => {

    res.status(201).send({ message: `Meal adding to db` })

})