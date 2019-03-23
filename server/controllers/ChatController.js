const {chat, message} = require('../models')

module.exports = {
	async createChat(req, res) {
		try{
			const newChat = await chat.create(req.body)
			res.send({chat: newChat})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating chat"
			})
		}
	},
	async createMessage(req, res, io) {
		try{
			const newMessage = await message.create(req.body)
			io.emit('message', newMessage.content)
			res.send({message: newMessage})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating message"
			})
		}
	},
	async deleteChat(req, res){
		try{
			const {id} = req.body
			const tempChat = await chat.findOne({
				where:{
					id: id
				}
			})
			tempChat.destroy()
				.then(function(){
					res.send({message: 'Chat Deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete chat"
			})
		}
	},
}
