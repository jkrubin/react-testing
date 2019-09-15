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
	async getRankedUsers(req, res){
			const userArr = await users.findAll({
				where: {email: { like: '%fantasy.app%'}},
				attributes:['id','name', 'bio', 'mimeType']
			})	
			return res.send({userArr})	
	}
	async getRankByWeek(req, res) {
		try{
			const{week} = req.body
			const ranks = await rank.findAll({
				where: {week: week},
				include: [{ model: users, as: 'users', attributes:['id','name', 'bio', 'mimeType']}]
			})
			let avgRank = {}
			let rankRes = {"week": week, ranking: []}
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

			Object.keys(avgRank).forEach((key)=>{
				rankRes.ranking.push(
					users.findOne({
						where: {
							id: key
						},
						attributes:['id','name', 'bio', 'mimeType']
					}).then((user)=>{
						if(user){
							return {user: user.toJSON(), rank: avgRank[key]}
						}
					}).catch ((error) =>{
						console.log(error)
					})
				)
			})
			Promise.all(rankRes.ranking).then((resolved)=>{
				console.log({resolved})
				rankRes.ranking = resolved
				rankRes.ranking.sort((a,b) =>{return b.rank - a.rank})
				console.log(rankRes)
				return res.send({rankRes})
			})
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
