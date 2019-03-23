const AuthenticationController = require('../controllers/AuthenticationController')
const EventsController = require('../controllers/EventsController')
const LikesController = require('../controllers/LikesController')
const ChatController = require('../controllers/ChatController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
module.exports = (app, io) => {

	app.get('/route', (req, res) => res.send('routes'))
	io.on('connection',(socket) => {
		console.log('connection')
		socket.on('disconnect', () => {console.log('disconnect')})
		socket.on('newMessage', (msg) => {
			console.log(msg)
			io.emit('newMessage' + msg.eventId, msg.message)
		})
	})
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
		app.post('/getEventChat',
			EventsController.getEventChat)
		app.post('/getInvitedEvents',
			EventsController.getInvitedEvents)

	//Like endpoints
		app.post('/createLike',
			LikesController.createLike)
		app.post('/deleteLike',
			LikesController.deleteLike)
		app.post('/matchLike',
			LikesController.matchLike)

	//Chat endpoints
		app.post('/createChat',
			ChatController.createChat)
		app.post('/createMessage', (req, res) => {
			ChatController.createMessage(req, res, io)
		})
		app.post('/deleteChat',
			ChatController.deleteChat)		
}
