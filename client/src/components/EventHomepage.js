import React from "react"
import { api } from "../config/config"

class EventHomepage extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event,
			userId: props.userId,
			isLoading: false,
			error: false,
		}
		this.submitLike = this.submitLike.bind(this)
		this.deleteLike = this.deleteLike.bind(this)
	}
	submitLike(){
		this.setState({
			isLoading: true
		})
		let data = {
			userId: this.state.userId,
			EventId: this.state.id
		}
		fetch(api + '/createLike', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			const like = data
			console.log(like)
			if(like.error){
				this.setState({
					error: like.error,
					isLoading: false
				})
			}else if(like.like){
				this.setState((prevState) =>{
					prevState.likes.push(like.like)
					prevState.isLoading = false
					return prevState
				})
			}
		})
		.catch(error => {
			this.setState({error: error, isLoading: false})
		})	
	}
	deleteLike(){
		this.setState({
			isLoading: true
		})
		let data = {
			id: this.state.likes[0].id
		}
		fetch(api + '/deleteLike', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			const like = data
			console.log(like)
			if(like.error){
				this.setState({
					error: like.error,
					isLoading: false
				})
			}else if(like.message){
				this.setState((prevState) =>{
					prevState.likes.pop()
					prevState.isLoading = false
					return prevState
				})
			}
		})
		.catch(error => {
			this.setState({error: error, isLoading: false})
		})	
	}
	render(){
		return(
			<div>
				<div className="event-image-container">
					<img className="card-img-top" src={this.state.image} alt=""/>
				</div>
				<div className="card-body">
					<h5 className="card-title"> {this.state.name} </h5>
					<p className="card-text"> {this.state.description} </p>
					<ul className="list-group list-group-flush">
						<li className="list-group-item"> Location: {this.state.location} </li>
					</ul>
					<p className="card-text"> 
						{ (this.state.userId !== 0) && (
							this.state.likes.length === 0 ?
								(<button type="button" className="btn btn-primary" onClick={this.submitLike}> heart this event! </button>)
								:(<button type="button" className="btn btn-primary" onClick={this.deleteLike}> You like this Event </button>)
						)} 
					</p>
				</div>
				<div className="user-bio card-body">
					<h5 className="card-title"> Submitted by</h5>
					<div className="row bio-row">
						<div className="col-md-auto">
							<img src={`data:${this.state.users.mimeType};base64,${this.state.users.profilePicture}`} alt="" className="event-profile-pic"/>
						</div>
						<div className="event-user-area col">
							<h4 className="event-username"> {this.state.users.name} </h4>
							<p className="card-text event-bio"> {this.state.users.bio} </p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default EventHomepage