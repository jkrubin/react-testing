const {users, rank} = require('../models')

module.exports = {
	async createRank(req, res) {
		try{
			const newrank = await rank.create(req.body)
			res.send({rank: newrank})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating rank"
			})
		}
	},
	async getRankByWeek(req, res) {
		try{
			const{week} = req.body
			const ranks = await rank.findAll({
				where: {week: week},
				include: [{ model: users, as: 'users'}]
			})
			let avgRank = {}
			for(let i = 0; i < ranks.length; ranks++){
				Object.keys(ranks[i]).forEach((key) =>{
					let pts = (12 - key)
					if(avgRank[ranks[i][key]]){
						avgRank[ranks[i][key]] += pts
					}else{
						avgRank[ranks[i][key]] = pts
					}
				})
			}
			res.send({avgRank})
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve ranks for this week"
			})
		}
	},
}

/*
ranking example:

{rank: {
	1: 3 (userId),
	2: 5 (userId), 
	... ect
}


}


*/