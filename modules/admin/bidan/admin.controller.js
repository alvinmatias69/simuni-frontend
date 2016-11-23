(function() {
	'use strict';

	angular.module('simuni')
		.controller('adminController', controller);

	function controller(bidanService) {
		var vm = this;

		vm.bidanList = [];

		getData();

		function getData() {
			bidanService.getAll(function(result) {
				if (result) {
					vm.bidanList = result;
				}
			});
		}
	}
})();