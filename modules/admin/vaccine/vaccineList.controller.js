(function() {
	'use strict';

	angular.module('simuni')
		.controller('vaccineListController', controller);

	function controller(vaccineService, dataService, $state) {
		var vm = this;

		vm.vaccineList = [];
		vm.deleteVaccine = deleteVaccine;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.update = update;

		getData();

		function getData() {
			vaccineService.getAll(function(result) {
				if (result) {
					vm.vaccineList = result;
				}
			});
		}

		function deleteVaccine(vaccine) {
			vaccineService.deleteVaccine(vaccine.id, function(result) {
				if (result) {
					vm.showBanner = true;
				}
			});
			vm.vaccineList.splice(vm.vaccineList.indexOf(vaccine),1);
		}		

		function closeBox() {
			vm.showBanner = false;
		}

		function update(vaccine) {
			dataService.setVaccine(vaccine);
			$state.go('admin/vaccine/form');
		}
	}
})();