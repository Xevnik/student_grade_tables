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
var inputIds = [];
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
    addStudent();
    clearAddStudentForm();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    consoleOut('cancel has been clicked');
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
    //consoleOut('addStudent called');
    var enteredName = $('#studentName').val();
    var enteredCourse = $('#course').val();
    var enteredGrade = $('#studentGrade').val();
    var student = {
        name: enteredName,
        course: enteredCourse,
        grade: enteredGrade
    };
    //consoleOut('Student obj ', student);
    student_array.push(student);
    //consoleOut('Student Array after push in add ', student_array)
    addStudentToDom(student);
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    //consoleOut('Clearing form');
    $('input').val('');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var sum = null;
    for(var i = 0; i < student_array.length; i++){
        sum += student_array[i]['grade'];
    }
    return Math.floor(sum/student_array.length);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
//todo call update data
function updateData(){
    updateStudentList();
    var average = calculateAverage();
    $('.avgGrade').text(average);
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    for(var i = 0; i < student_array.length; i++){
    addStudentToDom(student_array[i]);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list body
 * @param {Object} studentObj - student data
 */
function addStudentToDom(studentObj){
    var tableRow = $('<tr>');
    var deleteButton = $('<button>',{
        text: 'Delete',
        class: 'btn btn-danger delete'
    });
    var deleteTd = $('<td>').append(deleteButton);
    for(var x in studentObj){
        var tableData = $('<td>',{
            text: studentObj[x]
        });
        tableRow.append(tableData);
    }
    tableRow.append(deleteTd);
    $('tbody').append(tableRow);
}
/**
 * removeStudent = removes student data from student_array
 */
function removeStudent(){
    consoleOut('In removeStudent');
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    clearAddStudentForm();
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
    reset();
    updateStudentList();
    $('tbody').on('click','.delete', function(){
       removeStudent();
        var self = $(this).parent();
        consoleOut('remove button clicked. Parent: ', self, ' ', this);
    });
});

/**
 * console log message and any variables passed
 * allows commenting out one console.log
 * @param {string} msg - message to easily identify intent or location in code blocks
 * @param someVariable - variable to check in console for expected values
 */
function consoleOut(msg, someVariable){
    console.log(msg, someVariable);
}