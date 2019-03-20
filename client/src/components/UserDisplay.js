import React from "react"

class UserDisplay extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.like,
			displayProf: false
		}
		this.toggleProfile = this.toggleProfile.bind(this)
	}
	toggleProfile(){
		this.setState((prevState) =>{
			return {displayProf: !prevState.displayProf}
		})
	}
	render(){
		return(
			<div>
				<div className={"list-profile-container " + (this.state.displayProf ? "show-profile expanded-like-profile" : "")}>
					<div className={"list-profile "  + (this.state.displayProf ? "expanded-like-image" : "")}>
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
			</div>
		)
	}
}

export default UserDisplay