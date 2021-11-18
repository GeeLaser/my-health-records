const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require('http-errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public/')));

const indexRouter = require('./routes/index');
const downloadRouter = require('./routes/download');
const emailRouter = require('./routes/email');


app.use('/', indexRouter);
app.use('/download', downloadRouter);
app.use('/email', emailRouter);
app.use('/upload', downloadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler

app.listen(8080,function(error) {
	if(error) throw error
		console.log("Server created Successfully on PORT 8080")
})
module.exports = app;