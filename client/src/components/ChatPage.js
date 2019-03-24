import React from "react"
import { api } from "../config/config"
import { AuthContext } from "../Contexts/AuthContext"
import ChatBox from './ChatBox'
class ChatPage extends React.Component{
	constructor(props, context){
		super(props, context)
		this.state = {
			eventArr: [],
			myEventArr: [],
			auth: context.auth,
			isLoading: false

		}

	}
	componentWillMount(){
		let data = {userId: this.state.auth.user.id}
		this.setState({isLoading: true})
		fetch(api + '/getInvitedEvents', {
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
					eventArr: events.eventArr,
					isLoading: false
				})
			}
		})
		.catch(error => {
			this.setState({error: error, isLoading: false})
		})

		fetch(api + '/getMyEvents', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			const myEvents = data
			if(myEvents.error){
				this.setState({
					error: myEvents.error,
					isLoading: false
				})
			}else if(myEvents){
				this.setState({
					myEventArr: myEvents.eventArr,
					isLoading: false
				})
			}
		})
		.catch(error => {
			this.setState({error: error, isLoading: false})
		})
	}

	render(){
		let myEventDisplay = this.state.myEventArr.map((event) => {
			return(
				<div className = "chat-page">
					<ChatBox event= {event} userId= {this.state.auth.user.id} />
				</div>
			)
		})
		let eventsDisplay = this.state.eventArr.map((event) => {
			return(
				<div className = "chat-page">
					<ChatBox event= {event} userId= {this.state.auth.user.id} />
				</div>
			)
		})
		return(
			<div>
				<div>
					<h2> My hosted Events: </h2>
					<div> 
						{myEventDisplay}
					</div>
					<h2> Events You Matched with: </h2>
					<div> {eventsDisplay} </div>
				</div>
			</div>
		)
	}
}
ChatPage.contextType = AuthContext
export default ChatPage