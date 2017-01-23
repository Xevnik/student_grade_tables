/**
 * Created by kevin on 11/13/16.
 */
var app = angular.module('sgtApp', ["firebase"]);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBUzvNLzTUym0KsWSkuZZVT--ZbkKnpS-c",
    authDomain: "lfzintro.firebaseapp.com",
    databaseURL: "https://lfzintro.firebaseio.com",
    storageBucket: "lfzintro.appspot.com",
    messagingSenderId: "684400452761"
};
firebase.initializeApp(config);


app.controller('sgtController', function($log, $firebaseArray){
    var scScope = this;
    scScope.student = {};
    scScope.studentList = [];
    scScope.GPA = 0;
    scScope.order = null;
    scScope.editEnabled = false;

    //Download students from Firebase as array
    var studentsRef = firebase.database().ref().child("students");

    /**
     * Updates student list with list from DB
     */
    var getData = function() {
        scScope.studentList = $firebaseArray(studentsRef);
        scScope.studentList.$loaded().then(
            function(x){
                //$log.log(scScope.studentList);
                calculateGPA(x);
            }).catch(function(error){
            $log.error("Failed to connect: ", error);
        });
        scScope.studentList.$watch(function(event){ calculateGPA(scScope.studentList)});
    };
    /**
     * calculate GPA for collective students
     * @param students [obj- list of student to calculate GPA
     */
    var calculateGPA = function(students){
        //$log.log('Calculating:', students);
        var totalGrades = students.reduce(
            (total, student) => { return total + parseInt(student.grade); }, 0
        );
        scScope.GPA = totalGrades/students.length;
    };
    /**
     * add student to DB and update view
     */
    scScope.addClicked = function(){
        scScope.student = {
            name: scScope.student.name,
            course: scScope.student.course,
            grade: scScope.student.grade
        };
        //$log.log("Adding:", scScope.student);
        //add to Firebase
        $firebaseArray(studentsRef).$add(scScope.student);
        //clear input fields
        scScope.student = {};
    };
    /**
     * Clear data in form
     */
    scScope.cancelClicked = function (){
        scScope.student = {};
    };
    /**
     * Remove student from DB
     * @param studentToRemove
     */
    scScope.deleteStudent = function (studentToRemove){
        //$log.log("Removing: " + studentToRemove.name);
        scScope.studentList.$remove(scScope.studentList.indexOf(studentToRemove));
    };

    //applies filter depending on column clicked; if same column clicked, invert column
    scScope.setOrder = function (orderBy) {
        scScope.order = (scScope.order === orderBy) ? '-' + orderBy : orderBy;
    };

    //saves current editable student and disable edit buttons
    scScope.saveDefault = function(currentStudent){
        scScope.editEnabled = true;
    };

    //update firebase with updated student info and enable buttons
    scScope.updateStudent = function(){
        scScope.editEnabled = false;
    };

    //color code grade
    scScope.qualifyGrade = function(grade){
        if(grade < 60){
            return "label label-danger";
        }else if(grade >= 60 && grade < 70){
            return "label label-warning";
        }else if(grade >= 70 && grade < 90){
            return "label label-info";
        }else{
            return "label label-success";
        }
    };
    //initialize
    getData();
});