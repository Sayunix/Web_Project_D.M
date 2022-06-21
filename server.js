const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
const { users } = require('./data');
const {userAuth} = require('./userAuth');
const port = process.env.PORT ?? 5000;

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'super topsecret',
    resave: false,
    cookie: { maxAge: oneDay },
    saveUninitialized: true,
}));


const learingRouter = require('./api/routes/learning-router');


const loginRouter = require('./api/routes/login-router')

app.use('/api', learingRouter);


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'DevelopMental')));
//entrypoint
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.post('/auth',userAuth, function(req,res){

});

app.post('/logout',function(req,res){
    if(req.session.loggedin){
        req.session.loggedin = false;
        req.session.destroy();
        res.redirect('/');
    }else{
        res.send('Please login first to log out');
    }
});

app.listen(5000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:5000`);
    }
});

const relaxRouter = require('./api/routes/relax-router');

app.use('/api', relaxRouter);

