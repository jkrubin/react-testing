import React from "react"
import { api } from "../config/config"
import ChatBox from './ChatBox'
class ChatPage extends React.Component{
	constructor(){
		super()
		this.state = {
			Events: [],

		}

	}
	componentWillMount(){
		
	}

	render(){
		return(
			<div>
				<h1>Chat Page</h1>
				<ChatBox />
			</div>
		)
	}
}

export default ChatPage