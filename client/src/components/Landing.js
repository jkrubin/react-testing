import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import TestDisplay from "./TestDisplay"
import Carousel from './Carousel'

class Landing extends React.Component{
	constructor(props, context){
		super(props, context)
		this.state = {
			auth: context.auth,
			events: [],
			isLoading: false,
			error: "",
			prev: null,
			active: 0,
			next: 1,

		}
	}
	componentDidMount(){
		this.setState({
			isLoading: true
		})
		let data = {
			id: this.state.auth.user.id
		}
		fetch(api + '/getHomepageEvents', {
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
			}else if(events.eventArr){
				this.setState({
					events: events.eventArr,
					prev: (events.eventArr.length - 1),
					active: 0,
					next: 1,
					isLoading: false,
				})
			}
		})
		.catch(error => {
			this.setState({error: error, isLoading: false})
		})	
	}
	render(){

		let eventGrid = this.state.events.map((event) => {
			return(
				<div className = "card homepage-card">
					<TestDisplay key={event.id} event={event} userId={this.state.auth.user.id} /> 
				</div>
			)
		})
		return(
			<div className="landing-page">
				<div className="container homepage-top">
					<h1> Table For 2 </h1>
					<p> 
						Table for 2 is an app that connects you with events and
						activities happenening around you! Browse events submitted by
						other users, and connect with them by creating an account and
						liking their event. You can also create your own event by going
						to "My Account", where you can manage your profile and events...
					</p>
					<h2> Events Around me: </h2>
				</div>
				<div className="carousel-container">
					<Carousel slides={eventGrid} />
				</div>
			</div>
		)
	}
}

Landing.contextType = AuthContext
export default Landing