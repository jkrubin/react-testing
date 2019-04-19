import React from "react"
import {Modal, Button} from 'react-bootstrap'
import { AuthContext } from '../../Contexts/AuthContext'
import { withRouter } from 'react-router-dom'
import Profile from '../Profile'

class ProfileModal extends React.Component{
	constructor(props, context){
		super(props, context)

		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)

		this.state = {
			auth: context.auth,
			show:false,
			error: false		}
	}
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({auth: nextContext.auth})
	}
	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	render(){
		let displayImg
		if(this.state.auth.user.profilePicture){
			displayImg = (<img src={`data:${this.state.auth.user.mimeType};base64,${this.state.auth.user.profilePicture}`} 
							alt="" 
							className="event-profile-pic"
							onClick={this.handleShow}/>)
		}else{
			displayImg = (<img src={require('../../assets/no-prof.jpg')} 
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
		        <Modal show={this.state.show} onHide={this.handleClose}>
		          <Modal.Header closeButton>
		            <Modal.Title>Edit Profile</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
						<Profile user={this.state.auth.user} token={this.state.auth.token} />
		          </Modal.Body>
		          <Modal.Footer>
		            <Button variant="secondary" onClick={this.handleClose}>
		              Close
		            </Button>
		          </Modal.Footer>
		        </Modal>
	        </div>
		)
	}
}

ProfileModal.contextType = AuthContext

export default withRouter(ProfileModal)
