(function() {
	'use strict';

	angular
		.module('simuni')
		.factory('vaccineService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;
		Service.input = input;
		Service.deleteVaccine = deleteVaccine;
		Service.update = update;

		return Service;

		function getAll(callback) {
			$http.get($rootScope.baseUrl + '/api/vaksin')
				.success(function (response) {
					if (response.code == 'SUCCESS_GET') {
						callback(response.content);
					}else{
						callback(false);
					}
				})
		}

		function input(name, callback) {
			$http.post($rootScope.baseUrl + '/api/vaksin', {
				name: name
			}).success(function(response) {
				if (response.code == 'SUCCESS_POST') {
					callback(true);
				}else{
					callback(false);
				}
			})
		}

		function deleteVaccine(id, callback) {
			$http.delete($rootScope.baseUrl + '/api/vaksin/' + id)
				.success(function(response) {
					if (response.code == 'SUCCESS_DELETE') {
						callback(true);
					}else{
						callback(false);
					}
				})
		}

		function update(id, name, callback) {
			$http.put($rootScope.baseUrl + '/api/vaksin/' + id, {
				name:name
			}).success(function(response) {
				if (response.code == 'SUCCESS_PUT') {
					callback(true);
				}else{
					callback(false);
				}
			})
		}
	}
})();