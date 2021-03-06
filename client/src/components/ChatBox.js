import React from "react"
import openSocket from 'socket.io-client'
import { api } from "../config/config"
import MessageDisplay from "./MessageDisplay"
import UserBall from '../reusables/UserBall'
import '../chat.css'
class ChatBox extends React.Component{ 
	constructor(props){
		super(props)
		this.state = {
			chatbox: "",
			messages: [],
			userId: props.userId,
			event: props.event,
		}
		this.socket = openSocket(api)
		this.handleChange = this.handleChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}
	componentWillMount(){
		this.socket.on('newMessage' + this.state.event.id, (msg) => {
			this.setState((prevState) => {
				prevState.messages.push(msg)
				return prevState
			})
		})
	}
	handleKeyPress(event){
		if(event.key === 'Enter'){
			this.sendMessage()
		}
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}
	sendMessage(){
		let message = {
			userId: this.state.userId,
			eventId: this.state.event.id,
			message: this.state.chatbox
		}
		if(this.state.chatbox !== ""){
			this.socket.emit('newMessage', message)
			this.setState({chatbox: ""})
		}
	}
	componentWillUnmount(){
		this.socket.disconnect()
	}
	render(){
		let messages = this.state.messages.map((message) => {
			let user
			if(message.userId === this.state.event.userId){
				user = this.state.event.users
			}else if(this.state.event.chat[0].event.likes.length){
				let like = this.state.event.chat[0].event.likes.filter((like) => {
					return like.user.id === message.userId
				})
				user = like[0].user
			}
			return(
				<MessageDisplay key={this.state.messages.length} message={message} user={user} isMe={(this.state.userId === message.userId)} />
			)
		})
		let eventChatUsers = []
		if(this.state.event.chat.length){
			eventChatUsers = this.state.event.chat[0].event.likes.map((like) => {
				let user = like.user
				return (
					<div key={user.id} className="user-bubble-container " >
						<UserBall 
						like={like} 
						key={user.id}
						/>
					</div>
				)
			})
		}
		return(
			<div className="container chat-box-container"
				style={{maxWidth: this.props.active? "10000px" : "0px"}}>
				<h3> {this.state.event.name} </h3>
				<div className="chat-info">
					<ul className="event-chat-user-list" >
						<li className="event-user">
							<div className="user-bubble-container ">
								<UserBall 
								user={this.state.event.users} 
								key={this.state.event.users.id}
								/>
							</div>
							{eventChatUsers}
						</li>
					</ul>
				</div>
				<div className="chat-container">
					<div className="chat-window-container">
						<div className="chat-window">
							{messages}
						</div>
					</div>
					<div className="chat-input-container">
						<input 
							type="text" 
							name="chatbox" 
							value={this.state.chatbox} 
							onChange={this.handleChange} 
							onKeyPress={this.handleKeyPress}
						/>
						<button onClick={this.sendMessage}> Send </button>
					</div>
					<div className="toggle-chat-window"> 
					</div>
				</div>
			</div>
		)
	}
}

export default ChatBox