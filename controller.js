/**
 * Created by kevin on 11/13/16.
 */
var app = angular.module('sgtApp', [])
.controller('sgtController', function($log){
    this.studentList = [];
    this.student = {};
}).service('studentService', function($http, $log){
    this.getStudents = function(){
        $http({
           method: 'GET',
           url:
        dat
        });
    }
    });