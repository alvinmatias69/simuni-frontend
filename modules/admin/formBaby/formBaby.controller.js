(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('formBabyController', controller);

	function controller(babyService, dataService) {
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
					vm.input.father_name = '';
					vm.input.mother_name = '';
					babyService.updateParts(vm.input, function(result) {
						if (result) {
							vm.update = false;
						}
					})
				}else{
					babyService.insertBaby(vm.input, function(result) {
						if (result) {
						}
					});
				}
				vm.failInsert = false;
				vm.input = {};
			}
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}

		function getData() {
			dataService.getBaby(function(result) {
				if (result) {
					vm.input.name = result.name;
					vm.input.username = result.username;
					vm.input.phone_number = parseInt(result.phone_number);
					vm.input.weight = parseInt(result.baby.weight);
					vm.input.height = parseInt(result.baby.height);
					vm.input.id = result.id;
					let date = result.baby.birth_date;
					// vm.input.birth_date = date.slice(5,7) + '/' + date.slice(8,10) + '/' + date.slice(0,4);
					vm.input.birth_date = new Date(date.slice(0,4), (parseInt(date.slice(5,7)) - 1), date.slice(8,10));
					dataService.setBaby(null);
					vm.update = true;
				}else{
					vm.update = false;
				}
			})
		}
	}
})();