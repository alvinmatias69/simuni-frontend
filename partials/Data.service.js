(function() {
	
	angular
		.module('simuni')
		.factory('dataService', service);

	function service() {
		var Service = {};

		Service.setBidan = setBidan;
		Service.getBidan = getBidan;
		Service.bidan = null;

		Service.setBaby = setBaby;
		Service.getBaby = getBaby;
		Service.baby = null;

		Service.setVaccine = setVaccine;
		Service.getVaccine = getVaccine;
		Service.vaccine = null;

		Service.setSchedule = setSchedule;
		Service.getSchedule = getSchedule;
		Service.schedule = null;

		return Service;

		function setBidan(bidan) {
			Service.bidan = bidan;
		}

		function getBidan(callback) {
			callback(Service.bidan);
		}

		function setBaby(baby) {
			Service.baby = baby;
		}

		function getBaby(callback) {
			callback(Service.baby);
		}

		function setVaccine(vaccine) {
			Service.vaccine = vaccine;
		}

		function getVaccine(callback) {
			callback(Service.vaccine);
		}

		function setSchedule(schedule) {
			Service.schedule = schedule;
		}

		function getSchedule(callback) {
			callback(Service.schedule);
		}
	}
})();