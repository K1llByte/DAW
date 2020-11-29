var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

// A

function body_to_student(body)
{
    return {
        "number" : body['number'],
        "name"   : body['name']  ,
        "git"    : body['git']   ,
        "tpc"    : [
            (body['tpc1'] == "on") ? 1 : 0,
            (body['tpc2'] == "on") ? 1 : 0,
            (body['tpc3'] == "on") ? 1 : 0,
            (body['tpc4'] == "on") ? 1 : 0,
            (body['tpc5'] == "on") ? 1 : 0,
            (body['tpc6'] == "on") ? 1 : 0,
            (body['tpc7'] == "on") ? 1 : 0,
            (body['tpc8'] == "on") ? 1 : 0
        ]
    };
}

// 

// GET Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Students App' });
});


// GET Students list
router.get('/students', (req, res) => {
  // Data retrieve
  Student.list()
    .then(data => {
      res.render('students', { list: data });
    })
    .catch(err => res.render('error', {error: err}));
});


// GET Student Register page
router.get('/students/register', (req, res) => {
  // Why here a static pug file?
  // Just in case we want to make it dynamic in a future
  res.render('register', {});
});


// GET Student Edit page
router.get('/students/edit/:number', (req, res) => {
    Student.lookUp(req.params["number"])
        .then(data => { 
            res.render('edit', {student:data});
        })
        .catch(err => res.render('error', {error: err}));
});


// GET Student Page
router.get('/students/:number', (req, res) => {
    // Data retrieve
    Student.lookUp(req.params["number"])
        .then(data => { 
          res.render('student', {student: data }) 
        })
        .catch(err => res.render('error', {error: err}));
});


// POST Create Student
router.post('/students', (req, res) => {
  // Data insertion
  Student.insert(body_to_student(req.body))
  .then(data => { 
    Student.list()
    .then(data_all => {
      res.render('students', { list: data_all });
    })
    .catch(err1 => res.render('error', {error: err1}));
  })
  .catch(err2 => res.render('error', {error: err2}));
});


// POST Edit Student
router.put('/students/:number', (req, res) => {
    // Data Update
    Student.edit(body_to_student(req.body))
    .then(data => { 
      Student.list()
      .then(data_all => {
        res.render('students', { list: data_all });
      })
      .catch(err1 => res.render('error', {error: err1}));
    })
    .catch(err2 => res.render('error', {error: err2}));
  });


// POST Delete Student
router.delete('/students/:number', (req, res) => {
    // Data Deletion
    Student.delete(req.params.number)
    .then(data => {
        Student.list()
        .then(data_all => {
          res.render('students', { list: data_all });
        })
        .catch(err1 => res.render('error', {error: err1}));
    })
    .catch(err2 => res.render('error', {error: err2}));
});

module.exports = router;
