(function () {
	'use strict';

	angular.module('simuni', ['ui.router', 'ngMessages', 'ngStorage', 'ngRoute'])
		.config(config)
		.run(run);

	function config($stateProvider) {
		
		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl:'modules/login/login.html'
			})
			.state('dashboard', {
				url: '/',
				templateUrl: 'modules/bidan/bidan.html'
			});

	};

	function run($rootScope, $http, $location, $localStorage, authenticationService, $state) {

		$rootScope.logout = function () {
			authenticationService.logout();
		}

		// $rootScope.sideBar = "overflow: hidden; outline: none; margin-left: -210px;";
		$rootScope.sideBar = true;
		$rootScope.toggleSidebar = function () {
			$rootScope.sideBar = !$rootScope.sideBar;
			console.log($rootScope.sideBar);
		}

		$rootScope.isLogin = false;

		if ($localStorage.currentUser) {
			$http.defaults.headers.common.Authorization =  'bearer ' + $localStorage.currentUser.token;
			$rootScope.isLogin = true;
			$rootScope.username = $localStorage.currentUser.username;
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			var publicPages = ['/login'];
			var restrictedPage = publicPages.indexOf($location.path()) === -1;
			if (restrictedPage && !$localStorage.currentUser) {
				$state.go('login');
				// $rootScope.isLogin = true;
			}

			if ($localStorage.currentUser && $location.path('/login')) {
				$state.go('dashboard');
			}
		})
	}
})();