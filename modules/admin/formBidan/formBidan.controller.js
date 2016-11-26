(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('formBidanController', controller);

	function controller(bidanService, dataService, userService) {
		var vm = this;
		vm.input = {};
		vm.insert = insert;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failInsert = false;
		vm.update = false;

		getData();

		function insert() {
			if (vm.input.password != vm.input.passwordConf) {
				vm.failInsert = true;
			}else{
				if (vm.update) {
					bidanService.updateBidan(vm.input, function(result) {
						if (result) {
							vm.update = false;
							vm.failInsert = false;
						}
					});
				}else{
					bidanService.insertBidan(vm.input, function(result) {
						if (result) {
							vm.failInsert = false;
						}
					});
				}
				vm.input = {};
			}
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}

		function getData() {
			dataService.getBidan(function(result) {
				if (result) {
					vm.input = result;
					vm.input.phone_number = parseInt(result.phone_number);
					dataService.setBidan(null);
					vm.update = true;
				}else{
					vm.update = false;
				}
			})
		}
	}
})();