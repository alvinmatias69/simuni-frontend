(function() {
	angular
		.module('simuni')
		.controller('babyHistoryController', controller);

	function controller(scheduleService, $rootScope) {
		var vm = this;

		// vm.number = 1;
		vm.schedules = [];

		// getData();

		function getData() {
			scheduleService.getByBabyDone(function(result) {
				if (result) {
					vm.schedules = result;
				}
			});
		}
	}
})();