const express = require("express")
const logger= require("./logger/logger")
const SingleConversation = require("./models/singleConversationModel")
const Message = require("./models/messageModel")
const GroupConversation = require("./models/groupConversationSchema")

const router = new express.Router()

router.post("/getChat", async(req, res) =>{
    const me = req.body.me
    const contact = req.body.contact
    try {
        const conv1 = await SingleConversation.findOne({remittent:me, destinatary:contact })
        const conv2 = await SingleConversation.findOne({remittent:contact, destinatary:me })
        if(conv1 === null && conv2 === null){
            const newConv = new SingleConversation({
                remittent:me,
                destinatary:contact
            })
            await newConv.save()
            return res.json({status:"new", msgID:newConv._id.toString()})
        }else{
            if(conv1 === null){
                return res.json({status:"opening", msgID:conv2._id.toString()})
            }else{
                return res.json({status:"opening", msgID:conv1._id.toString()})
            }
        }
    } catch (error) {
        logger.error(error)
    }
})

router.get("/getMsg", async(req, res) =>{
    const id = req.query.msgID
    try {
        const msg = await Message.find({convID:id})
        if(Object.keys(msg).length === 0){
            return res.status(200).json({msgs:null})
        }else{
            return res.status(200).json({msgs:true, msg:msg})            
        }
    } catch (error) {
        logger.error(error)
    }
})

router.post("/createGroupChat", async(req, res) => {
    const name = req.body.nameOfGroup
    const members = req.body.contactsOfGroup
    try {
        const group = new GroupConversation({
            name:name,
            participants:members
        })
        await group.save()
        return res.status(200).json({msg:"new Group created", date: Date.now(), GroupID:group._id.toString()})
    } catch (error) {
        logger.error(error)
        return res.status(503).json({msg: "the Group couldn't be created"})
    }
})

router.post("/sendMsg", async(req, res) => {
    try {
        const id = req.body.chatID
        const remittent = req.body.remittent
        const msg =  req.body.msg
        const isImage = req.body.isImage
        const newMessage = new Message({
            convID: id,
            remittent: remittent,
            msg: msg, 
            date: Date.now(),
            isImage: isImage 
        })
        await newMessage.save()
        res.status(201).json({ sent: true })
    } catch (error) {
        logger.error(error)
        return res.status(501).json({sent:false})
    }
    
})

module.exports = router