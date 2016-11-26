(function() {
	'use strict';

	angular
		.module('simuni')
		.factory('scheduleService', service);

	function service($http, $rootScope) {
		var Service = {};

		Service.getAll = getAll;
		Service.getByBidan = getByBidan;
		Service.getByBabyNotDone = getByBabyNotDone;
		Service.getByBabyDone = getByBabyDone;
		Service.getByBabyHistory = getByBabyHistory;
		Service.insertSchedule = insertSchedule;
		Service.insertBabySchedule = insertBabySchedule;
		Service.deleteSchedule = deleteSchedule;
		Service.update = update;

		return Service;

		function getAll(callback) {
			$http.get($rootScope.baseUrl + '/api/schedules')
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBidan(callback) {
			$http.get($rootScope.baseUrl + '/api/schedules/' + $rootScope.id)
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBabyNotDone(callback) {
			$http.get($rootScope.baseUrl + '/api/schedulesNotDone/' + $rootScope.id)
				.success(function(response) {
					if (response.code == "SUCCESS_GET") {
						callback(response.content);
					}else{
						callback(false);
					}
				});
		}

		function getByBabyDone(callback) {
			$http.get($rootScope.baseUrl + '/api/schedulesDone/' + $rootScope.id)
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

		function insertSchedule(schedule, callback) {
			$http.post($rootScope.baseUrl + '/api/schedule', {
				idvaccine: schedule.vaccines,
				scheduledate: schedule.date,
				lokasi: schedule.location,
				idBidan: $rootScope.id
			}).success(function(response) {
				if(response.code == "SUCCESS_POST"){
					callback(true);
				}else{
					callback(false);
				}
			})
		}

		function insertBabySchedule(input, callback) {
			$http.put($rootScope.baseUrl + '/api/schedulesBatch', {
				idSchedule : input.schedule.id,
				date : input.schedule.schedule_date,
				vaccine : input.vaccine,
				babies : input.babies
			}).success(function(response) {
				if (response.code == "SUCCESS_PUT") {
					callback(true);
				}else{
					callback(false);
				}
			})
		}

		function deleteSchedule(id, callback) {
			$http.delete($rootScope.baseUrl + '/api/schedule/' + id)
				.success(function(response) {
					if (response.code == "SUCCESS_DELETE") {
						callback(true);
					}else{
						callback(false);
					}
				})
		}

		function update(id, schedule, callback) {
			$http.put($rootScope.baseUrl + '/api/schedule/' + id, {
				schedule_date : schedule.schedule_date,
				location : schedule.location,
				arrVaccine : schedule.vaccines
			}).success(function(response) {
				if (response.code == "SUCCESS_PUT") {
					callback(true);
				}else{
					callback(false);
				}
			})
		}
	}
})();