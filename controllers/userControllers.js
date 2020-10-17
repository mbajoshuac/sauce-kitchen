const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel')
const { catchWrapper } = require('./../utils/helpers');
const response = require('./../utils/response')


exports.addUser = catchWrapper(async(req, res, next) => {
    const { firstName, lastName, sex, email, phone, password, confirmPassword } = req.body
    let user = await User.findOne({ email })
    if (user) {
        return next(Error('This email is already registered'))
    }
    user = await User.create({ firstName, sex, lastName, email, phone, password, confirmPassword })
    res.status(201).json(response(true, "Your account was successfully created", user))
})

exports.getAllUser = catchWrapper(async(req, res, next) => {
    const users = await User.find().select('-__v -password')
    res.status(200).json(response(true, "Users Data retrieved successfully", users))
})

exports.getAUser = catchWrapper(async(req, res, next) => {
    const id = req.params.id
    let user = await User.findById(id).select('-__v -password')
    res.status(200).json(response(true, "User data retrieved successfully", user))
})

exports.deleteUser = catchWrapper(async(req, res, next) => {
    const id = req.params.id
    if (!id) return next(Error(`Please insert an a correct User Id you want to delete`))
    const user = await User.findByIdAndDelete({ _id: id })
    if (!user) return next(Error(`The user with this email: ${id} does not exist`))
    res.status(204).json(response(true, "User account deleted successfully", null))
})

exports.updateUser = catchWrapper(async(req, res, next) => {
    let id = req.params.id
    if (!id) return next(Error(`Please insert an a correct User Id you want to update`))
    let user = await User.findById(id)
    if (!user) return next(Error(`The user with this id ${id} does not exist`))

    const { firstName, lastName, email, phone } = req.body
    user = await User.findByIdAndUpdate({ _id: id }, { firstName, lastName, email, phone }, {
        new: true,
        runValidation: true
    })
    res.status(200).json(response(true, "User account successfully Updated", user))
})


exports.userLogin = catchWrapper(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(Error('specify the email and password field'));

    let user = await User.findOne({ email }).select('+password');

    if (!user) return next(Error('email or password is wrong'));

    if (user && !await user.validatePassword(password, user.password)) {
        return next(Error('email or password is wrong'));
    }

    //sign user afterverified with token
    const token = user.generateToken();
    res.header('authorization', token);
    res.cookie('jwt', token);
    res.status(200).json(response(true, "User logged in successfully", { token }));
})