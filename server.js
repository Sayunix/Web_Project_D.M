const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const path = require('path');

//new form here
const dotenv = require('dotenv');
require('dotenv').config({path:'./.env'})
/*dotenv.config({ path: './.env'});*/

const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, //or ip adress from server!
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

/*
const db = mysql.createConnection({
    host: 'localhost', //or ip adress from server!
    user: 'root',
    password: '',
    database: 'DM-login' 
});
*/

const publicDirectory = path.join(__dirname, './css');
app.use(express.static(publicDirectory));

//template on what the main page should look like
//app.set('view engine', 'hbs');



db.connect( (error) => {
    if(error) {
        console.log(error)
    } else{
        console.log("MYSQL Connected!")
    }
})



const learingRouter = require('./api/routes/learning-router');


const loginRouter = require('./api/routes/login-router')

app.use('/api', learingRouter);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'DevelopMental')));
//entrypoint
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


app.listen(5000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:5000`);
    }
});