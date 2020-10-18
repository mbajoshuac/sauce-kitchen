const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel')
const { catchWrapper } = require('./../utils/helpers');
const response = require('./../utils/response')

exports.authUser = catchWrapper(async(req, res, next) => {
    if (!req.headers.authorization) return next(Error(`Oops! You are not authorized to use this route - 😝`))
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.KEY);
    const foundUser = await User.findById(decoded.id).select("+role");
    if (!foundUser) return next(Error('User with that token not found. please log in again - 👌'));
    req.user = foundUser;
    next();

})

exports.authorizeAdmin = catchWrapper(async(req, res, next) => {
    if (!req.user.role) return next(Error(`Naaaay! You seem to be a hacker...😮 `))
    if (req.user.role !== 'admin') {
        return next(Error(`Oops! Access denied - You can't come here - 😬`))
    }
    next();
})