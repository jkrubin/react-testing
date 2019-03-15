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
			activeCard: undefined,
			direction: null

		}
		this.submitEvent = this.submitEvent.bind(this)
		this.newEventTemplate = this.newEventTemplate.bind(this)
		this.cancelNewEvent = this.cancelNewEvent.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.deleteEvent = this.deleteEvent.bind(this)
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
		const data = {id, name, description, image, location, date, capacity, 
			userId: this.state.auth.user.id}
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
			}else if(updatedEvent.tempEvent){
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
			}else if(updatedEvent.newEvent){
				this.setState((prevState) =>{
					let eventState = prevState.events.map((event) => {
						if(event.id === 0){
							event = updatedEvent.newEvent
						}
						return event
					})
					console.log("new event added")
					return {events: eventState}			
				})
			}
		})
		.catch(error => console.log(error))	
	}
	deleteEvent(event){
		const{id} = event
		const data = {id: id}
		return fetch(api + '/deleteEvent', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => {
			console.log(res.status)
			if(res.status === 200){
				this.setState((prevState) => {
					let eventsArr = prevState.events.filter((event) => id !== event.id)
					return {events: eventsArr, activeCard: 0}
				})
			}
			else{
				console.log("error deleing")
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
			prevState.activeCard = prevState.events.length - 1
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

	handleSelect(selectedIndex, e) {
		this.setState((prevState) =>{
			if(prevState.events[prevState.activeCard].id === 0){
				prevState.events.pop()
			}
			return {
				activeCard: selectedIndex,
				direction: e.direction,
			}
		});
	}

	render(){
		if(this.state.events.length === 0){
			this.newEventTemplate()
		}
		console.log(this.state.events)
		let eventGrid = this.state.events.map((event) => {
			console.log(event)
			return(
				<Carousel.Item>
					<EventCard 
					event={event} 
					submitEvent={this.submitEvent} 
					key={event.id} 
					cardFlip={(event.id > 0) ? false: true}
					newEventTemplate={this.newEventTemplate}
					cancelNewEvent ={this.cancelNewEvent}
					deleteEvent={this.deleteEvent} /> 
				</Carousel.Item>
			)
		})
		console.log(eventGrid)
		return(
			<div>
				<h1> Hello {this.state.auth.user.name} </h1>
				<div className="container">
					<div className="dash-area row">
						<div className="profile-area col-lg">
							<Profile user={this.state.auth.user} token={this.state.auth.token} />
						</div>
						<div className="events-area col-lg">
							<h2> My Events </h2>
							<Carousel 
								interval={null} 
								activeIndex={this.state.activeCard}
								direction={this.state.direction}
								onSelect={this.handleSelect} >
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