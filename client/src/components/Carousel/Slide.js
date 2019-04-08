import React from "react"
import TestDisplay from "../TestDisplay"
class Slide extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			event: props.event,
			userId: props.userId
		}
	}

	render(){
		return(
			<div class="slide">
				<TestDisplay event={this.state.event} userId={this.state.userId} /> 
			</div>
		)
	}
}
export default Slide