const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { userLogin, addUser, getAUser, getAllUser, deleteUser, updateUser } = require('./../controllers/userControllers')


router.route('/login').post(userLogin)
router.route('/all').get(authUser, getAllUser)
router.route('/signup').post(addUser)
router.route('/delete/:id').delete(deleteUser)
router.route('/edit/:id').patch(updateUser)
router.route('/:id').get(getAUser)

module.exports = router