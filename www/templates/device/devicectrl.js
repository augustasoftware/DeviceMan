devicemanControllers
    .controller('devicectrl', function($scope, $stateParams, $ionicModal, $timeout, $ionicPopover, $state, $ionicHistory, $rootScope) {

        $scope.selectdevice = function(index) {
            debugger;
            $state.go('app.device_request', { Id: $stateParams.Id });

        };

        $scope.goback = function() {
            //$ionicHistory
            $ionicHistory.goBack();
        };
    });
