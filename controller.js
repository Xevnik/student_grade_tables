/**
 * Created by kevin on 11/13/16.
 */
var app = angular.module('sgtApp', [])
    .controller('sgtController', function($log,studentService){
        this.studentList = studentService.getStudents();
        this.student = {};
        this.addClicked = function(){
            //this.studentList.push(this.student);
            $log.log(this.studentList);
            this.student = {};
        };
        this.cancelClicked = function(){
            this.student = {};
        };
    })
    .service('studentService', function($http, $log){
        this.data = {'api_key':'Mmkxjt1mxT'};
        this.getStudents = function(){
            var list;
            $http({
                method: 'POST',
                url: 'https://s-apis.learningfuze.com/sgt/get',
                dataType: 'JSONP',
                data: this.data
            })
                .then(
                    function(response){
                        $log.info('Success: ', response);
                        list = response;
                    },
                    function(error){
                        $.log.warn('Failure: ', error);
                        list = error;
                    });
        };
        this.addStudent = function(){

        };
    });
