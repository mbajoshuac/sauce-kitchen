const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { updateOrder, myOrder, allOrder, makeOrder } = require('./../controllers/orderControllers')


router.route('/make').post(authUser, makeOrder) //make an order
router.route('/all').get(authUser, allOrder) // get all the order in the DB
router.route('/my').get(authUser, myOrder) // get all specific user order
router.route('/update').post(authUser, authorizeAdmin, updateOrder) // update the delivery status of an order

// router
//     .route('/:id')
//     .get(getAUser)
//     .delete(deleteUser)
//     .patch(updateUser)

// router
//     .route('/login')
//     .post(userLogin)

module.exports = router