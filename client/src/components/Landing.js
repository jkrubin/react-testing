import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import TestDisplay from "./TestDisplay"
import {Carousel} from 'react-bootstrap'
import openSocket from 'socket.io-client';

class Landing extends React.Component{
	constructor(props, context){
		super(props, context)
		this.state = {
			auth: context.auth,
			events: [],
			isLoading: false,
			error: "",

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
			console.log(events)
			if(events.error){
				this.setState({
					error: events.error,
					isLoading: false
				})
			}else if(events.eventArr){
				this.setState({
					events: events.eventArr,
					isLoading: false
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
				<Carousel.Item>
					<div className = "card homepage-card">
						<TestDisplay event={event} userId={this.state.auth.user.id} /> 
					</div>
				</Carousel.Item>
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
				<Carousel interval = {null}>
					{eventGrid}
				</Carousel>
				<div className="container">
					<h1> More content </h1>
					<div style={{height: '400px'}}> content </div>
				</div>
			</div>
		)
	}
}

Landing.contextType = AuthContext
export default Landing