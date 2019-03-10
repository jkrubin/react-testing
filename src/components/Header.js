import React from "react"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import {AuthConsumer} from '../Contexts/AuthContext'
import {Link} from 'react-router-dom'
import LoginModal from './Modal/LoginModal'
class Header extends React.Component{
	constructor(){
		super()
		this.state = {}

	}

	render(){
		return(
		  <header>
			<Navbar bg="light" expand="md">
				<img
					src={require('../assets/testLogo.png')}
					height='100'
					width='100'
				/>
				<Navbar.Brand >Test App</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link className="nav-link" to="/dashboard"> Dash </Link>
						<Link className="nav-link float-right" to="/dashboard"> Right </Link>
					</Nav>
				</Navbar.Collapse>
				<span className="navbar-text">
					<AuthConsumer>
				      {({ isAuth, login, logout, auth }) => (
				        <div>
				          {isAuth ? (
				          	<div>
				          	  <span> Hello {auth.user.email} </span>
				              <button onClick = {logout}>
				                logout
				              </button>
				            </div>
				          ) : (
				            <LoginModal />
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