const { Schema, model } = require('mongoose')
const validator = require('validator')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, " Firstname is Required"],
        minlength: [3, "Please firstname must be more than 3 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Lastname is Required"],
        minlength: [3, "Please lastname must be more than 3 characters"]

    },

    email: {
        type: String,
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
    role: {
        type: String,
        default: 'customer',
        select: false,
        enum: ['admin', 'super-admin', 'customer']
    }

})


module.exports = model('User', userSchema)

// Document Query
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.isNew) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    this.role = 'customer';
    next();
});

// query middleware
userSchema.pre(/^find/, function(next) {
    this.select('-__v');
    next();
});


// Instance method
// userSchema.methods.confirmPassword = async(userPassword, dbPassword) => {
//     return await bcrypt.compare(userPassword, dbPassword);
// }

// userSchema.static('findByEmail', function(email) {
//     return this.findOne({ email });
// })

// userSchema.statics.findByEmail = function(email) {
//     return this.findOne({ email });
// }