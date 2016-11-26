(function() {
	'use strict';

	angular.module('simuni')
		.controller('babyListController', controller);

	function controller(dataService, babyService, $state) {
		var vm = this;

		vm.babyList = [];
		vm.deleteBaby = deleteBaby;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.editBaby = editBaby;

		getData();

		function getData() {
			babyService.getAll(function(result) {
				if (result) {
					vm.babyList = result;
				}
			});
		}

		function deleteBaby(baby) {
			babyService.deleteBaby(baby.id, function(result) {
				if (result) {
					vm.showBanner = true;
				}
			});
			vm.babyList.splice(vm.babyList.indexOf(baby),1);
		}		

		function closeBox() {
			vm.showBanner = false;
		}

		function editBaby(baby) {
			dataService.setBaby(baby);
			$state.go('admin/baby/form');
		}
	}
})();