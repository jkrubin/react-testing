import React from "react"

class MessageDisplay extends React.Component{
	constructor(props){
		super(props)
		this.state= {
			...props.message, 
			user: props.user,
			isMe: props.isMe
		}
	}

	render(){
		return(
			<div className={"message-container " + (this.state.isMe ? "my-message" : "")}>
				<div className="profile-container">
					<div className="profile-image-container">
						<img src={`data:${this.state.user.mimeType};base64,${this.state.user.profilePicture}`} 
							alt="" 
							className="message-profile-pic" />
					</div>
					<div className="profile-name">
						{this.state.user.name}
					</div>
				</div>
				<div className="message">
					<div className="message-content">
						{this.state.message}
					</div>
				</div>
			</div>
		)
	}
}

export default MessageDisplay