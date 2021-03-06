import React from "react"
import {Modal} from 'react-bootstrap'

class UserBall extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.like,
			displayProf: false,
			invited: props.invited,
			show: false,
		}
		if(!props.like && props.user){
			this.state.user = props.user
		}
		this.toggleProfile = this.toggleProfile.bind(this)
		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)

	}
	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
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
		let displayImg
		if(this.state.user.profilePicture){
			displayImg = (<img src={`data:${this.state.user.mimeType};base64,${this.state.user.profilePicture}`} 
							alt="" 
							className="event-profile-pic"
							onClick={this.handleShow}/>)
		}else{
			displayImg = (<img src={require('../assets/no-prof.jpg')} 
							alt="" 
							className="event-profile-pic"
							onClick={this.handleShow}/>)
		}
		return(
			<div>
				<div className="list-profile-ball">
					<div className="list-profile ">
						{displayImg}
					</div>
				</div>
				<Modal show={this.state.show} onHide={this.handleClose} className="user-modal-conent">
		         	<Modal.Body className="user-modal-body">
						<div className="list-profile-container user-modal" style={{
							backgroundImage: "url("+require('../assets/brushed-alum.png')+")",
							backgroundRepeat: "repeat"
						}}>
							<div className="list-profile ">
								<img src={`data:${this.state.user.mimeType};base64,${this.state.user.profilePicture}`} 
									alt="" 
									className="event-profile-pic"
									onClick={this.toggleProfile}/>
							</div>
							<div className="event-user-container">
								<div className="event-user">
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
												<h4 className="event-username"> {this.state.user.name} </h4>
											</div>
										</li>
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
										<button onClick={() => this.props.toggleInvite({id: this.state.id})} className="invite-button"> {this.state.invited ? "Uninvite" : "Invite"} {this.state.user.name} </button>
									</ul>
								</div>
							</div>
						</div>
		         	</Modal.Body>
		        </Modal>
			</div>
		)
	}
}

export default UserBall