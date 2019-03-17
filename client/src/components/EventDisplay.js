import React from "react"

class EventDisplay extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event
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
					<p className="card-text"> Location: {this.state.location} </p>
					<p className="card-text"> {new Date(this.state.date).toLocaleString('en-US')} </p>
				</div>
			</div>
		)
	}
}

export default EventDisplay