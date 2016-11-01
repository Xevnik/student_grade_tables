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
    //consoleOut('cancel has been clicked');
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
    addStudentToDB(student);
}
function addStudentToDB(newStudent){
    var dataToSend = newStudent;
    dataToSend['api_key'] = 'Mmkxjt1mxT';
    $.ajax({
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/sgt/create',
        data: dataToSend,
        dataType: 'JSON',
        success: function(response){
            consoleOut(response.success, response.new_id);
            if(response.success){
                //adds DB generated Id to student object
                newStudent['id'] = response.new_id;
                student_array.push(newStudent);
                updateData();
            }else{
                alert('Failed to add');
                console.log(response['errors']);
            }
        }
    });
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
    for (var i = 0; i < student_array.length; i++){
        addStudentToDom(student_array[i], i);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list body
 * @param {Object} studentObj - student data
 */
function addStudentToDom(studentObj, index){
    var $tableRow = $('<tr>');
    var $deleteButton = $('<button>',{
        text: 'Delete',
        class: 'btn btn-danger delete',
        id: index
    });
    //keeps DB id with data location in the DOM
    inputIds[index] = studentObj['id'];
    var $deleteTd = $('<td>').append($deleteButton);
    var $name = $('<td>').text(studentObj.name);
    var $course = $('<td>').text(studentObj.course);
    var $grade = $('<td>').text(studentObj.grade);
    $tableRow.append($name, $course, $grade, $deleteTd);
    $('tbody').append($tableRow);
}
/**
 * removeStudent = removes student data from student_array
 * @param {number} index - index location of ID of student data on DB
 */
function removeStudent(index){
    //create object to send to DB
    consoleOut('Index of ID to be removed', index);
    var dataToDelete = {
        api_key: 'Mmkxjt1mxT',
        student_id: inputIds[index]
    };
    $.ajax({
        dataType: 'JSON',
        data: dataToDelete,
        url: 'https://s-apis.learningfuze.com/sgt/delete',
        method: 'POST',
        success: function(response){
            if(response.success) {
                var x = student_array.splice(index, 1);
                inputIds.splice(index, 1);
                consoleOut('Removing: ', x);
                updateData();
            }else{
                alert('Failed to delete');
                console.log(response['errors']);
            }
        }
    })
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
                var arrayFromDB = response.data;
                consoleOut('From DB', arrayFromDB);
                for(var i = 0; i < arrayFromDB.length; i++){
                    student_array.push(arrayFromDB[i]);
                }
                updateData();
            }else{
                alert('Failed to get data');
                console.log(response.errors);
            }
        }
    });
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

function serverAccessFailed(){

}