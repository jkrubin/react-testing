import React from "react"
class ChatEvent extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event,
			isLoading: false,
			displayProf: false,
			displayEventDetails: false,
		}
		this.toggleEventDetails = this.toggleEventDetails.bind(this)
	}
	toggleEventDetails(){
		this.setState((prevState) =>{
			return({displayEventDetails: !prevState.displayEventDetails})
		})
	}
	render(){
		let displayDate = new Date(this.state.date).toLocaleString('en-US').substring(0,9)

		return(
			<div className="event-chat-row">
				<div className="chat-event-display">
					<div className="event-image-container ">
						<div className="event-image">
							<img 
								className="card-img-top" 
								src={this.state.image} 
								onClick={this.toggleEventDetails}
								alt="" 
							/>
						</div>
					</div>
					<div className="chat-event-right" onClick={()=> {this.props.toggleActiveChat(this.state.id)}}>
						<div className="event-chat-info">
							<div className="event-name-div">
								<h5 className="card-title"> {this.state.name} </h5>
							</div>
						</div>
					</div>
				</div>
				<ul className="event-content-list">
					<div className="event-details-container event-chat-details"
						 style={{maxHeight:this.state.displayEventDetails? "1000px": "0"}}>
						{//this.state.displayEventDetails &&
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