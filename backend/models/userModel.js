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
}, {
    timestamps: true
} )


export const User = mongoose.model( 'User', userSchema )