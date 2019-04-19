import React from "react"
import {Navbar, Nav} from 'react-bootstrap'
import {AuthConsumer} from '../Contexts/AuthContext'
import {Link} from 'react-router-dom'
import LoginModal from './Modal/LoginModal'
import RegisterModal from './Modal/RegisterModal'
import ProfileModal from './Modal/ProfileModal'
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
				<Navbar.Brand >TABLE FOR 2</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link className="nav-link float-right" to="/"> Homepage </Link>
						<Link className="nav-link" to="/dashboard"> My Account </Link>
						<Link className="nav-link" to="/chat"> Chat </Link>
					</Nav>
				</Navbar.Collapse>
				<span className="navbar-text">
					<AuthConsumer>
				      {({ isAuth, login, logout, auth }) => (
				        <div>
				          {isAuth ? (
				          	<div className="nav-right">
				          	  <ProfileModal />
				          	  <div className="nav-account">
					          	  <Link className="nav-link" to="/dashboard" > Account </Link>
					              <button onClick = {logout}>
					                logout
					              </button>
				              </div>
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