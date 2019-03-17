import React from "react"

class EventHomepage extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event
		}
	}
	render(){
		return(
			<div>
				<div className="event-image-container">
					<img className="card-img-top" src={this.state.image} alt=""/>
				</div>
				<div className="card-body">
					<h5 className="card-title"> {this.state.name} </h5>
					<p className="card-text"> {this.state.description} </p>
					<ul className="list-group list-group-flush">
						<li className="list-group-item"> Location: {this.state.location} </li>
					</ul>
				</div>
				<div className="user-bio card-body">
					<h5 className="card-title"> Submitted by</h5>
					<div className="row bio-row">
						<div className="col-md-auto">
							<img src={`data:${this.state.users.mimeType};base64,${this.state.users.profilePicture}`} alt="" className="event-profile-pic"/>
						</div>
						<div className="event-user-area col">
							<h4 className="event-username"> {this.state.users.name} </h4>
							<p className="card-text event-bio"> {this.state.users.bio} </p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default EventHomepage