const {users, comment} = require('../models')

module.exports = {
	async createComment(req, res) {
		try{
			const newComment = await comment.create(req.body)
			res.send({comment: newComment})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating comment"
			})
		}
	},
	async getCommentByWeek(req, res) {
		try{
			const{week} = req.body
			const comments = await comment.findAll({
				where: {week: week},
				include: [{ model: users, as: 'users'}]
			})
			res.send({comments})
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve comments for this week"
			})
		}
	},
}
