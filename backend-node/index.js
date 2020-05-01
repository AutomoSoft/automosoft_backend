const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

const { createServer } = require('http');

const config = require('./config/database');
const users = require('./routes/users');

app.use(cors());
const connection = mongoose.connect("mongodb://localhost:27017/AutomoSoft",
{
    useNewUrlParser : true,
})
.then(() => console.log("Database Connected"))
.catch(err => console.log(err)
);



app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname,"public")));

app.use('/users', users);

app.get("/", function(req,res) {
    //res.send("Hello world");
});

app.listen(3000, function() {
    console.log("listening to port 3000");
});

module.exports = app; 