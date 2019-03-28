import React from "react"
import { AuthContext } from '../Contexts/AuthContext'

class Profile extends React.Component{
	constructor(props){
		super(props)
		const {name, email, bio} = props.user
		this.state = {
			...props.user,
			token: props.token, 
			error: "",
			canSubmit: true,
			image: null,
			originalUser: {name, email, bio}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFile = this.handleFile.bind(this)
		this.rollback = this.rollback.bind(this)
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value, error: ""})
	}
	handleFile(event){
		this.setState({image: event.target.files[0]})
	}
	componentWillReceiveProps(nextProps) {
		const {name, email, bio, image} = nextProps.user
		this.setState({originalUser: {name, email, bio}, ...nextProps.user})
	}
	rollback(){
		this.setState((prevState) => {
			return {name: prevState.originalUser.name,
			email: prevState.originalUser.email,
			bio: prevState.originalUser.bio,
			image: null}
		})
	}
	handleSubmit(){
		if(	this.state.name === this.state.originalUser.name &&
			this.state.email === this.state.originalUser.email &&
			this.state.bio === this.state.originalUser.bio &&
			this.state.image === null)
		{
			this.setState({error: "no fields have been updated"})
			return null
		}
		if(this.state.canSubmit){
			this.setState({canSubmit: false})

			let data = new FormData()
			data.append('email', this.state.email)
			data.append('bio', this.state.bio)
			data.append('name', this.state.name)
			data.append('id', this.state.id)
			if(this.state.image){
				data.append('file', this.state.image, "profile.png")
			}
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
		let picture = this.state.profilePicture
		return(
			<div className= "profile-panel">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title"> Profile: </h5>
						<img src={`data:${this.state.mimeType};base64,${picture}`} alt="" className="profile-pic"/>
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
		          		<div className="form-group">
		          			<label> New Profile Picture </label>
		          			<input className="form-control"
		          			type="file"
		          			name="image"
		          			onChange={this.handleFile} />
		          		</div>
		          		<div className="error">
		          			{this.state.error?
		          				<span> {this.state.error} </span>
		          				: null}
		          		</div> 
		          		{this.state.canSubmit?
		          			(<button type="button" className="btn btn-primary" onClick={this.handleSubmit}> Update Profile </button>)
		          			:(<button type="button" className="btn btn-primary" disabled> Loading... </button>)
		          		}
		          		<button type="button" className="btn btn-secondary" onClick={this.rollback}> Undo changes </button>
			          	</form>
					</div>
				</div>
			</div>
		)
	}
}
Profile.contextType = AuthContext
export default Profile