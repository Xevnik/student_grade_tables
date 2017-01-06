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
            addStudents: function(studentData){
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
            deleteStudent: function(studentData){
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
        }
    };
});


app.controller('sgtController', function($log, studentData){
    var scScope = this;
    scScope.student = {};
    scScope.studentList = [];
    var getData = function() {
        $log.log('In update');
        studentData.getStudents()
            .then(
                function (response) {
                    $log.info('Success: ', response);
                    scScope.studentList = response.data.data;
                    $log.info(scScope.studentList);
                },
                function (error) {
                    $log.error('Failure: ', error);
                });
    };
    scScope.addClicked = function(){
        //this.studentList.push(this.student);
        //$log.log(this.studentList);
        scScope.student = {
            name: scScope.student.name,
            course: scScope.student.course,
            grade: scScope.student.grade
        };
        studentData.addStudent(student);
        //$log.log(scScope.student);
        scScope.student = {};
    };
    scScope.cancelClicked = function(){
        scScope.student = {};
    };
    scScope.deleteStudent = function(studentToRemove){
        $log.info('Delete function called');
        $log.log(studentToRemove);
    };

    //initialize
    getData();
});