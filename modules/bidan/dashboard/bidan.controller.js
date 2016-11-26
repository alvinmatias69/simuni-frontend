(function() {
	angular
		.module('simuni')
		.controller('bidanDashboardController', controller);

	function controller(scheduleService, $rootScope, dataService, $state) {
		var vm = this;

		vm.number = 1;
		vm.schedules = [];
		vm.deleteSchedule = deleteSchedule;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.editSchedule = editSchedule;

		vm.getData = getData;

		getData();

		function getData() {
			scheduleService.getByBidan(function(result) {
				if (result) {
					vm.schedules = result;
				}
			});
		}

		function deleteSchedule(schedule) {
			scheduleService.deleteSchedule(schedule.id, function(result) {
				if (result) {
					vm.showBanner = true;
				}
			});
			vm.schedules.splice(vm.schedules.indexOf(schedule),1);
		}

		function closeBox() {
			vm.showBanner = false;
		}

		function editSchedule(schedule) {
			dataService.setSchedule(schedule);
			$state.go('bidan/schedule');
		}
	}
})();