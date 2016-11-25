(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('inputBabyController', controller);

	function controller(babyService) {
		var vm = this;
		vm.input = {};
		vm.insert = insert;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failInsert = false;

		function insert() {
			if (vm.input.password != vm.input.passwordConf) {
				vm.failInsert = true;
			}else{
				babyService.insertBaby(vm.input, function(result) {
					if (result) {
						vm.failInsert = false;
						vm.input = {};
					}
				});
			}
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();