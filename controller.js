/**
 * Created by kevin on 11/13/16.
 */
var app = angular.module('sgtApp', [])
    .controller('sgtController', function($log){
        this.studentList = [];
        this.student = {};
    })
    .service('studentService', function($http, $log){
        this.data = {'api_key':'Mmkxjt1mxT'};
        this.getStudents = function(){
            var list;
            $http({
                method: 'POST',
                url: 'https://s-apis.learningfuze.com/sgt/get',
                dataType: 'JSON',
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
        }
    });
