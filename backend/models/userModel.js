import mongoose from 'mongoose'



// define structure of table / collection


const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter the password']
    },
    number: {
        type: String,
        required: [true, 'Please enter the number'],
        unique: true
    },
    otp: {
        type: Number,
        default: null,
        required: false
    },
    emailVerfied: {
        type: Boolean,
        default: false,
        required: false
    },
    theme: {
        type: String,
        default: '#00C950',
        required: false
    },
    image: {
        type: String,
        default: 'https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png',
        required: false
    }
}, {
    timestamps: true
} )


export const User = mongoose.model( 'User', userSchema )