var express = require("express");
var app = express();
var port = 8000;
var path = require('path');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

app.use(express.static(path.join(__dirname , 'Assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://localhost:27017/node', (err, client) => {
  if (err) return console.log(err)
  db = client.db('node') // whatever your database name is

  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });

})

var expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: String
});

var Expense = mongoose.model("Expense", expenseSchema);

app.get("/", (req, res) => {    
  // Expense.find().sort({ "date": 1 })
  //   .then((expenses) => {
  //     console.log(expenses);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({error: error})
  //   })
  var mysort = { date: -1 };
  var cursor = db.collection('expenses').find().sort(mysort ).toArray(function(err, results) {
  if (err) return console.log(err);
    // renders index.ejs
    // console.log(results);

    res.render('index.ejs', {expenses: results})
  })  
  // send HTML file populated with quotes here
})

// app.get("/", (req, res) => {
  
// });


app.post("/bla", (req, res) => {
  var myExpense = new Expense(req.body);
  console.log(myExpense.amount);
  console.log(myExpense);
  db.collection('expenses').save(myExpense, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })


 //  	myExpense.save()
	// 	    .then(item => {
	// 	      console.log("item saved to database");
	// 	    })
	// 	    .catch(err => {
	// 	      console.log("unable to save to database");
	// 	    });

});

