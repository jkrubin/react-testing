import React from "react"
import EventDisplay from "./EventDisplay"
import EventForm from "./EventForm"
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
		return(
			<div className="card event-card" >
				<div className="flip-container">
					<div className={this.state.cardFlip ? "flipper flipped" : "flipper"}>
						<div className="front">
							<div className="event-bar">
								<button onClick={this.flipCard}> Edit Event </button>
								<button onClick={this.props.newEventTemplate}> Create New Event </button>
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
		)
	}

}
export default EventCard