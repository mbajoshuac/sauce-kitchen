const express = require('express')
const router = express.Router()
const { userLogin, addUser, getAUser, getAllUser, deleteUser, updateUser } = require('./../controllers/userControllers')



router
    .route('/')
    .post(addUser)
    .get(getAllUser)

router
    .route('/:id')
    .get(getAUser)
    .delete(deleteUser)
    .patch(updateUser)

router
    .route('/login')
    .post(userLogin)

module.exports = router