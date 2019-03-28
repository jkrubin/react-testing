import React from "react"

class UserBubble extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user: props.user,
			displayProf: props.displayProf
		}
		this.toggleProfile = this.toggleProfile.bind(this)
	}
	toggleProfile(){
		this.setState((prevState) =>{
			return {displayProf: !prevState.displayProf}
		})
		if(this.props.toggleCallback){
			this.props.toggleCallback()
		}
	}
	componentDidUpdate(prevProps){
		if(this.props.displayProf !== prevProps.displayProf){
			this.setState({displayProf: this.props.displayProf})
		}
	}
	render(){
		return(
			<div className={"list-profile-container " + (this.state.displayProf ? "show-profile" : "hide-profile")}
				 style={{
					backgroundImage: "url("+require('../assets/cream-paper.png')+")",
					backgroundRepeat: "repeat"
			}}>
				<div className="list-profile">
					<img src={`data:${this.state.user.mimeType};base64,${this.state.user.profilePicture}`} 
						alt="" 
						className="event-profile-pic"
						onClick={this.toggleProfile}/>
				</div>
				<div className="event-user-container ">
					<div className="event-user">
						<h4 className="event-username"> {this.state.user.name} </h4>
						<div className={this.state.displayProf ? "expand-prof" : "min-prof"}>
							<p className="card-text event-bio"> {this.state.user.bio} </p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserBubble