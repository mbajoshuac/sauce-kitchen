const User = require('./../models/users')
const { asyncWrapper } = require('./../utils/helpers');

exports.addUser = asyncWrapper(async(req, res, next) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body
    let user = await User.findOne({ email })
    if (user) {
        return next(Error('This email is already registered'))
    }
    user = await User.create({ firstName, lastName, email, phone, password, confirmPassword })

    res.status(201).json({
        status: "Success",
        data: {
            user
        }
    })
})

exports.getAllUser = asyncWrapper(async(req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        status: `Success`,
        data: {
            users
        }
    })
})

exports.getAUser = asyncWrapper(async(req, res, next) => {
    const id = req.params.id
    let user = await User.findById(id)
    res.status(200).json({
        Status: 'Success',
        Data: {
            user
        }
    })
})

exports.deleteUser = asyncWrapper(async(req, res, next) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.status(204).json({
        status: "Success",
        data: null
    })
})

exports.updateUser = asyncWrapper(async(req, res, next) => {
    let id = req.params.id
    let user = await User.findById(id)
    console.log(user);
    if (!user) {
        return next(Error("The user with this email does not exist"))
    }

    const { firstName, lastName, email, phone, password, confirmPassword } = req.body
    user = await User.findByIdAndUpdate(user._id, { firstName, lastName, email, phone, password, confirmPassword })
    res.status(200).json({
        status: "Success",
        data: {
            user
        }
    })
})

exports.userLogin = asyncWrapper(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(Error('specify the email and password field'));

    let user = await User.findOne({ email }).select('+password');

    if (!user) return next(Error('email or password is wrong'));

    if (user && !await user.confirmPassword(password, user.password)) {
        return next(Error('email or password is wrong'));
    }

    res.status(200).json({
        status: 'success',
        message: 'user logged in successfully'
    });
})