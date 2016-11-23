(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('formVaccineController', controller);

	function controller(vaccineService) {
		var vm = this;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failInput = false;
		vm.input = input;

		function input() {
			vaccineService.input(vm.name, function(result) {
				if (result) {
					vm.failInput = false;
				}
			});
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();