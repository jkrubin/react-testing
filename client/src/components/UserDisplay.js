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
	componentWillReceiveProps(nextProps){
		this.setState({...nextProps.like})
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
								<button onClick={() => this.props.toggleInvite({id: this.state.id})}> Invite {this.state.user.name}! </button>
								<ul className="event-content-list">
									<li className="user-like-message">
										<div className="list-icon-container">
											<img
												src={require('../assets/infoIcon.png')}
												height='15'
												width='15'
												alt=""
											/>
											<div className="border-container"> </div>
										</div>
										<div className="event-desc-div list-content">
											<h6 className="card-text">Message: </h6>
											<p className="card-text"> {this.state.message} </p>
										</div>
									</li>
									<li className="user-like-bio">
										<div className="list-icon-container">
											<img
												src={require('../assets/locationIcon.png')}
												height='15'
												width='15'
												alt=""
											/>
											<div className="border-container"> </div>
										</div>
										<div className="event-location-div list-content">
											<h6 className="card-text">Bio: </h6>
											<p className="card-text"> 
												{this.state.user.bio}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserDisplay