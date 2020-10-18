const express = require('express')
const router = express.Router()
const { authUser, authorizeAdmin } = require('./../middlewares/auth')
const { deleteOrder, completeOrder, cancelOrder, myOrder, allOrder, makeOrder } = require('./../controllers/orderControllers')


router.route('/make').post(authUser, makeOrder) //make an order
router.route('/all').get(authUser, allOrder) // get all the order in the DB
router.route('/my').get(authUser, myOrder) // get all specific user order
router.route('/cancel').post(authUser, cancelOrder) // cancel meal order
router.route('/complete/:id').post(authUser, completeOrder) // completed meal order
router.route('/delete/:id').delete(authUser, authorizeAdmin, deleteOrder) // admin update the delivery status of an order


module.exports = router