import React from "react"
import EventDisplay from "./EventDisplay"
import EventForm from "./EventForm"
import UserDisplay from "./UserDisplay"
class EventCard extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			event: props.event,
			cardFlip: props.cardFlip
		}

		if(!props.event.id){
			this.state.cardFlip = true
		}
		this.flipCard = this.flipCard.bind(this)
	}

	flipCard(){
		this.setState((prevState) => {
			return {cardFlip: !prevState.cardFlip}
		})
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({event: nextProps.event, cardFlip: false})
	}

	render(){
		let likeList = []
		let matchList = []
		if(this.state.event.likes && this.state.event.likes.length){
			let likes = this.state.event.likes
			for(let i = 0; i < likes.length; i++){
				if(likes[i].matched){
					matchList.push(<UserDisplay like={likes[i]} />)
				}else{
					likeList.push(<UserDisplay like={likes[i]} />)
				}
			}
			// likeList = this.state.event.likes.map((like) =>{
			// 	return(
			// 		<UserDisplay like={like} />
			// 	)
			// })	
		}
		return(
			<div className= "event-container">
				<div className="card event-card" >
					<div className="flip-container">
						<div className={this.state.cardFlip ? "flipper flipped" : "flipper"}>
							<div className="front">
								<div className="event-bar">
									<button onClick={this.flipCard}> Edit Event </button>
									<button onClick={this.props.newEventTemplate}> Create New Event </button>
									<button onClick={() => this.props.deleteEvent(this.state.event)}> Delete Event </button>
								</div>
								<EventDisplay event={this.state.event} />
							</div>
							<div className="back">
								<EventForm 
								event={this.state.event} 
								submitEvent={this.props.submitEvent} 
								flipCard={this.flipCard}
								cancelNewEvent={this.props.cancelNewEvent} />
							</div>
						</div>
					</div>
				</div>
				<div className="users-row" >
					<h3> People interested in your event!</h3>
					<div className="users-list-container">
						{likeList}
					</div>
				</div>
			</div>
		)
	}

}
export default EventCard