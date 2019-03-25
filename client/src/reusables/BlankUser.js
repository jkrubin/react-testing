import React from "react"

class BlankUser extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			image: props.image,
			message: props.message
		}
	}
	render(){
		return(
			<div className="list-profile-container">
				<div className="list-profile">
					<img src={this.state.image} 
						alt="" 
						className="event-profile-pic" />
				</div>
				<div className="event-user-container ">
					<div className="event-user">
						<h5 className="event-username"> {this.state.message} </h5>
					</div>
				</div>
			</div>
		)
	}
}

export default BlankUser