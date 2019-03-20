import React from "react"
import { api } from "../config/config"

class TestDisplay extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event,
			userId: props.userId,
			isLoading: false,
			error: false,
			displayProf: false
		}
		this.submitLike = this.submitLike.bind(this)
		this.deleteLike = this.deleteLike.bind(this)
		this.toggleProfile = this.toggleProfile.bind(this)
	}
	toggleProfile(){
		this.setState((prevState) =>{
			return {displayProf: !prevState.displayProf}
		})
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
		let displayDate = new Date(this.state.date).toLocaleString('en-US').substring(0,9)
		return(
			<div>
				<div className="card-body">
					<div className="row event-row" >
						<div className="event-image-container">
							<div className="event-image">
									<img className="card-img-top" src={this.state.image} alt="" />
							</div>
						</div>
						<div className="event-content-container">
							<ul className="event-content-list">
								<li className="event-name">
									<div className="event-name-div">
										<h5 className="card-title"> {this.state.name} </h5>
									</div>
								</li>
								<li className="event-user">
									<div className={"list-profile-container " + (this.state.displayProf ? "show-profile" : "")}>
										<div className="list-profile">
											<img src={`data:${this.state.users.mimeType};base64,${this.state.users.profilePicture}`} 
												alt="" 
												className="event-profile-pic"
												onClick={this.toggleProfile}/>
										</div>
										<div className="event-user-container ">
											<div className="event-user">
												<h4 className="event-username"> {this.state.users.name} </h4>
												<div className={this.state.displayProf ? "expand-prof" : "min-prof"}>
													<p className="card-text event-bio"> {this.state.users.bio} </p>
												</div>
											</div>
										</div>
									</div>
								</li>
								<div className={(this.state.displayProf ? "" : "")}>
									<li className="event-desc ">
										<div className="list-icon-container list-flush ">
											<img
												src={require('../assets/infoIcon.png')}
												height='15'
												width='15'
												alt=""
											/>
											<div className="border-container"> </div>
										</div>
										<div className="event-desc-div list-content">
											<h6 className="card-text">Description: </h6>
											<p className={"card-text " + (this.state.displayProf ? "hide-event-info" : "")}> {this.state.description} </p>
										</div>
									</li>
									<li className="event-loc ">
										<div className="list-icon-container list-flush">
											<img
												src={require('../assets/locationIcon.png')}
												height='15'
												width='15'
												alt=""
											/>
											<div className="border-container"> </div>
										</div>
										<div className="event-location-div list-content">
											<h6 className="card-text">Location: </h6>
											<p className={"card-text " + (this.state.displayProf ? "hide-event-info" : "")}> 
												At {this.state.location}
											</p>
										</div>
									</li>
									<li className="event-datetime ">
										<div className="list-icon-container list-flush">
											<img
												src={require('../assets/dateIcon.png')}
												height='15'
												width='15'
												alt=""
											/>
											<div className="border-container"> </div>
										</div>
										<div className="event-date-div list-content">
											<h6 className="card-text">Date: </h6>
											<p className={"card-text " + (this.state.displayProf ? "hide-event-info" : "")}>
												{displayDate}
											</p>
										</div>
									</li>
								</div>
							</ul>
						</div>
					</div>
					<p className="card-text"> 
						{ (this.state.userId !== 0) && (
							this.state.likes.length === 0 ?
								(<button type="button" className="btn btn-primary" onClick={this.submitLike}> heart this event! </button>)
								:(<button type="button" className="btn btn-primary" onClick={this.deleteLike}> You like this Event </button>)
						)} 
					</p>
				</div>
			</div>
		)
	}
}

export default TestDisplay