const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'python'},
    {id: 2, name: 'C++'},
    {id: 3, name: 'java'},
];

//returns all the available courses

router.get('/', (req, res) => {
    return res.send(courses);
});

//returns the specccific course searched by id
router.get('/:id', (req, res) => {
   let course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) return res.status(404).send(`The course with id = ${req.params.id} is not found`);
    return res.send(course);
});

//adds a course to the data
router.post('/', (req, res) => { //(req, res) is route handlers
       
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    console.log(result);
    //schema.validate()
    if(result.error){
        return  res.status(400).send(result.error.details[0].message);
        
    }
   
    const course = {
        id : courses.length +1,
        name : req.body.name
    };
    courses.push(course);
    return res.send(course); 
});


//edits a course entry
router.put('/:id', (req, res) =>{
    //look up the course
    //if doersnr exist, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) return res.status(404).send(`The course with id = ${req.params.id} is not found`);
    //validate
    //if invalid, return 404 -bad request

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    //if body is missing needed course 
    const { error } = userInputValidation(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    //update course data
    course.name = req.body.name;
   
    //return updated course
    res.send(course);


});

//delete a course entry
router.delete('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) return res.status(404).send(`The course with id = ${req.params.id} is not found`); 
    
    courses.splice(courses.indexOf(course), 1);
    return res.send(course);
});

//checks the request body 
let userInputValidation =  function(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

//  = Joi.validate(req.body, schema); //returns an object
    return schema.validate(course);
};

module.exports = router;