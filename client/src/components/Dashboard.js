import React from "react"
import { AuthContext } from "../Contexts/AuthContext"

class Dashboard extends React.Component{
	constructor(props, context){
		super()
		this.state = {
			auth: context.auth,
			token: false
		}
	}

	render(){
		return(
			<div>
				<h1> Hello {this.state.auth.user.name} </h1>
			</div>
		)
	}
}

Dashboard.contextType = AuthContext
export default Dashboard