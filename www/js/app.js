// var db;
angular.module('deviceman', ['ionic', 'ng-fx', 'deviceman.controllers', 'deviceman.Services', 'ngCordova', 'ngCordovaOauth', 'ngCookies'])

.run(function($ionicPlatform, $cordovaSQLite,$ionicPopup) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        BMSClient.initialize("http://devicemanfb.ibmaugusta-augustademo.apic.mybluemix.net", "c8858bea-84c0-4a08-b6e2-dc7f54cfdfc3");
        MFPAuthorizationManager.initialize("6053cc66-0e59-432d-8bfc-b214b4a1aea9");
        var settings = {
            ios: {
                alert: true,
                badge: true,
                sound: true
            }
        };

        var success = function(response) { console.log("Success: " + response);
        localStorage.setItem("DeviceIDR", JSON.parse(response).deviceId);
       // alert("Check : " + localStorage.getItem("DeviceIDR"));
       //alert(JSON.stringify(response));
         };

        var failure = function(response) { console.log("Error: " + response); };

        MFPPush.registerDevice(settings, success, failure);
        var handleNotificationCallback = function(notification) {
            // notification is a JSON object
            //alert(notification.message);
            var alertPopup = $ionicPopup.alert({
                            title: 'DeviceMan',
                            template: notification.message,
                        });
                        alertPopup.then(function(res) {
                            console.log('Thanks');

                        });
            // console.log("notifaction: " + notification.message);
        };

        MFPPush.registerNotificationsCallback(handleNotificationCallback);
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

    .state('admin', {
        url: '/admin',
        abstract: true,
        templateUrl: 'templates/menu-admin.html',
        controller: 'adminCtrl'
    })

    .state('splash', {
            url: '/splash',
            templateUrl: 'templates/splash/splash.html',
            controller: 'splashctrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login/login.html',
            controller: 'loginCtrl'

        })

    .state('app.home_list', {
        url: '/home_list',
        views: {
            'menuContent': {
                templateUrl: 'templates/home/home.html',
                controller: 'homectrl'
            }
        }
    })

    .state('app.device_details', {
        url: '/device_details?Id',
        //cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/device/device_preview.html',
                controller: 'devicectrl'
            }
        }
    })

    .state('app.device_request', {
        url: '/device_request?Id',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/device_request/device_request_form.html',
                controller: 'devicerequestctrl'
            }
        }
    })

    .state('app.pending_request', {
        url: '/pending_request',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/pending_form/pending_requests.html',
                controller: 'pendingrequestctrl'
            }
        }
    })

    .state('app.pending_form', {
        url: '/pending_form?Id',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/pending_form/pending_form.html',
                controller: 'pendingrequestController'
            }
        }
    })

    .state('app.approved_devicestatus', {
        url: '/approved_devicestatus?Id',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/approved/approved_form.html',
                controller: 'approvedformController'
            }
        }
    })

    .state('app.approved_device', {
        url: '/approved_device',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/approved/approved_device.html',
                controller: 'approveddevicectrl'
            }
        }
    })

    .state('admin.admin_pending_list', {
        url: '/admin_pending_list',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/admin/pending/pending_admin_requests.html',
                controller: 'pendingrequestadminctrl'
            }
        }
    })

    .state('admin.pending_form', {
        url: '/admin_pending_form?Id',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/admin/pending/pending_admin_form.html',
                controller: 'pendingrequestadminController'
            }
        }
    })

    .state('admin.admin_approved_list', {
        url: '/admin_approved_list',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/admin/approved/approved_device_admin.html',
                controller: 'approveddevice_adminctrl'
            }
        }
    })

    .state('admin.approved_form', {
        url: '/admin_approved_form?Id',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/admin/approved/approved_form_admin.html',
                controller: 'approvedformadminController'
            }
        }
    });

    if (window.localStorage.start == undefined) {
        $urlRouterProvider.otherwise('/splash');
        window.localStorage.start = "hi";


    } else {

        $urlRouterProvider.otherwise('/splash');

    }
});
