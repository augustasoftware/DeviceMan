devicemanControllers
    .controller('homectrl', function($scope, $stateParams, $ionicModal, $timeout, $ionicPopover, $state, devicemanServices, $ionicPopup, $cookieStore, homeService, $rootScope) {



        var getEMPName = localStorage.getItem("getEMPName");
        var getuserID = localStorage.getItem("getuserID");



        $scope.gohome = function() {
            $state.go('app.home_list');
        };


        $scope.showConfirm = function(Id) {
            //debugger;
            var confirmPopup = $ionicPopup.confirm({
                template: '<div class="list"><div class="item info" ng-click="goto_devicedetail(Id)"><a ><img src="img/info.png" /></a></div><div class="item"><a ng-click="selectdevice(Id,$index)"><img src="img/right.png" /></a></div></div>'
            });
            confirmPopup.then(function(res) {

            });
        };



        var template = 'templates/home/popover.html'
        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl(template, {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        //var mobileid = $scope.Id

        $scope.openPopover = function($event, Id, list) {
            debugger;
            var upendURL='http://66.219.96.89:9080/worklight/adapters/CaaS/asset?assetURL=';
              $scope.popover.show($event);
              $scope.Id = Id;
              $rootScope.Devicename = list.properties.DeviceName;
              $rootScope.Image = upendURL + list.properties.Image;
              //$rootScope.Image1 = upendURL + list.properties.Image1;
              //$rootScope.Image1 = upendURL + list.properties.Image2;

              $scope.DevName = list.properties.DeviceName;
              localStorage.setItem("DevName", $scope.DevName);
              $scope.imgURl = upendURL + list.properties.Image;
              localStorage.setItem("IMGurl", $scope.imgURl);
            debugger;
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        //Left Menu of avalaible List
        $ionicModal.fromTemplateUrl('templates/home/menu_left.html', {
            scope: $scope

        }).then(function(menu_left) {
            $scope.menu_left = menu_left;
        });
        $scope.close_rmenu_left = function() {
            $scope.menu_left.hide();
        };

        $scope.open_menu_left = function() {
            $scope.menu_left.show();
        };


        // Device Details
        $scope.goto_devicedetail = function(Id) {
            //debugger;
            //alert($scope.Id);
            $state.go('app.device_details', { Id: $scope.Id })
            $scope.closePopover();
        };

        $scope.selectdevice = function() {
            //debugger;
            $state.go('app.device_request', { Id: $scope.Id })
            $scope.closePopover();
        };


        $scope.callmacam = function() {
            homeService.mcam().then(function(response) {
                debugger;
                if (response.data.items.length > 0) {
                    debugger;
                    $scope.mobilelist = response.data.items;
                    debugger;
                } else {
                    alert('Try again !!!');
                }
            }, function(error) {
                //alert('error occured !!!');
            });
        };

        $scope.init = function() {
            //debugger;
            devicemanServices.get_devive_list_json()
                .success(function(response) {
                    // debugger;
                    $scope.mobilelist = response;

                });

        };

        $scope.callmacam();
        //$scope.init();
        //$scope.liststart();
    });


devicemanControllers.service('homeService', function($http) {

    return {
        mcam: mcam,
    };


    function mcam() {

        var url = 'http://66.219.96.89:9080/worklight/adapters/CaaS/items?property=id,title,categories,keywords&element=Brand,Image1,Description,Model,Image2,Camera,Display,SIM,OS,Color,Image,GPS,Processor,DeviceName&lib=DeviceMan&pageNumber=1&pageSize=10&type=DeviceMan&tenant=vp9812&';
        debugger;
        return $http.get(url);
    }

});
