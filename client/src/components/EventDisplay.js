import React from "react"
class EventDisplay extends React.Component{
	constructor(props){
		super()
		this.state = {
			...props.event
		}
		if(!this.state.likes){
			this.state.likes = []
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
		let displayDate = new Date(this.state.date).toLocaleString('en-US').substring(0,9)
		return(
			<div> 
				<div className="row event-row" >
					<div className="event-image-container">
						<div className="event-image">
								<img className="card-img-top" src={this.state.image} alt="" />
						</div>
					</div>
					<div className="event-content-container">
						<ul className="event-content-list">
							<li className="event-name">
								<div className="event-name-div">
									<h3 className="card-title"> {this.state.name} </h3>
								</div>
							</li>
							<li className="event-desc ">
								<div className="list-icon-container list-flush ">
									<img
										src={require('../assets/infoIcon.png')}
										height='15'
										width='15'
										alt=""
									/>
									<div className="border-container"> </div>
								</div>
								<div className="event-desc-div list-content">
									<h6 className="card-text">Description: </h6>
									<p className="card-text"> {this.state.description} </p>
								</div>
							</li>
							<li className="event-loc ">
								<div className="list-icon-container list-flush">
									<img
										src={require('../assets/locationIcon.png')}
										height='15'
										width='15'
										alt=""
									/>
									<div className="border-container"> </div>
								</div>
								<div className="event-location-div list-content">
									<h6 className="card-text">Location: </h6>
									<p className="card-text"> 
										At {this.state.location}
									</p>
								</div>
							</li>
							<li className="event-datetime ">
								<div className="list-icon-container list-flush">
									<img
										src={require('../assets/dateIcon.png')}
										height='15'
										width='15'
										alt=""
									/>
									<div className="border-container"> </div>
								</div>
								<div className="event-date-div list-content">
									<h6 className="card-text">Date: </h6>
									<p className="card-text">
										{displayDate}
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default EventDisplay