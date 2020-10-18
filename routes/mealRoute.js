const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { addMeal, getAMeal, getAllMeal, deleteMeal, updateMeal } = require('./../controllers/mealControllers')


router.route('/all').get(getAllMeal) // view all meals
router.route('/:id').get(getAMeal) // get a particular meal
router.route('/add').post(authUser, authorizeAdmin, addMeal) // admin add a new meal
router.route('/delete/:id').delete(authUser, authorizeAdmin, deleteMeal) // admin delete a particula meal
router.route('/edit/:id').patch(authUser, authorizeAdmin, updateMeal) // Admin edit/update a particular meal


module.exports = router