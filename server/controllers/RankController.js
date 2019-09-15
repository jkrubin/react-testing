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
			for(let i = 0; i < ranks.length; i++){
				let ranking = JSON.parse(ranks[i].content)
				Object.keys(ranking).forEach((key) =>{
					let pts = (12 - key)
					if(avgRank[ranking[key]]){
						avgRank[ranking[key]] += pts
					}else{
						avgRank[ranking[key]] = pts
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
