'use strict';

var app = angular
		.module(
				'app',
				[ 'ngResource', 'ui.router', 'ui.bootstrap',
						'pascalprecht.translate', 'ngCookies' ])
		.config(
				function($stateProvider, $urlRouterProvider) {

					// Angular.JS ROUTES ///

					$stateProvider
							.state(
									'access',
									{
										url : '/access',
										template : '<div ui-view class="fade-in-right-big smooth"></div>'
									}).state('access.login', {
								url : '/login',
								templateUrl : 'views/login.html',
								controller : 'LoginController'

							}).state('app', {
								abstract : true,
								url : '/app',
								templateUrl : 'views/template.html'

							}).state('app.home', {
								url : '/home',
								templateUrl : 'views/home.html',
								controller : 'HomeController'

							}).state('app.index', {
								url : '/index',
								templateUrl : 'views/home.html',
								controller : 'HomeController'

							}).state('app.dashboard', {
								url : '/dashboard',
								templateUrl : 'views/dashboard.html',
								controller : 'HomeController'

							}).state('app.sending', {
								url : '/sending',
								templateUrl : 'views/sending.html',
								controller : 'HomeController'

							}).state('app.profile', {
								url : '/profile',
								templateUrl : 'views/profile.html',
								controller : 'ProfileController'
							}).state('app.newhipment', {
								url : '/newhipment',
								templateUrl : 'views/newhipment.html',
								controller : 'ShippmentController'
							}).state('app.createshipment', {
								url : '/createshipment',
								templateUrl : 'views/createshipment.html',
								controller : 'ShippmentController'
							}).state('app.createroute', {
								url : '/createroute',
								templateUrl : 'views/createroute.html',
								controller : 'HomeController'

							}).state('app.media', {
								url : '/media',
								templateUrl : 'views/media.html',
								controller : 'HomeController'

							}).state('app.contact', {
								url : '/contact',
								templateUrl : 'views/contact-us.html',
								controller : 'HomeController'

							}).state('app.faq', {
								url : '/faq',
								templateUrl : 'views/faq.html',
								controller : 'HomeController'
							});

					$urlRouterProvider.otherwise('/app/home');
				});
// .factory('RestService', RestService);

angular.module('app').config(
		[ '$translateProvider', function($translateProvider) {
			$translateProvider.useStaticFilesLoader({
				prefix : 'locale/',
				suffix : '.js'
			});

			$translateProvider.preferredLanguage('en');
			$translateProvider.useLocalStorage();
		} ]);

angular.module('app')

.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
} ])
