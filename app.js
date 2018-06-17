
  //Global Variables
  const express = require('express');
  const expressHandlebars = require('express-handlebars');
  const moviesJSON = require('./movies.json');

  const app = express();
  const path = require('path');


  //View Engine
  app.set('view engine', 'handlebars');
  app.engine('handlebars', expressHandlebars());

  //Static path
  app.use(express.static(path.join(__dirname, 'public')));


  //Routes
  //home
  app.get('/', function(req, res) {
    let movies = moviesJSON.movies;
    res.render('home', {
      title : "MCU App",
      movies : movies,
    });
  });
  //movies
  app.get('/movies/:title?', function(req, res) {
    let movieSearch = req.params.title + '.jpg';
    for (i = 0;i < moviesJSON.movies.length; i++){
      if (moviesJSON.movies[i].poster == movieSearch) {
      break
      }
    }
    res.render('movie', {
      title: moviesJSON.movies[i].title,
      movie: moviesJSON.movies[i]
    });
  });
  //notFound
  app.get('*', function(req, res) {
    res.send("<h1>This is not the page you are looking for</h1>");
  });


  //Port
  app.listen(3000, function() {
    console.log("listening on localhost:3000")
  });
