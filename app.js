var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request')
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

robotConneccted = false;
isConverting = false;
robotIP = "192.168.7.177"

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/convert', function(req, res){
  var text = JSON.parse(req.query.text)
  console.log("Text to convert: " + text)
  if(robotConnected == true){
    if(isConverting == false){
      isConverting = true;
      request({
        url: 'https://',
        json: true
      }, function(error, response, channel_body){
        if(response.statusCode == 404){
          console.log("Error: request not able to be recived by robot")
        }
        if(!error && response.statusCode == 200){
          isConverting = false
          res.send({
            text: text
      });
          })
        }
    }else{
      console.log("Unable to convert becuase aleady converting")
    }
  }else{
    console.log("Unable to convert because robot is not connected...")
    res.send({
      text: null
    })
  }
})

app.get('/connect', function(req,res){
  console.log("Robot has requested to connect...")
  if(req){
    console.log("Robot connected to server")
    robotConneccted = true;
  }else{
    console.log("Robot failed to connect")
    robotConneccted = false;
  }
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err1q  
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
