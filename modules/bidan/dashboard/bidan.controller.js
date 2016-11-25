(function() {
	angular
		.module('simuni')
		.controller('bidanDashboardController', controller);

	function controller(scheduleService, $rootScope) {
		var vm = this;

		vm.number = 1;
		vm.schedules = [];

		vm.getData = getData;

		getData();

		function getData() {
			scheduleService.getByBidan(function(result) {
				if (result) {
					vm.schedules = result;
				}
			});
		}
	}
})();