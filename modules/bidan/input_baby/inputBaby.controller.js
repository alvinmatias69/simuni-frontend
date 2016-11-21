(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('inputBabyController', controller);

	function controller() {
		var vm = this;
		vm.input = {};
		vm.inputBaby = inputBaby;
		vm.closeBox = closeBox;
		vm.showBanner = false;

		function inputBaby() {
			vm.input = {};
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();