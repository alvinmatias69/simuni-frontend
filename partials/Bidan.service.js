(function() {
	'use strict';
	
	angular.module('simuni')
		.factory('bidanService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;

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
	}
})();