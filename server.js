const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const userRouter = require('./routes/user');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRouter);


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Sever Started...${PORT}`));