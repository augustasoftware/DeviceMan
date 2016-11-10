devicemanControllers
.controller('approveddevice_adminctrl', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,deviceapprovedadminService) {

var getuserID = localStorage.getItem("getuserID");

  $scope.goback = function(){
     $ionicHistory.goBack();
  };



$scope.goto_pendingpage = function(id){
 $scope.Id=id;
 $state.go('app.pending_form',{ Id: $scope.Id} );

};

$scope.goto_approvedpage = function(id){
 $scope.Id=id;
 $state.go('admin.approved_form',{ Id: $scope.Id} );
};


$scope.getapprovallist = function(){

   deviceapprovedadminService.getapprovallists().then(function(responce){
           debugger;
            if (responce.data.response ) {
                 $scope.getlist = responce.data.response;
          }else
          {

          }
        });

};

$scope.getapprovallist();

});

devicemanControllers.service('deviceapprovedadminService', function($http, urlservices) {

    return {

        getapprovallists: getapprovallists,


    };

    function getapprovallists() {
        var url = urlservices.get_base_URL() + 'requestforms/getPendingRequestForm/2';
        var headers = urlservices.get_header();
        debugger;
        return $http.get(url, { headers: headers });
    }



});
