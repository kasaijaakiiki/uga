app.factory('books', ['$http', 
 function($http) {
     return $http.get('http://ugpostcodes.org/ugservice.json')
     .success(function(data) {
         return data
     })
     .error(function(err) {
        return err
     })
 }])