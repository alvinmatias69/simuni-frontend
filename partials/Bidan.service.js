(function() {
	'use strict';
	
	angular.module('simuni')
		.factory('bidanService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;
		Service.insertBidan = insertBidan;
		Service.deleteBidan = deleteBidan;
		Service.updateBidan = updateBidan;

		return Service;

		function getAll(callback) {
			$http.get($rootScope.baseUrl + '/api/bidan')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function insertBidan(bidan, callback) {
			$http.post($rootScope.baseUrl + '/api/users', {
				username: bidan.username,
				password: bidan.password,
				name: bidan.name,
				phone_number: bidan.phone_number,
				type: 'bidan'
			}).success(function(response) {
				if (response.code == "SUCCESS_POST") {
					callback(true);
				} else {
					callback(false);
				}
			});
		}

		function deleteBidan(id, callback) {
			$http.delete($rootScope.baseUrl + '/api/users/' + id)
				.success(function(response) {
					if (response.code == "SUCCESS_DELETE") {
						callback(true);
					} else{
						callback(false);
					}
				});
		}

		function updateBidan(bidan, callback) {
			$http.put($rootScope.baseUrl + '/api/users/' + bidan.id, {
				username:bidan.username,
				password:bidan.password,
				name:bidan.name,
				phone_number:bidan.phone_number,
				type:bidan.type
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