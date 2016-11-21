(function() {
	'use strict';

	angular
		.module('simuni')
		.factory('scheduleService', service);

	function service($http) {
		var Service = {};

		Service.getAll = getAll;
		Service.getByBidan = getByBidan;
		Service.getByVaccines = getByVaccines;

		return Service;

		function getAll() {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/')
				.success(function(response) {
					if (response.status == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBidan(id) {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/')
				.success(function(response) {
					if (response.status == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByVaccines(arrVaccines) {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/')
				.success(function(response) {
					if (response.status == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}
	}
})();