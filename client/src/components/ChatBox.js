import React from "react"
import openSocket from 'socket.io-client'
import { api } from "../config/config"
import ChatEvent from "./ChatEvent"
import '../chat.css'
class ChatBox extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			chatbox: "",
			messages: [],
			event: props.event,
			userId: props.userId,
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
		console.log("bye")
		this.socket.disconnect()
	}
	render(){
		let messages = this.state.messages.map((message) => {
			return(
				<p> {message.message} </p>
			)
		})
		return(
			<div>
				<div>
					<h1> Chat for {this.state.event.name} </h1>
					<ChatEvent event={this.state.event} />
				</div>
				<div>
					<div>
						Messages
						{messages}
					</div>
					<input 
						type="text" 
						name="chatbox" 
						value={this.state.chatbox} 
						onChange={this.handleChange} 
						onKeyPress={this.handleKeyPress}
					/>
					<button onClick={this.sendMessage}> Send </button>
				</div>
			</div>
		)
	}
}

export default ChatBox