import React from "react"
import { api } from "../config/config"
import TestDisplay from "./TestDisplay"
import EventForm from "./EventForm"
import UserBall from "../reusables/UserBall"

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
		this.toggleInvite = this.toggleInvite.bind(this)
	}

	flipCard(){
		this.setState((prevState) => {
			return {cardFlip: !prevState.cardFlip}
		})
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({event: nextProps.event, cardFlip: false})
	}
	toggleInvite(data){
		return fetch(api + '/matchLike', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			if(data.error){
				console.log(data.error)
			}
			if(data.tempLike){
				console.log(data.tempLike)
				this.setState((prevState) => {
					let likesArr = prevState.event.likes.map((like) => {
						if(data.tempLike.id === like.id){
							like.matched = data.tempLike.matched
							return like
						}else{
							return like
						}
					})
					prevState.event.likes = likesArr
					return prevState
				})
			}
		})
		.catch(error => console.log(error))	
	}
	render(){
		let likeList = []
		let matchList = []
		if(this.state.event.likes && this.state.event.likes.length){
			let likes = this.state.event.likes
			for(let i = 0; i < likes.length; i++){
				if(likes[i].matched){
					matchList.push(<UserBall key={likes[i].id} like={likes[i]} toggleInvite={this.toggleInvite} invited={true} />)
				}else{
					likeList.push(<UserBall key={likes[i].id} like={likes[i]} toggleInvite={this.toggleInvite} invited={false} />)
				}
			}
		}

		return(
			<div className="event-dash-container">
				<div className= "event-container">
					<div className="card event-card" >
						<div className="flip-container">
							<div className={this.state.cardFlip ? "flipper flipped" : "flipper"}>
								<div className="front">
									<div className="event-bar">
										<button onClick={() => this.props.deleteEvent(this.state.event)} title="Delete Event"> <img alt="Delete Event" src={require('../assets/deleteIcon.png')} /> </button>
										<button onClick={this.props.newEventTemplate} title="Create Event"> <img alt="Create Event" src={require('../assets/createIcon.png')} /> </button>
										<button onClick={this.flipCard} title="Edit Event"> <img alt="Edit Event" src={require('../assets/editIcon.png')} /> </button>
									</div>
									<TestDisplay event={this.state.event} userId= {0} liked={likeList} matched={matchList} />
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
				</div>
			</div>
		)
	}

}
export default EventCard