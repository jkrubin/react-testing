import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import EventDisplay from "./EventDisplay"

class Dashboard extends React.Component{
	constructor(props, context){
		super()
		this.state = {
			auth: context.auth,
			token: false,
			events: [],
			error: "",
			isLoading: false
		}
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
	render(){

		let eventGrid = this.state.events.map((event) => {
			return <EventDisplay event={event}/>
		})
		let picture = this.state.auth.user.profilePicture
		return(
			<div>
				<h1> Hello {this.state.auth.user.name} </h1>
				<div className="profile-mail">
					<h2> Your Profile</h2>
					<div className="profile-area">
						<ul className="profile-list">
							<li>
								Email: {this.state.auth.user.email}
							</li>
							<li>
								Name: {this.state.auth.user.name}
							</li>
						</ul>
						<img src={`data:${this.state.auth.user.mimeType};base64,${picture}`} />
						<div className="events-table">
							<h2> My Events </h2>
							<div className="events-grid container">
								<div className=" row justify-content-md-center">
									{eventGrid}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.contextType = AuthContext
export default Dashboard