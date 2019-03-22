const AuthenticationController = require('../controllers/AuthenticationController')
const EventsController = require('../controllers/EventsController')
const LikesController = require('../controllers/LikesController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
module.exports = (app) => {

	app.get('/route', (req, res) => res.send('routes'))

	//Users endpoints
		//Register User
		app.post('/register',
			AuthenticationControllerPolicy.register,
			AuthenticationController.register)
		//Login User
		app.post('/login',
			AuthenticationController.login)
		//Update User
		app.post('/updateUser',
			AuthenticationController.matchUserToken,
			AuthenticationController.updateUser)

	//Events endpoints
		app.post('/createEvent',
			//AuthenticationController.matchUserToken,
			EventsController.createEvent)
		app.post('/getEventById',
			EventsController.getEventById)
		app.post('/getEventByUser',
			EventsController.getEventByUser)
		app.post('/updateEvent',
			EventsController.updateEvent)
		app.post('/deleteEvent',
			EventsController.deleteEvent)
		app.post('/getHomepageEvents',
			EventsController.getHomepageEvents)

	//Like endpoints
		app.post('/createLike',
			LikesController.createLike)
		app.post('/deleteLike',
			LikesController.deleteLike)
		app.post('/matchLike',
			LikesController.matchLike)
}
