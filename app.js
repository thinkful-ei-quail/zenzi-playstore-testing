const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan("common"));
app.use(cors());

//create a variable for data
const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
const playApps = require('./playstore.js');
const validSort = ['rating', 'app'];
app.get('/apps', (req, res) => {
  //assign const to sort and genres
  const {sort, genre} = req.query;
  //validating query entries
 // if genre && != stuffonlist then throw error
 if(genre && !validGenres.includes(genre)) {
   res.status(400).send(`genre must be one of ${validGenres}`)
 };
 if(sort && !validSort.includes(sort)) {
   res.status(400).send(`sort must be ${validSort}`)
 };
 const filteredArray = [...playApps];
 if(genre) {
   filteredArray = playApps.filter(app => {
     return app.Genres === genre 
   })
 }
 if(sort) {
   filteredArray.sort((a, b) => {
     return a[sort] - b[sort];
   })
 }

 //
 // filter genre list by given name
  //display data to client
  res.json(filteredArray);
});

app.listen(8000, () => {console.log('Server started on port:8000')});
