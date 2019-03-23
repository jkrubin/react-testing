import React from "react"
import openSocket from 'socket.io-client'
import { api } from "../config/config"

class ChatPage extends React.Component{
	constructor(){
		super()
		this.state = {
			chatbox: "",
			messages: []
		}
		this.socket = openSocket(api)
		this.handleChange = this.handleChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
	}
	componentWillMount(){
		this.socket.on('newMessage', (msg) => {
			this.setState((prevState) => {
				prevState.messages.push(msg)
				return prevState
			})
		})
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}
	sendMessage(){
		this.socket.emit('newMessage', this.state.chatbox)
	}
	componentWillUnmount(){
		console.log("bye")
		this.socket.disconnect()
	}
	render(){
		let messages = this.state.messages.map((message) => {
			return(
				<p> {message} </p>
			)
		})
		return(
			<div>
				<h1>Chat Page</h1>
				<div>
					Messages
				</div>
				<div>
					<div>
						{messages}
					</div>
					<input type="text" name="chatbox" value={this.state.chatbox} onChange={this.handleChange} />
					<button onClick={this.sendMessage}> Send </button>
				</div>
			</div>
		)
	}
}

export default ChatPage