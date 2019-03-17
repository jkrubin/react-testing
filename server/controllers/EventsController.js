const {Event} = require('../models')
const {users} = require('../models')
const {Like} = require('../models')

const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
	async createEvent(req, res) {
		try{
			const newEvent = await Event.create(req.body)
			res.send({event: newEvent})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating event"
			})
		}
	},
	async getEventById(req, res) {
		try{
			const{id} = req.body
			const tempEvent = await Event.findOne({
				where: {id: id},
				include: [{model: Like, as: 'likes'}]
			})
			if(!tempEvent){
				return res.status(400).send({error: "Event not found"})
			}
			res.send({tempEvent})
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve this Event"
			})
		}
	},
	async getEventByUser(req, res) {
		try{
			const{userId} = req.body
			const tempEvent = await Event.findAll({
				where: {userId: userId}
			})
			if(!tempEvent){
				return res.status(400).send([])
			}
			res.send({tempEvent})
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve Event for this user"
			})
		}
	},
	async updateEvent(req, res) {
		try{
			const {id, name, description, image, location, date, capacity} = req.body
			const tempEvent = await Event.findOne({where:{id: id}})
			if(!tempEvent){
				try{
					const newEvent = await Event.create(req.body)
					return res.send({newEvent})

				}catch(err){
					console.log("err")
					res.status(500).send({error: "could not create new event"})
				}
			}else{
				tempEvent.update({
				    name: name,
				    description: description,
				    image: image,
				    location: location,
				    date: date,
				    capacity: capacity
				}).then(function(){
					return res.send({tempEvent})
				})
			}
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to update Event"
			})
		}
	},
	async deleteEvent(req, res){
		try{
			const {id} = req.body
			const tempEvent = await Event.findOne({
				where:{
					id: id
				}
			})
			tempEvent.destroy()
				.then(function(){
					res.send({message: 'Event Deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete Event"
			})
		}
	},
	async getHomepageEvents(req, res){
		try{
			const {id} = req.body
			const eventArr = await Event.findAll({
				where: {
					userId: {[Op.ne]: id}
				},
				include: [{model: users, as: 'users'}]
			})
			if(!eventArr){
				return res.status(400).send({error: "No events found"})
			}
			res.send({eventArr})
		}catch(err){
			console.log(err)
			res.status(500).send({error: "Could not get Events"})
		}
	}

}
