(function () {
	'use strict';

	angular.module('simuni').
		controller('scheduleController', controller);

	function controller($http, scheduleService) {
		var vm = this;

		vm.schedules = [];
		vm.getData = getData;

		getData();

		function getData() {
			scheduleService.getAll(function(result) {
				if (result) {
					vm.schedules = result;
				}
			});
		}
	}
})();