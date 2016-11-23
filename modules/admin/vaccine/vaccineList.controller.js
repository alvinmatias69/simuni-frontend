(function() {
	'use strict';

	angular.module('simuni')
		.controller('vaccineListController', controller);

	function controller(vaccineService) {
		var vm = this;

		vm.vaccineList = [];

		getData();

		function getData() {
			vaccineService.getAll(function(result) {
				if (result) {
					vm.vaccineList = result;
				}
			});
		}
	}
})();