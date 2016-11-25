(function() {
	'use strict';
	
	angular.module('simuni')
		.factory('bidanService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;
		Service.insertBidan = insertBidan;

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
	}
})();