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
	componentWillReceiveProps(nextProps){
		this.setState({
			name: nextProps.event.name,
			description: nextProps.event.description,
			image: nextProps.event.image,
			location: nextProps.event.location
		})
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
			</div>
		)
	}
}

export default EventDisplay