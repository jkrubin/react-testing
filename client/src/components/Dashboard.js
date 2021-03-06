import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import EventCard from "./EventCard"
import {Carousel} from 'react-bootstrap'

class Dashboard extends React.Component{
	constructor(props, context){
		super(props, context)
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
		const {id, name, description, eventImage, location, date, capacity} = event

		let data = new FormData()

		data.append('id', id)
		data.append('name', name)
		data.append('description', description)
		data.append('location', location)
		data.append('date', date)
		data.append('capacity', capacity)
		data.append('userId', this.state.auth.user.id)
		if(eventImage != null){
			data.append('file', eventImage, "profile.png")			
		}
		return fetch(api + '/updateEvent', {
			method: "POST",
			body: data
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
		let eventGrid = this.state.events.map((event) => {
			return(
				<Carousel.Item key={event.id}>
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
		return(
			<div>
				<div className="dash-page">
					<div className="dash-area row">
						<div className="events-area col-lg">
							<h2> My Events </h2>
							<p>Add and edit your events. See who showed interest in your event and invite
							them to join you!</p>
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