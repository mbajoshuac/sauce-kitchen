const express = require('express')
const router = express.Router()
const { addMeal, getAMeal, getAllMeal } = require('./../controllers/mealControllers')


router
    .route('/')
    .post(addMeal)
    .get(getAllMeal)

router
    .route('/:id')
    .get(getAMeal)


module.exports = router