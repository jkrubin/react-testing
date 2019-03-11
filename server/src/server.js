const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('../models')
const fileUpload = require('express-fileupload')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

require('./routes')(app)
app.get('/', (req, res) => res.send('Hello World!'))

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({force: true})
	.then(() => {
		app.listen(8081, () => console.log('API listening on port 8081!'))
	})  
