const {Like} = require('../models')

module.exports = {
	async createLike(req, res) {
		try{
			const newLike = await Like.create(req.body)
			res.send({like: newLike})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating Like"
			})
		}
	},
	async deleteLike(req, res){
		try{
			const {id} = req.body
			const tempLike = await Like.findOne({
				where:{
					id: id
				}
			})
			tempLike.destroy()
				.then(function(){
					res.send({message: 'Like Deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete Like"
			})
		}
	}

}
