const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { addMeal, getAMeal, getAllMeal, deleteMeal, updateMeal, availableMeal } = require('./../controllers/mealControllers')


router.route('/addmeal').post(authUser, authorizeAdmin, addMeal)
router.route('/allmeal').get(getAllMeal)
router.route('/:id').get(getAMeal)
router.route('/delete/:id').delete(authUser, authorizeAdmin, deleteMeal)
router.route('/edit/:id').patch(authUser, authorizeAdmin, updateMeal)




module.exports = router