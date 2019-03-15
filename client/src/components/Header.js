import React from "react"
import {Navbar, Nav} from 'react-bootstrap'
import {AuthConsumer} from '../Contexts/AuthContext'
import {Link} from 'react-router-dom'
import LoginModal from './Modal/LoginModal'
import RegisterModal from './Modal/RegisterModal'
class Header extends React.Component{
	constructor(){
		super()
		this.state = {}

	}

	render(){
		return(
		  <header>
			<Navbar bg="light" expand="md">
				<Link to="/" >
					<img
						src={require('../assets/testLogo.png')}
						height='100'
						width='100'
						alt=""
					/>
				</Link>
				<Navbar.Brand >Test App</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link className="nav-link float-right" to="/"> Homepage </Link>
						<Link className="nav-link" to="/dashboard"> My Account </Link>
					</Nav>
				</Navbar.Collapse>
				<span className="navbar-text">
					<AuthConsumer>
				      {({ isAuth, login, logout, auth }) => (
				        <div>
				          {isAuth ? (
				          	<div>
				          	  <span> Hello {auth.user.email} </span>
				          	  <Link className="nav-link" to="/dashboard" > Account </Link>
				              <button onClick = {logout}>
				                logout
				              </button>
				            </div>
				          ) : (
				          	<div className="auth-group">
					          	<RegisterModal />
					            <LoginModal />
				            </div>
				          )}
				        </div>
				      )}
				    </AuthConsumer>
				</span>
			</Navbar>	  
		  </header>		)
	}
}



export default Header