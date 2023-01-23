const mongoose = require("mongoose")
const {Schema} = mongoose

const SingleConversationScheema = new Schema({
    remittent:{
        type:String,
        required:true
    },
    destinatary:{
        type:String,
        required:true
    }
})

const model = mongoose.model('SingleConversationScheema', SingleConversationScheema)

module.exports = model