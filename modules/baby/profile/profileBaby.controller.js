(function() {
	'use strict';

	angular
		.module('simuni')
		.controller('profileBabyController', controller);

	function controller(babyService) {
		var vm = this;
		vm.input = {};
		vm.update = update;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.failUpdate = false;

		getData();

		function getData() {
			babyService.getDetail(function(result) {
				if (result) {
					vm.input.name = result.user.name; 
					vm.input.username = result.user.username;
					vm.input.father_name = result.father_name;
					vm.input.mother_name = result.mother_name;
					vm.input.phone_number = parseInt(result.user.phone_number);
					vm.input.weight = result.weight;
					vm.input.height = result.height;
					vm.input.birth_date = new Date(result.birth_date);
				}
			});
		}

		function update() {
			if (vm.input.password != vm.input.passwordConf) {
				vm.failUpdate = true;
			}else{
				babyService.update(vm.input, function(result) {
					if (result) {
						vm.failUpdate = false;
					}
				})
			}
			vm.showBanner = true;
		}

		function closeBox() {
			vm.showBanner = false;
		}
	}
})();