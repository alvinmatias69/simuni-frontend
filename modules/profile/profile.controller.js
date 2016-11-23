(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('profileController', controller);

	function controller(userService) {
		var vm = this;
		vm.input = {};
		vm.update = update;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failUpdate = false;

		getData();

		function getData() {
			userService.getUser(function(result) {
				if (result) {
					vm.input = result;
					vm.input.phone_number = parseInt(vm.input.phone_number);
				}
			});
		}

		function update() {
			if (vm.input.password != vm.input.passwordConf) {
				vm.failUpdate = true;
			}else{
				userService.updateUser(vm.input, function(result) {
					if (result) {
						vm.failUpdate = false;
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