var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')

var book = require('./routes/book')
var app = express()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const connString = 'mongodb://testuser:showittome@hellocluster-shard-00-00-9h3k5.mongodb.net:27017,hellocluster-shard-00-01-9h3k5.mongodb.net:27017,hellocluster-shard-00-02-9h3k5.mongodb.net:27017/test?ssl=true&replicaSet=HelloCluster-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(connString, 
	{
		useNewUrlParser: true,
		promiseLibrary: require('bluebird')
	})
	.then(() => {
		console.log('connection successful')		
	})
	.catch(err => {
		console.log(err)
	})



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/books', express.static(path.join(__dirname, 'dist')))
app.use('/book', book)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
  
	// render the error page
	res.status(err.status || 500)
	res.render('error')
  })
  
  module.exports = app