const {Event} = require('../models')

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
				where: {id: id}
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
			const {id, name, description, image, location, data, capacity} = req.body
			const tempEvent = await Event.findOne({where:{id: id}})
			if(!tempEvent){
				try{
					const newEvent = await Event.create(req.body)
					res.send(tempEvent: newEvent)

				}catch(err){
					console.log("err")
					res.status(500).send({error: "could not create new event"})
				}
			}
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
	}

}
