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
    if(enteredName== '' || enteredCourse== '' || enteredGrade== ''){
        //disallow empty fields submits
        return;
    }
    var student = {
        name: enteredName,
        course: enteredCourse,
        grade: enteredGrade
    };
    //consoleOut('Student obj ', student);
    student_array.push(student);
    updateData();
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
        sum += parseFloat(student_array[i]['grade']);
    }
    if(student_array.length===0){
        return 0;
    }
    return Math.floor(sum/student_array.length);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    updateStudentList();
    var average = calculateAverage();
    $('.avgGrade').text(average);
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    $('tbody').html('');
    for (var i = 0; i < student_array.length; i++) {
        inputIds.push(i);
        addStudentToDom(student_array[i]);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list body
 * @param {Object} studentObj - student data
 */
function addStudentToDom(studentObj){
    var $tableRow = $('<tr>');
    var $deleteButton = $('<button>',{
        text: 'Delete',
        class: 'btn btn-danger delete',
        id: inputIds[inputIds.length-1]
    });
    var $deleteTd = $('<td>').append($deleteButton);
    var $name = $('<td>').text(studentObj.name);
    var $course = $('<td>').text(studentObj.course);
    var $grade = $('<td>').text(studentObj.grade);
    $tableRow.append($name, $course, $grade, $deleteTd);
    $('tbody').append($tableRow);
}
/**
 * removeStudent = removes student data from student_array
 * @param {number} index - Id of button of student object
 */
function removeStudent(index){
    consoleOut('Index of object to be removed', index);
    var x = student_array.splice(index, 1);
    inputIds.splice(index, 1);
    consoleOut('Removing: ', x);
    updateData();
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array = [];
    inputIds = [];
    $.ajax({
        dataType: 'JSON',
        data: {api_key: 'Mmkxjt1mxT'},
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        success: function(response){
            if(response.success){
                consoleOut('success!!');
                //consoleOut('Data', response.data);
                //student_array = student_array.concat(response.data);
                for(var i = 0; i < response.data.length; i++){
                    student_array.push(response.data[i]);
                }
                updateData();
            }
        }
    });
    //todo record IDs to global
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(documentReady);

function documentReady(){
    reset();
    $('tbody').on('click','.delete', function(){
        var buttonId = $(this).attr('id');
        removeStudent(buttonId);
    });
}
/**
 * console log message and any variables passed
 * allows commenting out one console.log
 * @param {string} msg - message to easily identify intent or location in code blocks
 * @param someVariable - variable to check in console for expected values
 */
function consoleOut(msg, someVariable){
    console.log(msg, someVariable);
}