(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('profileBabyController', controller);

	function controller() {
		var vm = this;
		vm.input = {};
		vm.update = update;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failUpdate = false;

		function update() {
			if (vm.input.password != vm.input.passwordConf) {
				vm.failUpdate = true;
			}else{
				vm.failUpdate = false;
			}
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();