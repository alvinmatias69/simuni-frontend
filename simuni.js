(function () {
	'use strict';

	angular.module('simuni', ['ui.router', 'ngMessages', 'ngStorage', 'ngRoute'])
		.config(config)
		.run(run);

	function config($stateProvider) {
		
		$stateProvider
			.state('schedule', {
				url:'/',
				templateUrl: 'modules/schedule/schedule.html',
				controller: 'scheduleController',
				controllerAs: 'vm'
			})
			.state('login', {
				url:'/login',
				templateUrl:'modules/login/login.html',
				controller: 'loginController',
				controllerAs: 'vm'
			})
			.state('bidan', {
				url: '/bidan',
				templateUrl: 'modules/bidan/dashboard/dashboard.html',
				controller: 'bidanDashboardController',
				controllerAs: 'vm',
				data:{
					state:"dashboard"
				}
			})
			.state('bidan/schedule', {
				url: '/bidan/schedule',
				templateUrl: 'modules/bidan/input_schedule/schedule.html',
				controller: 'inputScheduleController',
				controllerAs: 'vm',
				data:{
					state:"schedule"
				}
			})
			.state('bidan/baby', {
				url: '/bidan/baby',
				templateUrl: 'modules/bidan/input_baby/baby.html',
				controller: 'inputBabyController',
				controllerAs: 'vm',
				data:{
					state:"baby"
				}
			});

	};

	function run($rootScope, $http, $location, $localStorage, authenticationService, $state) {

		$rootScope.logout = function () {
			authenticationService.logout();
			$state.go('schedule');
		}
		$rootScope.isLogin = false;

		$rootScope.sideBar = true;
		$rootScope.toggleSidebar = function () {
			$rootScope.sideBar = !$rootScope.sideBar;
		}


		$rootScope.baseUrl = 'http://localhost:8000';

		if ($localStorage.currentUser) {
			$http.defaults.headers.common.Authorization =  'bearer ' + $localStorage.currentUser.token;
			$rootScope.isLogin = true;
			$rootScope.name = $localStorage.currentUser.name;
			$rootScope.type = $localStorage.currentUser.type;
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			var publicPages = ['/login', '/'];
			var restrictedPage = publicPages.indexOf($location.path()) === -1;

			if (restrictedPage && !$localStorage.currentUser) {
				$state.go('schedule');
				// $rootScope.isLogin = true;
			}

			if ($localStorage.currentUser && $location.path() == '/login') {
				$state.go($localStorage.currentUser.type);
			}

			$rootScope.background = '';
			$rootScope.loginPage = false;

			if ($location.path() == '/login') {
				$rootScope.background = 'assets/img/login-bg.jpg';
				$rootScope.loginPage = true;	
			}
		});

		$rootScope.$on('$stateChangeStart', function(event, toState){ 
		    $rootScope.state = toState.data.state;
		});
	}
})();