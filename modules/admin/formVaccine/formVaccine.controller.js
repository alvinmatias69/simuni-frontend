(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('formVaccineController', controller);

	function controller(vaccineService, dataService) {
		var vm = this;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failInput = false;
		vm.input = input;
		vm.update = false;

		getData();

		function input() {
			if (vm.update) {
				vaccineService.update(vm.id, vm.name, function(result) {
					if (result) {
						vm.id = '';
						vm.update = false;
					}
				});
			}else{
				vaccineService.input(vm.name, function(result) {
					if (result) {
					}
				});
			}
			vm.failInput = false;
			vm.name = '';
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}

		function getData() {
			dataService.getVaccine(function(result) {
				if (result) {
					vm.id = result.id;
					vm.name = result.name;
					vm.update = true;
					dataService.setVaccine(null);
				}else{
					vm.update = false;
				}
			})
		}
	}
})();