import React from "react"
import UserBall from '../reusables/UserBall'
class ChatEvent extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event,
			isLoading: false,
			displayProf: false,
			displayEventDetails: false,
			currentDisplayedUser: null,
		}
		this.toggleEventDetails = this.toggleEventDetails.bind(this)
		this.displayUser = this.displayUser.bind(this)
	}
	toggleEventDetails(){
		this.setState((prevState) =>{
			return({displayEventDetails: !prevState.displayEventDetails})
		})
	}
	displayUser(userId){
		if(this.state.currentDisplayedUser === userId){
			this.setState({currentDisplayedUser: null})
		}else{
			this.setState({
				currentDisplayedUser: userId
			})
		}
	}
	render(){
		let displayDate = new Date(this.state.date).toLocaleString('en-US').substring(0,9)
		let eventChatUsers = []
		if(this.state.chat.length){
			eventChatUsers = this.state.chat[0].event.likes.map((like) => {
				let user = like.user
				return (
					<div className={"user-bubble-container " + (this.state.currentDisplayedUser === user.id ? "selected" : "")} >
						<UserBall 
						like={like} 
						key={user.id}
						/>
					</div>
				)
			})
		}
		return(
			<div>
				<div className="event-image-col">
					<div className={"event-image-container " + (this.state.displayEventDetails ? "" : "min-chat-event")}>
						<div className="event-image">
							<img 
								className="card-img-top" 
								src={this.state.image} 
								onClick={this.toggleEventDetails}
								alt="" 
							/>
						</div>
					</div>
					<div className="event-name-div">
						<h3 className="card-title"> {this.state.name} </h3>
					</div>
				</div>
				<div 
					className="event-content-container" 
					style={{
						backgroundImage: "url("+require('../assets/brushed-alum.png')+")",
						backgroundRepeat: "repeat"

					}}>
					<ul className="event-content-list">
						<li className="event-user">
							<div className={"user-bubble-container " + (this.state.currentDisplayedUser === this.state.users.id ? "selected" : "")} >
								<UserBall 
								user={this.state.users} 
								key={this.state.users.id}
								/>
							</div>
							{eventChatUsers}
						</li>
					</ul>
				</div>
				<ul className="event-content-list">
					<div className="event-details-container">
						{this.state.displayEventDetails &&
							<div>
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
						}
					</div>
				</ul>
			</div>
		)
	}
}

export default ChatEvent