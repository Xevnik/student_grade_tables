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
            callApi: function(){
                var data = 'api_key=' + dataScope.apiKey;
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: dataScope.apiUrl,
                    dataType: 'JSON',
                    data: data,
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
            }
        }
    };
});


app.controller('sgtController', function($log, $window, studentData){
    var scScope = this;
    scScope.student = {};
    scScope.studentList = [];
    $window.onload = function() {
        $log.log('In update');
        studentData.callApi()
            .then(
                function (response) {
                    $log.info('Success: ', response);
                    scScope.studentList = response.data.data;
                },
                function (error) {
                    $log.warn('Failure: ', error);
                });
    };
    scScope.addClicked = function(){
        //this.studentList.push(this.student);
        $log.log(this.studentList);
        scScope.student = {};
    };
    scScope.cancelClicked = function(){
        scScope.student = {};
    };
});