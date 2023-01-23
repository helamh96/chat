const mongoose = require("mongoose")
const {Schema} = mongoose

const GroupConversationScheema = new Schema({
    name:{
        type:String
    },
    participants:{
        type:Array,
        required:true
    }
})

const model = mongoose.model('GroupConversationScheema', GroupConversationScheema)

module.exports = model