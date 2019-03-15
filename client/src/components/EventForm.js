import React from "react"

class EventForm extends React.Component{
	constructor(props){
		super()

		this.state = {
			...props.event,
			error: "",
			eventRevert: props.event
		}
		if(!this.state.date){
			this.state.date = undefined
		}
		if(!this.state.capacity){
			this.state.capacity = undefined
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.revert = this.revert.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.event){
			this.setState({...nextProps.event})
		}	
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}

	async handleSubmit(){
		if(	this.state.name === this.state.eventRevert.name &&
			this.state.description === this.state.eventRevert.description &&
			this.state.image === this.state.eventRevert.image &&
			this.state.location === this.state.eventRevert.location &&
			this.state.date === this.state.eventRevert.date &&
			this.state.capacity === this.state.eventRevert.capacity
		){
			this.setState({error: "Event must be altered to update"})
		}else{
			await this.props.submitEvent({...this.state})
		}
	}

	revert(){
		this.setState({...this.state.eventrevert})
		this.props.flipCard()
		if(this.state.id === 0){
			this.props.cancelNewEvent()
		}
	}

	render(){
		return(
			<div className="event-form">
				<form>
	          		<div className="form-group">
		          		<label>Event Name </label>
		          		<input className="form-control"
		          		type="text"
		          		name="name"
		          		value={this.state.name}
		          		onChange={this.handleChange}/>
	          		</div>
	          		<div className="form-group">
		          		<label>Describe your event! </label>
		          		<input className="form-control"
		          		type="text"
		          		name="description"
		          		value={this.state.description}
		          		onChange={this.handleChange}/>
	          		</div>
	          		<div className="form-group">
		          		<label>Provide a link to a relevant image </label>
		          		<input className="form-control"
		          		type="text"
		          		name="image"
		          		value={this.state.image}
		          		onChange={this.handleChange}/>
	          		</div>
	          		<div className="form-group">
		          		<label>Location of event </label>
		          		<input className="form-control"
		          		type="text"
		          		name="location"
		          		value={this.state.location}
		          		onChange={this.handleChange}/>
	          		</div>
	          		<div className="form-group">
	          			<label> Event Date </label>
	          			<input className="form-control"
	          			type="date"
	          			name="date"
	          			value={this.state.date}
	          			onChange={this.handleChange} />
	          		</div>
	          		<div className="form-group">
		          		<label>How many people can attend your event?</label>
		          		<input className="form-control"
		          		type="number"
		          		name="capacity"
		          		value={this.state.capacity}
		          		onChange={this.handleChange}/>
	          		</div>
	          		<div className="error">
	          			{this.state.error?
	          				<span> {this.state.error} </span>
	          				: null}
	          		</div> 
	          	</form>
	          	<button type="button" className="btn btn-primary event-revert" onClick={this.revert}> Cancel Edit </button>
	          	<button type="button" className="btn btn-primary event-submit" onClick={this.handleSubmit}> Create Event! </button>
			</div>
		)
	}
}

export default EventForm