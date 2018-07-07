
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
  app.get('/movies', function(req, res) {
    let movies = moviesJSON.movies;
    res.render('home', {
      movies : movies,
      title: "Movies (2008-present)"
    });
  });

  //movies
  app.get('/movies/:title?', function(req, res) {
    let movieSearch = req.params.title;
    for (i = 0;i < moviesJSON.movies.length; i++){
      if (moviesJSON.movies[i].link == movieSearch) {
      break
      }
    }
    let cast = moviesJSON.movies[i].cast;
    for (v = 0;v < cast.length; v++) {
      if (v > 0) {
        cast[v] = " " + cast[v];
      }
    }
    res.render('movie', {
      movie: moviesJSON.movies[i],
      title: moviesJSON.movies[i].title,
      year: moviesJSON.movies[i].year
    });
  });

  //notFound
  app.get('*', function(req, res) {
    res.send("<h1>This is not the page you are looking for</h1>");
  });


  //Port
  app.listen(3005, function() {
    console.log("listening on localhost:3005")
  });
