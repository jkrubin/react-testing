import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import ProtectedRoute from './routes/ProtectedRoute'
import {AuthProvider} from './Contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
      	<Router>
	      	<AuthProvider>
	        	<Header />
	        	<Switch>
	        		<ProtectedRoute path="/dashboard" component={Dashboard} />
	        		<Route path="/" component={Landing} />
	        	</Switch>
	        </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
