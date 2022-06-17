const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const path = require('path');

const loginRouter = require('./api/routes/login-router')

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