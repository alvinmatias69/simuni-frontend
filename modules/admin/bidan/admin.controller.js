(function() {
	'use strict';

	angular.module('simuni')
		.controller('adminController', controller);

	function controller(bidanService, dataService, $state) {
		var vm = this;

		vm.bidanList = [];
		vm.deleteBidan = deleteBidan;
		vm.closeBox = closeBox;
		vm.showBanner = false;
		vm.editBidan = editBidan;

		getData();

		function getData() {
			bidanService.getAll(function(result) {
				if (result) {
					vm.bidanList = result;
				}
				vm.showBanner = false;
			});
		};

		function deleteBidan(bidan) {
			bidanService.deleteBidan(bidan.id, function(result) {
				if (result) {
					vm.showBanner = true;
				}
			});
			vm.bidanList.splice(vm.bidanList.indexOf(bidan),1);
		}		

		function closeBox() {
			vm.showBanner = false;
		}

		function editBidan(bidan) {
			dataService.setBidan(bidan);
			$state.go('admin/bidan/form');
		}
	}
})();