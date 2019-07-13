const express = require('express');
const passport = require('passport');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');


const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then( () => console.log("MongoDB Connected …"))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true)   


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRouter);


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Sever Started...${PORT}`));