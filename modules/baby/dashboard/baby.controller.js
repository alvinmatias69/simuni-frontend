(function() {
	angular
		.module('simuni')
		.controller('babyDashboardController', controller);

	function controller(scheduleService, $rootScope) {
		var vm = this;

		vm.number = 1;
		vm.schedules = [
			{
	            "date":"2016-08-04",
	            "location":"Ciwastra",
	            "vaccines":[
	               {
	                  "name":"polio"
	               },
	               {
	                  "name":"tetanus"
	               }
	            ]
	         },
	         {
	            "date":"2016-05-14",
	            "location":"Cipaganti",
	            "vaccines":[
	               {
	                  "name":"polio"
	               }
	            ]
	         }
		];

		vm.getData = getData;

		// getData();

		function getData() {
			// to be determined url
			scheduleService.getByBaby($rootScope.id, function(result) {
				if (result) {
					vm.schedules = result;
				}
			});
		}
	}
})();