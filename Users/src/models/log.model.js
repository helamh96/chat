const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require("bcrypt")


const Log = new Schema(
	{
		email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        }
	},
	{ collection: 'UserLog-data' }
)

Log.pre("save", function(next){
    const document = this
    bcrypt.hash(document.password, 10, (err,hpw) =>{
        if(err){
            next(err)
        }else{
            document.password = hpw
            next()
        }
    })
})

const model = mongoose.model('UserLog', Log)

module.exports = model