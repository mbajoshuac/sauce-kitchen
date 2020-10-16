const express = require('express')
const router = express.Router()
const { addMeal, getAMeal, getAllMeal, deleteMeal, updateMeal, availableMeal } = require('./../controllers/mealControllers')


router
    .route('/')
    .post(addMeal)
    .get(getAllMeal)

router
    .route('/:id')
    .get(getAMeal)
    .delete(deleteMeal)
    .patch(updateMeal)




module.exports = router