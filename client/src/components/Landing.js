import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import EventHomepage from "./EventHomepage"
import {Carousel} from 'react-bootstrap'

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
					<div className = "card">
						<EventHomepage event={event} /> 
					</div>
				</Carousel.Item>
			)
		})
		return(
			<div className="container">
				<h1> User Landing </h1>
				<Carousel interval = {null}>
					{eventGrid}
				</Carousel>
			</div>
		)
	}
}

Landing.contextType = AuthContext
export default Landing