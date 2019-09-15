const {users, rank} = require('../models')


module.exports = {
	async createRank(req, res) {
		try{
			const {week, userId} = req.body
			const ballot = await rank.findOne({
				where: {week: week, userId: userId}
			})
			if(ballot){
				return res.status(500).send({error: "you already voted"})
			}
			const newrank = await rank.create(req.body)
			res.send({rank: newrank})
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error creating rank"
			})
		}
	},
	async haveIVoted(req, res){
		try{
			const {week, userId} = req.body
			const ballot = await rank.findOne({
				where: {week: week, userId: userId}
			})
			if(ballot){
				let rankRes = []
				let ranking = JSON.parse(ballot.content)
				Object.keys(ranking).forEach((key)=>{
					rankRes.push(
						users.findOne({
							where: {
								id: ranking[key]
							},
							attributes:['id','name', 'bio', 'mimeType']
						}).then((user)=>{
							if(user){
								return {user: user.toJSON(), rank: key}
							}
						}).catch ((error) =>{
							console.log(error)
						})
					)
				})
				Promise.all(rankRes).then((resolved)=>{
					rankRes = resolved
					rankRes.sort((a,b) =>{return a.rank - b.rank})
					return res.send({ballot:true, rankRes})
				})
			}else{
				const userArr = await users.findAll({
				where: {email: { like: '%fantasy.app%'}},
				attributes:['id','name', 'bio', 'mimeType']
			})	
			return res.send({ballot:false, userArr})	
			}
		}catch(err){
			console.log(err)
			res.status(400).send({
				error: "Server error finding ballot rank"
			})
		}
	},
	async getRankedUsers(req, res){
			const userArr = await users.findAll({
				where: {email: { like: '%fantasy.app%'}},
				attributes:['id','name', 'bio', 'mimeType']
			})	
			return res.send({userArr})	
	},
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
				rankRes.ranking = resolved
				rankRes.ranking.sort((a,b) =>{return b.rank - a.rank})
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
