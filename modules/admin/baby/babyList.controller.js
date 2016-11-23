(function() {
	'use strict';

	angular.module('simuni')
		.controller('babyListController', controller);

	function controller(babyService) {
		var vm = this;

		vm.babyList = [];

		getData();

		function getData() {
			babyService.getAll(function(result) {
				if (result) {
					vm.babyList = result;
				}
			});
		}
	}
})();