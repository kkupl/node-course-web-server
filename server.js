const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next()
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    homeMessage: 'Welcome'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'

  })
})

app.listen(3000);
