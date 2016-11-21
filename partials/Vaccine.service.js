(function() {
	'use strict';

	angular
		.module('simuni')
		.factory('vaccineService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;

		return Service;

		function getAll(callback) {
			// to be set url
			$http.get($rootScope.baseUrl + '/api/')
				.success(function (response) {
					if (response.status == 'SUCCESS_GET') {
						callback(response.content.vaccines);
					}else{
						callback(false);
					}
				})
		}
	}
})();