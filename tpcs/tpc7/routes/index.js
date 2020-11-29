var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Students App' });
});

router.get('/students', (req, res) => {
  // Data retrieve
  Student.list()
    .then(data => {
      res.render('students', { list: data });
    })
    .catch(err => res.render('error', {error: err}));
});

router.get('/students/:number', (req, res) => {
  // Data retrieve
  Student.lookUp(req.params["number"])
    .then(data => { 
      res.render('student', {student: data }) 
    })
    .catch(err => res.render('error', {error: err}));
});

module.exports = router;
