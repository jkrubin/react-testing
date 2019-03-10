import React from "react"

export const AuthContext = React.createContext()

class AuthProvider extends React.Component{
	constructor(){
		super()
		this.state = {
			isAuth: false,
			auth: {
				id: 1,
				username: "Josh"
			}
		}
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
	}

	async login(data){
		
		return fetch('http://18.188.201.66:8081/login', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((data) => {
			const auth = data
			if(auth.error){
				console.log({auth})
				return auth
			}else if(auth.user){
				this.setState({
					isAuth: true,
					auth: auth
				})
				return true
			}
		})
		.catch(error => console.log(error))	}
	
	logout(){
		this.setState({isAuth: false, auth: null})
	}

	render(){
		return(
			<AuthContext.Provider 
				value ={ { 
					isAuth: this.state.isAuth,
					auth: this.state.auth,
					login: this.login,
					logout:this.logout
				} }
			>
			{this.props.children}
			</AuthContext.Provider>
		)
	}
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer}