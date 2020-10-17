const Meal = require('../models/mealsModel')
const { catchWrapper } = require('./../utils/helpers');
const response = require('./../utils/response')


exports.addMeal = catchWrapper(async(req, res, next) => {

    const { name, description, price, photo } = req.body
    let meal = await Meal.findOne({ name })
    if (meal) {
        return next(Error(`This Meal ${name} has already been added. Kindly Update if any changes`))
    }
    meal = await Meal.create({ name, description, price, photo })

    res.status(201).json(response(true, "Meal has been added succesfully", meal))
})

//get all Meals
exports.getAllMeal = catchWrapper(async(req, res, next) => {
    const meal = await Meal.find().select('-__v')
    res.status(200).json({
        status: "Success",
        data: {
            meal
        }
    })

})

//get a specific meal with their ID
exports.getAMeal = catchWrapper(async(req, res, next) => {
    const id = req.params.id
    if (!id) return next(Error(`Please insert  a correct Meal Id you want retreive`))
    const meal = await Meal.findById(id).select('-__v')
    if (!meal) return next(Error(`Meal with id: ${id} can't be found in the record`))
    res.status(200).json(response(true, "Successfully fetched Meal", meal))
})

//delete a meal with its ID
exports.deleteMeal = catchWrapper(async(req, res, next) => {
    const id = req.params.id
    if (!id) return next(Error(`Please insert an a correct Meal Id you want to delete`))
    const meal = await Meal.findByIdAndDelete(id)
    if (!meal) {
        return next(Error(`The Meal with id: ${id} does not exist`))
    }
    res.status(204).json(response(true, "Meal successfully deleted", null))
})

//Update a specific Meal with it's id
exports.updateMeal = catchWrapper(async(req, res, next) => {
    let id = req.params.id
    if (!id) return next(Error(`Please insert an a correct Meal Id you want to update`))
    let meal = await Meal.findById(id)
    if (!meal) return next(Error(`The Meal with this id ${id} does not exist`))

    const { name, description, price, photo } = req.body
    meal = await Meal.findByIdAndUpdate(user._id, { name, description, price, photo })
    res.status(200).json(response(true, "Meal successfully upated", meal))

})