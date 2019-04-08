import React from "react"
import { api } from "../config/config"
import UserBubble from '../reusables/UserBubble'
class TestDisplay extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event,
			authenticatedUser: props.userId,
			isLoading: false,
			error: false,
			displayProf: false,
			submitLike: false,
			likeMessage: "",
			imgHeight: null,
			eventWidth: null,
		}
		this.submitLike = this.submitLike.bind(this)
		this.deleteLike = this.deleteLike.bind(this)
		this.toggleProfile = this.toggleProfile.bind(this)
		this.toggleLike = this.toggleLike.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	toggleProfile(){
		this.setState((prevState) =>{
			return {displayProf: !prevState.displayProf}
		})
	}
	toggleLike(){
		this.setState((prevState) =>{
			return {submitLike: !prevState.submitLike}
		})
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}
	submitLike(){
		this.setState({
			isLoading: true
		})
		let data = {
			userId: this.state.authenticatedUser,
			EventId: this.state.id,
			message: this.state.likeMessage
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
					isLoading: false,
					submitLike: false
				})
			}else if(like.like){
				this.setState((prevState) =>{
					prevState.likes.push(like.like)
					prevState.isLoading = false
					prevState.submitLike = false
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
	componentDidMount(){
		let imgHeight = document.getElementById('event-img').clientHeight
		let eventWidth = document.getElementsByClassName('event-row')[0].width
		console.log(eventWidth)
		this.setState({imgHeight, eventWidth})
	}
	render(){
		let displayDate = new Date(this.state.date).toLocaleString('en-US').substring(0,9)
		let likeDisplay
		if(this.state.authenticatedUser !== 0 && this.state.likes && this.state.authenticatedUser !== this.state.userId){
			if(this.state.likes.length === 0){
				likeDisplay = <button type="button" className="btn btn-primary" onClick={this.toggleLike}> heart this event! </button>
			}else{
				likeDisplay = <button type="button" className="btn btn-primary" onClick={this.deleteLike}> You like this Event </button>
			}
		}
		return(
			<div className="event-display">
				<div className="card-body">
					<div className="row event-row" >
						<div className="event-image-container" id="event-img">
							<div className="event-image"
								style={{
								backgroundImage: "url("+this.state.image+")",
							}}>
							</div>
						</div>
						<div className="event-content-container">
							<ul className="event-content-list">
								<li className="event-name">
									<div className="event-name-div">
										<h3 className="card-title"> {this.state.name} </h3>
									</div>
								</li>
								{this.state.users && 
									<div>
									<li className="event-user ">
										<div className="list-icon-container list-flush ">
											<div className="list-profile">
												<img src={`data:${this.state.users.mimeType};base64,${this.state.users.profilePicture}`} 
													alt="" 
													className="event-profile-pic" />
											</div>
											<div className="border-container"> </div>
										</div>
										<div className="event-desc-div list-content">
											<h6 className="card-text">Submitted By: </h6>
											<p className="card-text "> {this.state.users.name} </p>
											<h6 className="card-text">Bio: </h6>
											<p className="card-text "> {this.state.users.bio} </p>
										</div>
									</li>
									</div>
								}
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
										<p className="card-text "> {this.state.description} </p>
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
										<p className="card-text "> 
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
										<p className="card-text ">
											{displayDate}
										</p>
									</div>
								</li>
								<li className="event-matched ">
									<div className="list-icon-container list-flush">
										<img
											src={require('../assets/dateIcon.png')}
											height='15'
											width='15'
											alt=""
										/>
										<div className="border-container matched"> </div>
									</div>
									<div className="event-date-div list-content">
										<h6 className="card-text">Matched with Event: </h6>
										<div className="matched-container">
											{this.props.matched}
										</div>
									</div>
								</li>
								<li className="event-liked ">
									<div className="list-icon-container list-flush">
										<img
											src={require('../assets/dateIcon.png')}
											height='15'
											width='15'
											alt=""
										/>
										<div className="border-container liked"> </div>
									</div>
									<div className="event-date-div list-content">
										<h6 className="card-text">Interested in Event: </h6>
										<div className="liked-container">
											{this.props.liked}
										</div>
									</div>
								</li>
							</ul>
							<div className="like-container">
								{likeDisplay}
							</div>
							{this.state.submitLike &&
								<div className="like-submit-container">
									<div className="like-form-container">
										<input name="likeMessage" 
										type="text"
										value={this.state.likeMessage}
										onChange={this.handleChange}
										/>
										<button onClick={this.submitLike}> Send Like </button>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TestDisplay