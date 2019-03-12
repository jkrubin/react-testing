import React from "react"
import { api } from "../config/config"
import { AuthContext } from '../Contexts/AuthContext'

class Profile extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			...props.user,
			token: props.token, 
			error: "",
			canSubmit: true,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}

	handleSubmit(){
		if(this.state.canSubmit){
			this.setState({canSubmit: false})

			let data = new FormData()
			data.append('email', this.state.email)
			data.append('bio', this.state.bio)
			data.append('name', this.state.name)
			data.append('id', this.state.id)
			//data.append('file', this.state.image, "profile.png")
			this.context.updateUser(data)
			.then(res => {
				this.setState({
					error: res.error,
					canSubmit: true
				})
			})
		}else{
			this.setState({
				error: "cannot register with incorrect form"
			})
		}
	}

	render(){
		return(
			<div className= "profile-panel">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title"> Profile: </h5>
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
			          		<label>My Bio </label>
			          		<textarea className="form-control"
			          		type="text"
			          		name="bio"
			          		value={this.state.bio}
			          		onChange={this.handleChange}/>
		          		</div>
		          		<div className="error">
		          			{this.state.error?
		          				<span> {this.state.error} </span>
		          				: null}
		          		</div> 
		          		{this.state.canSubmit?
		          			(<button type="button" className="btn btn-primary" onClick={this.handleSubmit}> Update Profile </button>)
		          			:(<button type="button" className="btn btn-primary" disabled> Loading... </button>)}
			          	</form>
					</div>
				</div>
			</div>
		)
	}
}
Profile.contextType = AuthContext
export default Profile