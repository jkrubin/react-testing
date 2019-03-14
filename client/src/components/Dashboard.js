import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import Profile from "./Profile"
import EventCard from "./EventCard"
import {Carousel} from 'react-bootstrap'

class Dashboard extends React.Component{
	constructor(props, context){
		super()
		this.state = {
			auth: context.auth,
			token: false,
			events: [],
			error: "",
			isLoading: false,
			cardFlip: false,
			activeCard: undefined

		}
		this.submitEvent = this.submitEvent.bind(this)
		this.newEventTemplate = this.newEventTemplate.bind(this)
		this.cancelNewEvent = this.cancelNewEvent.bind(this)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({auth: nextContext.auth})
	}
	componentDidMount(){
		this.setState({
			isLoading: true
		})
		let data = {
			userId: this.state.auth.user.id
		}
		fetch(api + '/getEventByUser', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			const events = data
			if(events.error){
				this.setState({
					error: events.error,
					isLoading: false
				})
			}else if(events){
				this.setState({
					events: events.tempEvent,
					isLoading: false
				})
			}
		})
		.catch(error => {
			this.setState({error: error, isLoading: false})
		})	
	}
	submitEvent(event){
		const {id, name, description, image, location, date, capacity} = event
		const data = {id, name, description, image, location, date, capacity}
		return fetch(api + '/updateEvent', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			const updatedEvent = data
			if(updatedEvent.error){
				console.log({updatedEvent})
				return ({error: updatedEvent.error})
			}else if(updatedEvent){
				this.setState((prevState) => {
					let eventState = prevState.events.map((event) => {
						if(updatedEvent.tempEvent.id === event.id){
							event = updatedEvent.tempEvent
						}
						return event
					})
					return {events: eventState}
				})
				return true
			}
		})
		.catch(error => console.log(error))	
	}
	newEventTemplate(){
		this.setState((prevState) => {
			prevState.events.push({
				id: 0,
				name: "",
				description: "",
				image: "",
				location: "",
				date: undefined,
				capacity: undefined
			})
			prevState.activeCard = prevState.events.length
			return prevState
		})
	}
	cancelNewEvent(){
		this.setState((prevState) => {
			prevState.events.pop()
			prevState.activeCard = 0

			return prevState
		})
	}
	render(){

		let eventGrid = this.state.events.map((event) => {
			return(
				<Carousel.Item>
					<EventCard 
					event={event} 
					submitEvent={this.submitEvent} 
					key={event.id} 
					cardFlip={(event.id > 0) ? false: true}
					newEventTemplate={this.newEventTemplate}
					cancelNewEvent ={this.cancelNewEvent} /> 
				</Carousel.Item>
			)
		})
		return(
			<div>
				<h1> Hello {this.state.auth.user.name} </h1>
				<div className="container">
					<div className="dash-area row">
						<div className="profile-area col-md-auto">
							<Profile user={this.state.auth.user} token={this.state.auth.token} />
						</div>
						<div className="events-area col-md-auto">
							<h2> My Events </h2>
							<Carousel interval= {null} activeIndex={this.state.activeCard} >
								{eventGrid}
							</Carousel>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.contextType = AuthContext
export default Dashboard