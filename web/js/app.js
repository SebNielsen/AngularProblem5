var userApp = angular.module('UsersApp', ['ngRoute']);
    userApp.controller("ViewController", [function(){
        var self = this;
        self.title = "Angular Route Demo";
    }]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'allUsers.html',
                    controller: 'UserController'
                })
                .when('/detail/:fname', {
                    templateUrl: 'details.html',
                    controller: 'DetailsController'
                })
                .otherwise({redirectTo: '/'});
    }]);

var users = [];
userApp.controller("UserController", ['$http',function ($http) {
    var self = this;
    $http.get('data/data.json').then(function(res){
        self.users = res.data.users;
    });
}]);

userApp.controller('DetailsController', ['$http', '$routeParams', function($http, $routeParams) {
  var self = this;
  $http.get('data/data.json').then(function(res) {
    for (var i = 0; i < res.data.users.length; i++) {
      if (res.data.users[i].first === $routeParams.fname) {
        self.user = res.data.users[i];
      }
    }
  });
}]);


