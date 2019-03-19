const {users} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')
const fs = require('fs')
const sharp = require('sharp')

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	const userData = {
		id: user.id,
		name: user.name,
		email: user.email,
		admin: user.admin
	}
	return jwt.sign(userData, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}
module.exports = {
	async register(req, res) {
		try{
			let image = false
			try{
				if(req.files.file){
					image = req.files.file
					if(image.size > 50000){
						res.status(500).send({error: "This image is too large. Please crop or select a smaller image"})
					}
				}
			}catch(err){
				console.log(err)
			}
			const user = await users.create(req.body)
			let userJson = user.toJSON()

			if(image){
				let encoded = image.data.toString('base64')
				user.update({
					profilePicture: encoded,
					mimeType: image.mimetype
				})
				.then(() => {
					userJson = user.toJSON()
					return res.send({
						user: userJson,
						token: jwtSignUser(userJson)
					})
				})
			}
			else{
				return res.send({
					user: userJson,
					token: jwtSignUser(userJson)
				})
			}
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "This Email is already in use"
			})
		}
	},
	async login(req, res) {
		try{
			const {email, password} = req.body
			const user = await users.findOne({
				where: {
					email: email
				}
			})
			if(!user) {
				return res.status(403).send({
					error: 'Could not find this account'
				})
			}
			const isPasswordValid = await user.comparePassword(password)
			if (!isPasswordValid){
				return res.status(403).send({
					error: 'Incorrect password'
				})
			}
			const userJson = user.toJSON()
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			})
		}catch(err){
			res.status(500).send({
				error: "Login error"
			})
		}
	},
	async me (req, res) {
		res.status(200).send({message: 'admin function reached'})
	},
	async isAdmin (req, res, next) {
		const token = req.headers['x-access-token']
		if (!token) {
			res.status(401).send({ auth: false, message: 'You are not logged in'})
		}
		jwt.verify(token, config.authentication.jwtSecret, async function(err, token){
			if(err){
				return res.status(500).send({message: 'Invalid Account'})
			}else{
				const user = await users.findById(token.id)
				if(user.admin != 1){
					return res.status(403).send({message: 'Unauthorized to perform this action'})
				}
				next()
			}
		})
	},
	async getAllUsers(req, res) {
		try{
			const userArr = await users.findAll({
				attributes: ['id','name', 'email']
			})
			const parsedUsers = JSON.parse(JSON.stringify(userArr))
			res.send(parsedUsers)
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve Users"
			})
		}
	},
	async updateUser(req, res) {
		try{
			let image = false
			try{
				if(req.files.file){
					image = req.files.file
					if(image.size > 50000){
						return res.status(500).send({error: "Image is too large, please crop it or pick a smaller image"})
					}
				}
			}catch(err){
				console.log(err)
			}

			const {id} = req.body
			const user = await users.findOne({where:{id: id}})
			const {name, email, bio} = req.body

			if(image){
				let encoded = image.data.toString('base64')
				user.update({
					profilePicture: encoded,
					mimeType: image.mimetype,
					name: name,
					email: email,
					bio: bio
				})
				.then(() => {
					return res.send({user: user.toJSON()})
				})
			}else{
				user.update({
				    name: name,
				    email: email,
				    bio: bio
				}).then(function(){
					res.send({user: user.toJSON()})
				})
			}
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to update User"
			})
		}
	},
	async deleteUser(req, res){
		try{
			const {id} = req.body
			const user = await users.findOne({
				where:{
					id: id
				}
			})
			user.destroy()
				.then(function(){
					res.send({message: 'User deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete user"
			})
		}
	},
	async matchUserToken(req, res, next) {
		const {id} = req.body
		const token = req.headers['x-access-token']
		if (!token) {
			res.status(401).send({ auth: false, message: 'You are not logged in'})
		}
		jwt.verify(token, config.authentication.jwtSecret, async function(err, token){
			if(err){
				console.log(err)
				return res.status(500).send({message: 'Invalid Account'})
			}else{
				const tmpuser = await users.findById(token.id)
				if(tmpuser.id != id){
					return res.status(403).send({message: 'Unauthorized to perform this action'})
				}
				next()
			}
		})
	}

}
