import React from "react"
import {Modal, Button, Form} from 'react-bootstrap'
import { AuthContext } from '../../Contexts/AuthContext'
class LoginModal extends React.Component{
	constructor(props){
		super(props)

		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			show:false,
			username: "",
			password: "",
			error: false		}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}

	handleSubmit(){
		const data = {
			email: this.state.username,
			password: this.state.password
		}
		this.context.login(data)
		.then(res => {
			this.setState({error: res.error})
		})
	}
	render(){
		return(
			<div>
		        <Button onClick={this.handleShow}>
		          Login
		        </Button>

		        <Modal show={this.state.show} onHide={this.handleClose}>
		          <Modal.Header closeButton>
		            <Modal.Title>Log in</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<form>
		          		<div className="form-group">
			          		<label>Email </label>
			          		<input className="form-control"
			          		type="text"
			          		name="username"
			          		value={this.state.username}
			          		onChange={this.handleChange}/>
		          		</div>
		          		<div className="form-group">
			          		<label>password </label>
			          		<input className="form-control"
			          		type="password"
			          		name="password"
			          		value={this.state.password}
			          		onChange={this.handleChange}/>
		          		</div>

		          		<div className="error">
		          			{this.state.error?
		          				<span> {this.state.error} </span>
		          				: null}
		          		</div> 
		          	</form>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button variant="secondary" onClick={this.handleClose}>
		              Close
		            </Button>
		            <Button variant="primary" onClick={this.handleSubmit}>
		              Log In
		            </Button>
		          </Modal.Footer>
		        </Modal>
	        </div>
		)
	}
}

LoginModal.contextType = AuthContext

export default LoginModal
