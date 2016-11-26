(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('inputScheduleController', controller);

	function controller(scheduleService, vaccineService, dataService) {
		var vm = this;
		vm.showBanner = false;
		vm.input = {};
		vm.input.vaccines = [];
		vm.vaccineList = [];
		vm.selectedVaccines = [];
		vm.inputJadwal = inputJadwal;
		vm.closeBox = closeBox;
		vm.update = false;

		initController();

		function initController() {
			// vm.input.date = '';
			// vm.input.location = '';
			// vm.showBanner = false;
			dataService.getSchedule(function(result) {
				if (result) {
					let date = result.schedule_date;
					vm.input.date = new Date(date.slice(0,4), (parseInt(date.slice(5,7)) - 1), date.slice(8,10));
					vm.input.location = result.location;
					vm.input.id = result.id;
					vm.update = true;
				}else{
					vm.update = false;
				}
			});		

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
			if (vm.update) {
					scheduleService.update(vm.input.id, vm.input, function(result) {
						if (result) {
							vm.showBanner = true;
							vm.update = false;
							vm.input.vaccines = [];
							vm.input = {};
						}
					});
			}else{
				scheduleService.insertSchedule(vm.input, function(result) {
					if (result) {
						vm.showBanner = true;
						vm.input.vaccines = [];
						vm.input = {};
					}
				})
			}
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();