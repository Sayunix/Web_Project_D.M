const {users} = require('./data');
function userAuth(req,res,next){
    let username = req.body.name;
    let password = req.body.password;
    if(username && password){
        if(users.find(user => user.name === username && user.password === password)){
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
        }else{
            res.redirect('/login.html');
        }
        res.end();
    }else{
        res.send('Please enter Username and Password!');
        res.end();
    }
}
module.exports = {userAuth};