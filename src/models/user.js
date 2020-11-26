const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avater: {
        type: Buffer
    }
}, {
    timestamps: true
})


// Crate relationship with Task model
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



// middleware
// this method applyed for all request
// here we won't send password and tokens
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avater

    return userObject
}


// this method for generate token
userSchema.methods.generateAuthToken = async function () {

    try {
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    
        user.tokens = user.tokens.concat({ token })
        await user.save()
    
        return token
    } catch (e) {
        console.log(e)
    }
}


userSchema.statics.findByCredentials = async (email, password) => {

    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('Unable to login')
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) {
            throw new Error('Unable to login')
        }
    
        return user
    } catch (e) {
        console.log(e)
    }
}

// save middleware
// we use normal function because arrow function can not bind 'this' proparty
userSchema.pre('save', async function (next) {
    const user = this

    try {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
        }
    
        next()
    } catch (e) {
        console.log(e)
    }
})


// remove middleware
// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})


// User Model
const User = mongoose.model('User', userSchema)

module.exports = User

