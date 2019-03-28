import React from "react"
import { api } from "../config/config"
import EventDisplay from "./EventDisplay"
import EventForm from "./EventForm"
import UserDisplay from "./UserDisplay"
import BlankUser from "../reusables/BlankUser"
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
					matchList.push(<UserDisplay like={likes[i]} toggleInvite={this.toggleInvite} invited={true} />)
				}else{
					likeList.push(<UserDisplay like={likes[i]} toggleInvite={this.toggleInvite} invited={false} />)
				}
			}
		}
		if(likeList.length === 0){				
			likeList.push( <BlankUser image={require('../assets/plus.png')} message="Wait for someone to show interest in your event" />)
		}
		if(matchList.length === 0){
			matchList.push( <BlankUser image={require('../assets/plus.png')} message="To invite someone, tap their profile picture and then invite" /> )
		}
		return(
			<div className="event-dash-container">
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
				</div>
				<div className="users-row" >
					<h4> People Included in your event </h4>
					<div className="users-included-container">
						<div className="match-list"> {matchList} </div>
					</div>
					<h4> People interested in your event!</h4>
					<div className="users-list-container">
						<div className="like-list" > {likeList} </div>
					</div>
				</div>
			</div>
		)
	}

}
export default EventCard