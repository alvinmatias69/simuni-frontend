(function() {
	'use strict';
	
	angular
		.module('simuni')
		.controller('loginController', controller);

	function controller(authenticationService, $localStorage, $rootScope, $state, $http) {
		var vm = this;

		vm.login = login;
		vm.username = '';
		vm.password = '';
		vm.failLogin = false;
		vm.closeBox = closeBox;

		function login() {
			authenticationService.login(vm.username, vm.password, function (result) {
				if (result) {
					$localStorage.currentUser = {};
					$localStorage.currentUser.type = result.type;
					$localStorage.currentUser.token = 'bearer ' + result.token;
					$localStorage.currentUser.id = result.id;
					$localStorage.currentUser.name = result.name;
					$localStorage.currentUser.urlFoto = result.urlFoto;
					$http.defaults.headers.common.Authorization =  'bearer ' + result.token;
					$rootScope.isLogin = true;
					$rootScope.type = result.type;
					$rootScope.name = result.name;
					$rootScope.id = result.id;
					$rootScope.urlFoto = result.urlFoto;
					if (result.type == 'bidan') {
						$state.go('bidan');
					}else if(result.type == 'admin'){
						$state.go('admin');
					}else{
						$state.go('baby');
					}
				}else{
					vm.failLogin = true;
				}
			})
		}

		function closeBox() {
			vm.failLogin = false;
		}
	}

})();