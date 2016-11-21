(function () {
	'use strict';

	angular.module('simuni').
		controller('scheduleController', controller);

	function controller($http, scheduleService) {
		var vm = this;

		vm.schedules = [
			{
	            "date":"2016-08-04",
	            "location":"Ciwastra",
	            "midwife":"vina",
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
	            "midwife":"mat",
	            "vaccines":[
	               {
	                  "name":"polio"
	               }
	            ]
	         }
		];
		vm.getData = getData;

		// to be actived later
		// getData();

		function getData() {
			// to be determined url

			// $http.get()
			// 	.success(function (response) {
			// 		vm.schedule = response.content.schedule;
			// 	})
		}
	}
})();