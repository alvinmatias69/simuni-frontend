(function() {
	'use strict';

	angular
		.module('simuni')
		.factory('scheduleService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;
		Service.getByBidan = getByBidan;
		Service.getByBaby = getByBaby;
		Service.getByBabyHistory = getByBabyHistory;

		return Service;

		function getAll(callback) {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/schedules')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBidan(id, callback) {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBaby(id, callback) {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBabyHistory(id, callback) {
			// to be implement
			$http.get($rootScope.baseUrl + '/api/')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}
	}
})();