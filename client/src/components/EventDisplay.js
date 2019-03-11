import React from "react"

class EventDisplay extends React.Component{
	constructor(props){
		super()
		this.state = {
			name: props.event.name,
			description: props.event.description,
			image: props.event.image,
			location: props.event.location
		}
	}

	render(){
		return(
			<div className="col-md-auto">
				<div className="card">
					<img className="card-img-top" src={this.state.image} alt="Event Image" />
					<div className="card-body">
						<h5 className="card-title"> {this.state.name} </h5>
						<p className="card-text"> {this.state.description} </p>
						<ul className="list-group list-group-flush">
							<li className="list-group-item"> Location: {this.state.location} </li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default EventDisplay