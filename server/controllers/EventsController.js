const {event} = require('../models')

module.exports = {
	async createEvent(req, res) {
		try{
			const newEvent = await event.create(req.body)
			res.send({event: newEvent})
		}catch(err){
			res.status(400).send({
				error: "Server error creating event"
			})
		}
	},
	async getEventById(req, res) {
		try{
			const{id} = req.body
			const tempEvent = await event.findOne({
				where: {id: id}
			})
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
			const tempEvent = await event.findOne({
				where: {userId: userId}
			})
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
			const {id, name, description, image, location} = req.body
			const tempEvent = await event.findOne({where:{id: id}})
			tempEvent.update({
			    name: name,
			    description: description,
			    image: image,
			    location: location
			}).then(function(){
				res.send({evnet})
			})
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
			const tempEvent = await event.findOne({
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
	}

}
