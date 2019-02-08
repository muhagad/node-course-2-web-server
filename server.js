const express = require('express');
const hbs = require('hbs');
// const pug = require('pug');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // setting template engine handlebars


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err) {
        throw err;
      }
      console.log('the data has been appended to the file');
    });
  next();
});


// app.use((req, res, next) => {
  
//     res.render('maintenance.hbs');

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page by Pug engine',
    paragraph: 'welcome to my Home page'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page trasta'
  });
});

app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'unable to find page'
  });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}.`);
});
