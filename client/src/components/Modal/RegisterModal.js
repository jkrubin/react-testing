import React from "react"
import {Modal, Button, Form} from 'react-bootstrap'
import { AuthContext } from '../../Contexts/AuthContext'
class RegisterModal extends React.Component{
	constructor(props){
		super(props)

		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			show:false,
			email: "",
			password: "",
			confirm: "",
			name: "",
			error: false,
			canSubmit: true		}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value}, () =>{
			if(this.state.password != this.state.confirm){
				this.setState({
					error: "Password confirmation must match",
					canSubmit: false
				})
			}else if(this.state.error){
				this.setState({error: false, canSubmit: true})
			}
		})
	}

	handleSubmit(){
		const data = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name
		}
		if(this.state.canSubmit){
			this.context.register(data)
			.then(res => {
				this.setState({error: res.error})
			})
		}else{
			this.setState({
				error: "cannot register with incorrect form"
			})
		}
	}
	render(){
		return(
			<div>
		        <Button onClick={this.handleShow}>
		          Register
		        </Button>

		        <Modal show={this.state.show} onHide={this.handleClose}>
		          <Modal.Header closeButton>
		            <Modal.Title>Sign Up!</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<form>
		          		<div className="form-group">
			          		<label>Email </label>
			          		<input className="form-control"
			          		type="text"
			          		name="email"
			          		value={this.state.email}
			          		onChange={this.handleChange}/>
		          		</div>
		          		<div className="form-group">
			          		<label>Name </label>
			          		<input className="form-control"
			          		type="text"
			          		name="name"
			          		value={this.state.name}
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
		          		<div className="form-group">
			          		<label>confirm password </label>
			          		<input className="form-control"
			          		type="password"
			          		name="confirm"
			          		value={this.state.confirm}
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
		              Sign up
		            </Button>
		          </Modal.Footer>
		        </Modal>
	        </div>
		)
	}
}

RegisterModal.contextType = AuthContext

export default RegisterModal
