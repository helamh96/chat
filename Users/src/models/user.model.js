const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require("bcrypt")


const User = new Schema(
	{
		name:{
            type: String,
            required: true
        },
		email:{
            type: String,
            required: true,
            unique: true
        },
        lang: {
            type: String,
            required:true
        },
        contacts:{
            type: Array,
            required: false,
            default: []
        },
        conversations:{
            type: Array,
            default: []
        },
        avatar:{
            type: String,
            required: false,
            default:"none"
        }
	},
	{ collection: 'User-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model