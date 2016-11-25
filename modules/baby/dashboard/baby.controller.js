(function() {
	angular
		.module('simuni')
		.controller('babyDashboardController', controller);

	function controller(scheduleService, $rootScope) {
		var vm = this;

		vm.schedules = [];

		getData();

		function getData() {
			scheduleService.getByBabyNotDone(function(result) {
				if (result) {
					vm.schedules = result;
				}
			});
		}
	}
})();