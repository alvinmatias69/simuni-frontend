(function() {
	'use strict';
	
	angular.module('simuni')
		.factory('userService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getUser = getUser;
		Service.updateUser = updateUser;

		return Service;

		function getUser(callback) {
			$http.get($rootScope.baseUrl + '/api/users/' + $rootScope.id)
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function updateUser(user, callback) {
			$http.put($rootScope.baseUrl + '/api/users/' + $rootScope.id, {
				username:user.username,
				password:user.password,
				name:user.name,
				phone_number:user.phone_number,
				type:user.type
			})
				.success(function(response) {
					if (response.code == "SUCCESS_PUT") {
						callback(true);
					}else{
						callback(false);
					}
				});
		}

	}
})();