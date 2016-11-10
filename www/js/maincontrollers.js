devicemanControllers
    .controller('AppCtrl', function($scope,$state, $ionicModal, $timeout, $ionicHistory,$ionicPopup,$rootScope,$window) {

    $scope.show_menu = function() {
      alert('check');
        $scope.menumodal.show();
    };

    $ionicModal.fromTemplateUrl('templates/menu.html', {
        scope: $scope,
        controller: 'AppCtrl',
        animation: 'animated fadeInDown'
    }).then(function(menumodal) {
        $scope.menumodal = menumodal;
    });
    $scope.close_top_menu = function() {
        $scope.menumodal.hide();
    };
    $scope.top_menu = function() {
        $scope.menumodal.show();
    };

    $scope.goback = function() {
        debugger;
        $ionicHistory.goBack();
    };

    $scope.logout=function(){
        debugger;
      // window.location.reload()
           $state.go('login');
           $window.localStorage.clear();
          // BMSClient.unregisterAuthenticationListener("wl_facebookRealm");
//            localStorage.removeItem('id');
//            localStorage.removeItem("name");
//            localStorage.removeItem("getEMPName");
//            localStorage.removeItem("idGoogle");
//            localStorage.removeItem("EmailID");
    };
});
