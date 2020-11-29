// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({name:1})
        .exec()
}

module.exports.lookUp = (id) => {
    return Student
        .findOne({number: id})
        .exec()
}

module.exports.insert = (student) => {
    var newStudent = new Student(student)
    return newStudent.save()
}

module.exports.edit = (data) => {
    return Student
        .update({"number":data['number']},{$set : data})
        .exec();
}

module.exports.delete = (number) => {
    console.log("Imma remove");
    return Student
        .remove({ "number" : number})
        .exec();
}