/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
var addClicked = function (){

};
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
var cancelClicked = function (){
    $('input').reset();
};
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
var addStudent = function(){
    var student = {
        name:
        course:
        grade:
    }
};
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
var clearAddStudentForm = function(){

};
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
var calculateAverage = function(){

};
/**
 * updateData - centralized function to update the average and call student list update
 */
var updateData = function(){

};
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
var updateStudentList = function(){

};
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
var addStudentToDom = function(studenObj){

};
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
var reset = function(){

};

/**
 * Listen for the document to load and reset the data to the initial state
 */
document.ready();