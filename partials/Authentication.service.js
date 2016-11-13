(function () {
	'use strict';
	angular
		.module('simuni')
		.factory('authenticationService', service);

	function service($http, $localStorage, $rootScope) {
		var Service = {};

		Service.login = login;
		Service.logout = logout;

		return Service;

		function login(username, password, callback) {
			// to be edited link
			$http.post('localhost:8000/api/authenticate', {username: username, password: password})
				.success(function (response) {
					if (response.code == "SUCCESS_POST") {
						$localStorage.currentUser = {'username': username, 'token': response.content.token};
						$http.defaults.headers.common.Authorization =  'bearer ' + response.content.token;
						$rootScope.isLogin = true;
						callback(true);
					}else{
						callback(false);
					}
				})
		};

		function logout() {
			delete $localStorage.currentUser;
			$http.defaults.headers.common.Authorization = '';
			$rootScope.isLogin = false;
		}
	}

})();