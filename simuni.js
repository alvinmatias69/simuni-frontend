(function () {
	'use strict';

	angular.module('simuni', ['ui.router', 'ngMessages', 'ngStorage', 'ngRoute', 'ui.select', 'ngSanitize', 'ngFileUpload'])
		.config(config)
		.run(run);

	function config($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('schedule', {
				url:'/',
				templateUrl: 'modules/schedule/schedule.html',
				controller: 'scheduleController',
				controllerAs: 'vm',
				data:{
					state:"schedule"
				}
			})
			.state('login', {
				url:'/login',
				templateUrl:'modules/login/login.html',
				controller: 'loginController',
				controllerAs: 'vm',
				data:{
					state:"login"
				}
			})
			.state('profile', {
				url:'/profile',
				templateUrl:'modules/profile/profile.html',
				controller: "profileController",
				controllerAs: "vm",
				data:{
					state:"profile"
				}
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
			})
			.state('bidan/record', {
				url: '/bidan/record',
				templateUrl: 'modules/bidan/record/record.html',
				controller: 'recordController',
				controllerAs: 'vm',
				data:{
					state:"record"
				}
			})
			.state('baby', {
				url: '/baby',
				templateUrl: 'modules/baby/dashboard/dashboard.html',
				controller: 'babyDashboardController',
				controllerAs: 'vm',
				data:{
					state:"dashboard"
				}
			})
			.state('baby/history', {
				url: '/baby/history',
				templateUrl: 'modules/baby/history/history.html',
				controller: 'babyHistoryController',
				controllerAs: 'vm',
				data:{
					state:"history"
				}
			})
			.state('baby/profile', {
				url: '/baby/profile',
				templateUrl: 'modules/baby/profile/profile.html',
				controller: 'profileBabyController',
				controllerAs: 'vm',
				data:{
					state:"profile"
				}
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'modules/admin/bidan/bidan.html',
				controller: 'adminController',
				controllerAs: 'vm',
				data:{
					state:"bidan"
				}
			})
			.state('admin/bidan/form', {
				url: '/admin/bidan/form',
				templateUrl: 'modules/admin/formBidan/formBidan.html',
				controller: 'formBidanController',
				controllerAs: 'vm',
				data:{
					state:"bidan"
				}
			})
			.state('admin/baby', {
				url: '/admin/baby',
				templateUrl: 'modules/admin/baby/baby.html',
				controller: 'babyListController',
				controllerAs: 'vm',
				data:{
					state:"baby"
				}
			})
			.state('admin/baby/form',{
				url: '/admin/baby/form',
				templateUrl: 'modules/admin/formBaby/formBaby.html',
				controller: 'formBabyController',
				controllerAs: 'vm',
				data:{
					state:"baby"
				}
			})
			.state('admin/vaccine', {
				url: '/admin/vaccine',
				templateUrl: 'modules/admin/vaccine/vaccine.html',
				controller: 'vaccineListController',
				controllerAs: 'vm',
				data:{
					state:"vaccine"
				}
			})
			.state('admin/vaccine/form', {
				url: '/admin/vaccine/form',
				templateUrl: 'modules/admin/formVaccine/formVaccine.html',
				controller: 'formVaccineController',
				controllerAs: 'vm',
				data:{
					state:"vaccine"
				}
			});

			$urlRouterProvider.otherwise("/");

	};

	function run($rootScope, $http, $location, $localStorage, authenticationService, $state, Upload, $window) {

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

		$rootScope.uploadAvatar = function (file, errFile) {
			if (file) {
				file.upload = Upload.upload({
					url: $rootScope.baseUrl + '/api/avatar/' + $rootScope.id,
					data: {image: file}
				});

				file.upload.then(function (response) {
					$rootScope.urlFoto = response.data.content.urlFoto;
					$localStorage.currentUser.urlFoto = $rootScope.urlFoto;
					$window.location.reload();
				})
			}
		}


		if ($localStorage.currentUser) {
			$http.defaults.headers.common.Authorization =  $localStorage.currentUser.token;
			$rootScope.isLogin = true;
			$rootScope.name = $localStorage.currentUser.name;
			$rootScope.type = $localStorage.currentUser.type;
			$rootScope.id = $localStorage.currentUser.id;
			$rootScope.urlFoto = $localStorage.currentUser.urlFoto;
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			var publicPages = ['/login', '/'];
			var restrictedPage = publicPages.indexOf($location.path()) === -1;

			if (restrictedPage && !$localStorage.currentUser) {
				$state.go('schedule');
				// $rootScope.isLogin = true;
			}

			if ($localStorage.currentUser && ($location.path() == '/login' || $location.path() == '/')) {
				$state.go($localStorage.currentUser.type);
			}

			if (($location.path().slice(0,6) == '/admin' && $localStorage.currentUser.type != 'admin') || ($location.path().slice(0,6) == '/bidan' && $localStorage.currentUser.type != 'bidan') || ($location.path().slice(0,5) == '/baby' && $localStorage.currentUser.type != 'baby')) {
				$state.go($localStorage.currentUser.type);
			}

			$rootScope.background = '';
			$rootScope.loginPage = false;

			if ($location.path() == '/login') {
				$rootScope.background = 'assets/img/bg.png';
				$rootScope.loginPage = true;	
			}
		});

		$rootScope.$on('$stateChangeStart', function(event, toState){ 
		    $rootScope.state = toState.data.state;
		});
	}
})();