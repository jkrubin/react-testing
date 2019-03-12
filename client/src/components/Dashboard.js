import React from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { api } from "../config/config"
import EventDisplay from "./EventDisplay"
import Profile from "./Profile"

class Dashboard extends React.Component{
	constructor(props, context){
		super()
		this.state = {
			auth: context.auth,
			token: false,
			events: [],
			error: "",
			isLoading: false,
		}
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
	render(){

		let eventGrid = this.state.events.map((event) => {
			return <EventDisplay event={event}/>
		})
		return(
			<div>
				<h1> Hello {this.state.auth.user.name} </h1>
				<div className="profile-mail">
					<Profile user={this.state.auth.user} token={this.state.auth.token} />
					<div className="profile-area">
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