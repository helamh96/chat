const mongoose = require("mongoose")
const {Schema} = mongoose

const MessageModel = new Schema({
    convID:{
        type:String,
        required:true
    },
    remittent:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required: true
    },
    date:{
        type:String
    },
    isImage:{
        type: Boolean,
        required: true
    }
})

const model = mongoose.model('MessageScheema', MessageModel)

module.exports = model