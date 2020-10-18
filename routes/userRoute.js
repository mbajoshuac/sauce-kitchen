const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { userLogin, addUser, getAUser, getAllUser, deleteUser, updateUser } = require('./../controllers/userControllers')


router.route('/login').post(userLogin)
router.route('/all').get(authUser, authorizeAdmin, getAllUser)
router.route('/signup').post(addUser) // register a new user
router.route('/delete/:id').delete(authUser, authorizeAdmin, deleteUser)
router.route('/edit/:id').patch(authUser, updateUser) // user can edit profile with this route
router.route('/:id').get(authUser, getAUser)

module.exports = router