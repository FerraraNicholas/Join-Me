//Import express package
var express = require('express');
//Import mysql package
var mysql = require('mysql'); 
//Import body parser to parse the post request
var bodyParser = require("body-parser");
//Capture express in a variable
var app = express();
//Setting application wide settings for view engine
app.set("view engine", "ejs");
//Setting configuration
app.use(bodyParser.urlencoded({extended:true}));
//Connect the CSS to the NodeJS web application
app.use(express.static(__dirname + "/public"));

//Need to make a connection to the MySQL database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ferraranicholas',     //your username
  database : 'join_me_app'         //the name of db
});

app.post('/register', function(req,res){
 //Use body parser to parse the data and assign it to a JavaScript object   
 var person = {email: req.body.email};
 //Connect to database and run this query
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 console.log(err);
 console.log(result);
 //Redirect us back to homepage with updated users total
 res.redirect("/");
 });
});

 //Use .get method to request the '/' route
app.get("/", function(req, res){
    //Variable that holds out SQL command
    var q = "SELECT COUNT(*) AS 'count' FROM users";
    //Connect to the database and query, set up callback
    connection.query(q, function(err, result) {
        //Call back will throw error if there is
        if (err) throw err;
        //Otherwise get the results of the connection and assign it to a variable
        var count = result[0].count;
        //Send the results page back, pass with it a JavaScript object containg the results of count, name it d ata
         res.render("index", {data: count});
    });
});
 
//The port that the web application is listening on
app.listen(8080, function () {
 console.log('App listening on port 8080!');
});