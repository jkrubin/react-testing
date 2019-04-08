import React from "react"
import Slide from "./Slide"
class EventCarousel extends React.Component{
	constructor(props){
		super(props)
		let events = props.eventArr
		this.state = {
			events: props.eventArr.slice(),
			active: 0,
			userId: props.userId,
		}
	}

	render(){
		let eventSlides = this.props.eventArr.map((event) => {
			return(
				<div className="card homepage-card">
					<Slide event={event} userId={this.state.userId} active={this.state.active}/> 
				</div>
			)
		})
		return(
			<div className="carousel">
				This is a carousel
				{eventSlides}
			</div>	
		)
	}
}

export default EventCarousel