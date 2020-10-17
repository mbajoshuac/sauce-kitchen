const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { makeOrder } = require('./../controllers/orderControllers')


router.route('/make/:id').post(authUser, makeOrder)

// router
//     .route('/:id')
//     .get(getAUser)
//     .delete(deleteUser)
//     .patch(updateUser)

// router
//     .route('/login')
//     .post(userLogin)

module.exports = router