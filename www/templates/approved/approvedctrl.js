devicemanControllers
.controller('approveddevicectrl', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,deviceapprovedService) {

var getuserID = localStorage.getItem("getuserID");

  $scope.goback = function(){
     $ionicHistory.goBack();
  };

  $scope.deviceinfo = function(){
  	$state.go('app.device_details');
  };

$scope.goto_pendingpage = function(id){
 $scope.Id=id;
 $state.go('app.pending_form',{ Id: $scope.Id} );

};

$scope.goto_approvedpage = function(id){
 $scope.Id=id;
 $state.go('app.approved_devicestatus',{ Id: $scope.Id} );
};


$scope.getapprovallist = function(){
debugger;
   var model ={
     "userId": $scope.getuserID = getuserID,
     "requestStatus":$scope.requestStatus =2,
   };
   deviceapprovedService.getapprovallists(model).then(function(responce){
           debugger;
            if (responce.data.response ) {
                 $scope.getlist = responce.data.response;
          }else
          {
             $scope.loginfailed();
          }
        });

};

$scope.getapprovallist();

});

devicemanControllers.service('deviceapprovedService', function($http,urlservices) {

     return {

        getapprovallists:getapprovallists,
        getdevice:getdevice,

      };

      function getapprovallists (model)
      {
            var url = urlservices.get_base_URL() + 'requestforms/getRequestFormByStatus';
            var headers = urlservices.get_header();

            debugger;
            return $http.post(url,model,{ headers: headers});
      }

       function getdevice (id)
      {
            var url = urlservices.get_base_URL() + 'requestforms/'+ id ;
            var headers = urlservices.get_header();
            debugger;
            return $http.get(url ,{ headers: headers});
      }

    });
