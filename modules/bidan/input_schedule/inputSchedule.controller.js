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
		vm.vaccineList = [
			{
				id:1,
				name:"polio"
			},
			{
				id:2,
				name:"tetanus"
			}
		];
		vm.selectedVaccines = [];
		vm.inputJadwal = inputJadwal;
		vm.closeBox = closeBox;

		initController();

		function initController() {
			vm.input.date = '';
			vm.input.location = '';
			vm.showBanner = false;
			// to be implemented
			// vaccineService.getAll(function (result) {
			// 	if (result) {
			// 		vm.vaccineList = result;
			// 	}
			// })
		}

		function inputJadwal() {
			for (var i = 0; i < vm.selectedVaccines.length; i++) {
				vm.input.vaccines.push(vm.selectedVaccines[i]);
			}
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();