(function() {
	'use strict';
	
	angular.module('simuni')
		.factory('babyService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;
		Service.insertBaby = insertBaby;
		Service.getDetail = getDetail;
		Service.update = update;
		Service.deleteBaby = deleteBaby;
		Service.updateParts = updateParts;

		return Service;

		function getAll(callback) {
			$http.get($rootScope.baseUrl + '/api/bayi')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function insertBaby(baby, callback) {
			$http.post($rootScope.baseUrl + '/api/bayi', {
				name : baby.name,
				username : baby.username,
				password : baby.password,
				phone_number : baby.phone_number,
				weight : baby.weight,
				height : baby.height,
				birth_date : baby.birth_date
			}).success(function(response) {
				if (response.code == "SUCCESS_POST") {
					callback(true);
				}else{
					callback(false);
				}
			})
		}

		function getDetail(callback) {
			$http.get($rootScope.baseUrl + '/api/bayi/' + $rootScope.id)
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				})
		}

		function update(baby, callback) {
			$http.put($rootScope.baseUrl + '/api/bayiUpdate/' + $rootScope.id, {
				name : baby.name,
				username : baby.username,
				father_name : baby.father_name,
				mother_name : baby.mother_name,
				phone_number : baby.phone_number,
				weight : baby.weight,
				height : baby.height,
				birth_date : baby.birth_date,
				password : baby.password
			})
				.success(function(response) {
					if (response.code == "SUCCESS_PUT") {
						callback(true);
					}else{
						callback(false);
					}
				})
		}

		function deleteBaby(id, callback) {
			$http.delete($rootScope.baseUrl + '/api/babyDelete/' + id)
				.success(function(response) {
					console.log(response);
					if (response.code == "SUCCESS_DELETE") {
						callback(true);
					}else{
						callback(false);
					}
				})
		}

		function updateParts(baby, callback) {
			$http.put($rootScope.baseUrl + '/api/bayiUpdate/' + baby.id, {
				name : baby.name,
				username : baby.username,
				father_name : baby.father_name,
				mother_name : baby.mother_name,
				phone_number : baby.phone_number,
				weight : baby.weight,
				height : baby.height,
				birth_date : baby.birth_date,
				password : baby.password
			})
				.success(function(response) {
					if (response.code == "SUCCESS_PUT") {
						callback(true);
					}else{
						callback(false);
					}
				})
		}
	}
})();