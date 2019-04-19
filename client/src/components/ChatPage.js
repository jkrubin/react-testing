import React from "react"
import { api } from "../config/config"
import { AuthContext } from "../Contexts/AuthContext"
import ChatBox from './ChatBox'
import ChatEvent from './ChatEvent'
class ChatPage extends React.Component{
	constructor(props, context){
		super(props, context)
		this.state = {
			eventArr: [],
			myEventArr: [],
			auth: context.auth,
			isLoading: false,
			activeChat: 0,

		}
		this.getEventsFromAuth = this.getEventsFromAuth.bind(this)
		this.toggleActiveChat = this.toggleActiveChat.bind(this)
	}
	getEventsFromAuth(){
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
	componentWillMount(){
		this.getEventsFromAuth()
	}
	toggleActiveChat(eventId){
		if(this.state.activeChat === eventId){
			this.setState({activeChat: 0})
		}else{
			this.setState({activeChat: eventId})
		}
	}
	async componentWillReceiveProps(nextProps, nextContext) {
		await this.setState({auth: nextContext.auth})
		this.getEventsFromAuth()
	}
	render(){
		let myEventDisplay = this.state.myEventArr.map((event) => {
			return(
				<div className = "chat-page">
					<div>
						<div className="chat-container">
							<div className="event-row" >
								<ChatEvent event={event} active={this.state.activeChat === event.id} toggleActiveChat={this.toggleActiveChat}/>
							</div>
						</div>
					</div>
				</div>
			)
		})
		let eventsDisplay = this.state.eventArr.map((event) => {
			return(
				<div className = "chat-page">
					<div>
						<div className="chat-container">
							<div className="event-row" >
								<ChatEvent event={event} active={this.state.activeChat === event.id} toggleActiveChat={this.toggleActiveChat} />
							</div>
						</div>
					</div>
				</div>
			)
		})
		let myEventChatbox = this.state.myEventArr.map((event) => {
			return(
				<div className = "chat-page">
					<ChatBox 
						event= {event} 
						userId= {this.state.auth.user.id} 
						key={event.id} 
						toggleActiveChat={this.toggleActiveChat}
						active={this.state.activeChat === event.id} />
				</div>
			)
		})
		let eventsChatbox = this.state.eventArr.map((event) => {
			return(
				<div className = "chat-page">
					<ChatBox 
						event= {event} 
						userId= {this.state.auth.user.id} 
						key={event.id} 
						toggleActiveChat={this.toggleActiveChat}
						active={this.state.activeChat === event.id} />
				</div>
			)
		})
		return(
			<div className="chat-page-container">
				<div className="chat-list">
					<h2> My hosted Events: </h2>
					{myEventDisplay}
					<h2> Events You Matched with: </h2>
					{eventsDisplay}
				</div>
				<div className="active-chat">
					{myEventChatbox}
					{eventsChatbox}
				</div>
			</div>
		)
	}
}
ChatPage.contextType = AuthContext
export default ChatPage