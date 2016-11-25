(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('inputScheduleController', controller);

	function controller(scheduleService, vaccineService) {
		var vm = this;
		vm.showBanner;
		vm.input = {};
		vm.input.vaccines = [];
		vm.vaccineList = [];
		vm.selectedVaccines = [];
		vm.inputJadwal = inputJadwal;
		vm.closeBox = closeBox;

		initController();

		function initController() {
			vm.input.date = '';
			vm.input.location = '';
			vm.showBanner = false;
			vaccineService.getAll(function (result) {
				if (result) {
					vm.vaccineList = result;
				}
			})
		}

		function inputJadwal() {
			for (var i = 0; i < vm.selectedVaccines.length; i++) {
				if (vm.selectedVaccines[i] != undefined) {
					vm.input.vaccines.push(vm.selectedVaccines[i]);
				}
			}
			vm.input.vaccines = '['+vm.input.vaccines.toString()+']';
			scheduleService.insertSchedule(vm.input, function(result) {
				if (result) {
					vm.showBanner = true;
					vm.input.vaccines = [];
					vm.input = {};
				}
			})
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();