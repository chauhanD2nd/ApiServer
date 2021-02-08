const Joi = require('joi');
const logger = require('./logger');
const express = require ('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');

app.use(express.json());  //express.json: a piece of middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses', courses);

app.use(logger);

app.get('/', (req, res) => {
    res.send(`Hello 
    World`);
    
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//test save