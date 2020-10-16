const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
var bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, " Firstname is Required"],
        minlength: [3, "Please firstname must be more than 3 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Lastname is Required"],
        minlength: [3, "Please lastname must be more than 3 characters"]

    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "your email is required"],
        validate: [validator.isEmail, "Your email must be in this format: yourname@domain.com"]
    },

    phone: {
        type: String,
        required: [true, "Your Phone Number is required"]
    },

    password: {
        type: String,
        minlength: [8, "Your Password must be more than 8 Characters"],
    },

    confirmPassword: {
        type: String,
        validate: {
            validator: function(value) {
                return this.password === value
            },
            message: "Your confirm password must match"
        }
    },
    sex: {
        type: String,
        enum: ["male", "female"],
        required: true,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user',
        select: false,
        enum: ['admin', 'user']
    },
    photo: String

}, { timestamps: true })



// UserSchema Query MiddleWare
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.isNew) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

// hide the _v mongooose props
userSchema.pre(/^find/, function(next) {
    this.select('-__v');
    next();
});

userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, role: this.role }, privateKey__goat, { expiresIn: '90d' })

}

// Instance method
userSchema.methods.validatePassword = async(userPassword, dbPassword) => {
    return await bcrypt.compare(userPassword, dbPassword);
}


module.exports = model('User', userSchema)