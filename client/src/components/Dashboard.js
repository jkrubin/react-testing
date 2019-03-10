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
				<div className="profile-mail">
					<h2> Your Profile</h2>
					<div className="profile-area">
						<ul className="profile-list">
							<li>
								Email: {this.state.auth.user.email}
							</li>
							<li>
								Name: {this.state.auth.user.name}
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.contextType = AuthContext
export default Dashboard