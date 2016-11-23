(function () {
	'use strict';

	angular.module('simuni').
		controller('scheduleController', controller);

	function controller($http, scheduleService) {
		var vm = this;

		vm.schedules = [];
		vm.getData = getData;

		// to be actived later
		getData();

		function getData() {
			scheduleService.getAll(function(result) {
				console.log(result);
				if (result) {
					vm.schedules = result;
					console.log(result);
				}
			});
		}
	}
})();