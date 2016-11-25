(function() {
	'use strict';

	angular.module('simuni')
		.controller('recordController', controller);

	function controller(scheduleService, babyService, vaccineService) {
		var vm = this;
		vm.schedules = [];
		vm.babies = [];
		vm.vaccines = [];
		vm.input = {};
		vm.inputData = inputData;
		vm.closeBox = closeBox;

		getData();

		function getData() {
			vm.showBanner = false;

			scheduleService.getAll(function(result) {
				if (result) {
					vm.schedules = result;
				}
			});

			babyService.getAll(function(result) {
				if (result) {
					vm.babies = result;
				}
			});

			vaccineService.getAll(function(result) {
				if (result) {
					vm.vaccines = result;
				}
			});
		}

		function closeBox() {
			vm.showBanner = false;
		}

		function inputData() {
			scheduleService.insertBabySchedule(vm.input, function(result) {
				if(result){
					vm.showBanner = true;
					vm.input = {};
				}
			})
		}
	}
})();