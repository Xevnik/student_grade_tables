/**
 * Created by kevin on 11/13/16.
 */
var app = angular.module('sgtApp', []);

app.provider('studentData', function(){
    var dataScope = this;
    dataScope.apiUrl = '';
    dataScope.apiKey = '';
    dataScope.$get = function($http, $q, $log){
        return {
            getStudents: function(){
                var defer = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'POST',
                    url: dataScope.apiUrl + 'get',
                    dataType: 'JSON',
                    data: $.param({api_key: dataScope.apiKey})
                })
                    .then(
                        function(resp){
                            $log.info('success');
                            defer.resolve(resp);
                        },
                        function(err){
                            $log.warn('error');
                            defer.reject(err);
                        });
                return defer.promise;
            },
            addStudent: function(studentData){
                var data = studentData;
                data['api_key'] = dataScope.apiKey;
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: dataScope.apiUrl + 'create',
                    dataType: 'JSON',
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(
                        function(resp){
                            $log.info('success');
                            defer.resolve(resp);
                        },
                        function(err){
                            $log.warn('error');
                            defer.reject(err);
                        });
                return defer.promise;
            },
            deleteStudent: function(studentID){
                var data = {
                    student_id: studentID,
                    api_key: dataScope.apiKey
                };
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: dataScope.apiUrl + 'delete',
                    dataType: 'JSON',
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(
                        function(resp){
                            $log.info('success');
                            defer.resolve(resp);
                        },
                        function(err){
                            $log.warn('error');
                            defer.reject(err);
                        });
                return defer.promise;
            },
        }
    };
});


app.controller('sgtController', function($log, studentData){
    var scScope = this;
    scScope.student = {};
    scScope.studentList = [];
    scScope.GPA = 0;
    /**
     * Updates student list with list from DB
     */
    var getData = function() {
        $log.log('In update');
        studentData.getStudents()
            .then(
                function (response) {
                    $log.info('Success: ', response);
                    scScope.studentList = response.data.data;
                    calculateGPA(scScope.studentList);
                },
                function (error) {
                    $log.error('Failure: ', error);
                });
    };
    /**
     * calculate GPA for collective students
     * @param students [obj- list of student to calculate GPA
     */
    var calculateGPA = function(students){
        var totalGrades = students.reduce(
            (total, student) => {return total + student.grade;}, 0
        );
        scScope.GPA = totalGrades/students.length;
    };
    /**
     * add student to DB and update view
     */
    scScope.addClicked = function(){
        //this.studentList.push(this.student);
        //$log.log(this.studentList);
        scScope.student = {
            name: scScope.student.name,
            course: scScope.student.course,
            grade: scScope.student.grade
        };
        studentData.addStudent(scScope. student).then(
            function(resp){
                $log.log(resp);
                getData();
            },
            function(error){
                $log.error('Could not add student: ', error);
            });
        //$log.log(scScope.student);
        scScope.student = {};
    };
    /**
     * Clear data in form
     */
    scScope.cancelClicked = function(){
        scScope.student = {};
    };
    /**
     * Remove student from DB
     * @param studentToRemove
     */
    scScope.deleteStudent = function(studentToRemove){
        $log.log(studentToRemove);
        studentData.deleteStudent(studentToRemove.id).then(
            function(resp){
                $log.log(resp);
                getData();
            },
            function(err){
                $log.error('Failed, err');
            });
    };


    //initialize
    getData();
});