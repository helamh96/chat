const User = require('./models/user.model')
const UserLog = require("./models/log.model")
const jwt = require('jsonwebtoken')
const passport = require("passport")
const express = require('express')
const logger = require('./logger/logger')
require("./passportConfig")
require("dotenv").config()
const secret = process.env.SECRET

const router = new express.Router()

router.post('/register', async (req, res) => {
	try {
		if(req.body.password == req.body.passwordConf){
			const exists = await User.find({email:req.body.email})
			if(exists.length > 0){
				return res.json({ status:'Duplicate email' })
			}else{
				if(req.body.lang.length == 0){
					req.body.lang = "en-US"
				}
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					lang: req.body.lang
				})
				const newUserLog = new UserLog({
					email: req.body.email,
					password: req.body.password
				})
				await newUserLog.save()
				await newUser.save()
				logger.info("new User Created")
				return res.status(201).json({ status: 'ok' })
			}
		}
		else{
			return res.json({status: "pasword doesn't match"})
		}
	} catch (err) {
		logger.info(err)
		return res.json({ status:'Duplicate email' })
	}
})

router.post("/login", async (req, res) =>{
	try {
		passport.authenticate("login", async(err, user, info)  => {
			if(!user){
				logger.error(err)
				return res.status(401).json({error:"incorrect credentials"})
			}else{
				req.login(user, {session:false}, async(err)=>{
					if(err) {return res.status(401).json({error:"incorrect credentials"})}
					else{
						let userLogged = await User.findOne({email: user.email})
						const token = jwt.sign(userLogged.toJSON(), secret)
						return res.status(200).json({status: 'ok', user: token})                    
					}
				})
			}
		})(req, res)
	} catch (error) {
		logger.error(error)
	}
})

router.get('/dashboard', async (req, res) => {
	const token = req.headers['x-access-token']
	const tok = req.body.jwt
	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const user = await User.findOne({ email: email })
		return res.status(200).json({ user: user })
	} catch (error) {
		res.status(401).json({ msg: 'invalid token' })
	}
})

router.post("/addContact", async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, secret)
		const email = decoded.email
		const me = await User.findOne({email: email})
		const contactToAdd = req.body.contactToAdd
		if(contactToAdd === email){
			return res.json({response:false})
		}
		const alreadyAdded = me.contacts.filter((u) => u.email == contactToAdd)
		if(alreadyAdded.length > 0){
			return res.json({response: false})
		}
		const userToAdd = await User.findOne({email: contactToAdd})
		if(!userToAdd){
			return res.json({response:false})
		}
		const addRequest = {
			name: decoded.name,
			email: email,
			status: "request"
		}
		userToAdd.contacts.push(addRequest)
		me.contacts.push({name: userToAdd.name, email: userToAdd.email, status:"pending"})
		await me.save()
		await userToAdd.save()
		return res.json({response: true})
	} catch (error) {
		console.error(error);
	    res.send(error.toString());
	}
})

router.patch("/ConfirmContact", async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, secret)
		if(!decoded){
			res.redirect("/login")
			throw new Error("You aren't sign up")
		}
		const email = decoded.email
		const me = await User.findOne({email: email})
		const contactToAccept = req.body.contactToAccept
		const userToAdd = await User.findOne({email: contactToAccept})
		const indexToAccept =  userToAdd.contacts.findIndex((e) => e.email === me.email)
		userToAdd.contacts[indexToAccept].status = "accepted"
		const indexToUpdate = me.contacts.findIndex((e) => e.email === userToAdd.email)
		if(me.contacts[indexToUpdate].status === "pending"){
			return(res.json({response:false}))
		}
		me.contacts[indexToUpdate].status = "accepted"
		await User.updateOne({email:contactToAccept},{$set:{contacts:userToAdd.contacts}})
		await User.updateOne({email:me.email},{$set:{contacts:me.contacts}})
		res.json({response:true})
	} catch (error) {
		console.error(error.toString());
	    res.send(error.toString());
	}
})

router.post("/verify", async (req, res) => {
	const users = req.body.contacts
	const currentUsers = []
	const prom = []
	try {
		if(users.length !== 0){
			users.forEach((e) => {
				const isUser = User.findOne({email:e})
				prom.push(isUser)
			});	
			await Promise.all(prom).then((value) => {
				value.forEach((e) => {
					if(e !== null){
						currentUsers.push(e.email)
					}
				})
			})
		}
		return res.status(200).json({user:currentUsers})
	} catch (error) {
		logger.error(error)
	}
})

router.patch("/AddRooms", async(req, res) => {
	try {
		const usersToPatch = req.body.contacts
		const convID = req.body.convID
		const name = req.body.nameOfGroup
		usersToPatch.forEach(async (e) => {
			const user = await User.findOne({email:e})
			let conv = user.conversations
			const result = conv.filter( e => e.convID == convID)
			if(result.length == 0){
				user.conversations.push({name:name, convID: convID})
			await User.updateOne({email:e},{$set:{conversations:user.conversations}})
			}
		})
		return res.status(200).json({msg:"The group has been created"})
	} catch (error) {
		logger.error(error)	
		return res.status(503)
	}
})

module.exports = router