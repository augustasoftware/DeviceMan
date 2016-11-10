devicemanControllers
.controller('approvedformadminController', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,$window,approvedformadminServicesss) {


var getuserID = localStorage.getItem("getuserID");

$scope.getstatusindi =function(){
	//$scope.deviceID = list.device_id
	$scope.id=$stateParams.Id
	debugger;
 approvedformadminServicesss.getdevice($scope.id).then(function(responce){
           debugger;
            if (responce.data ) {
              debugger;
                 $scope.getstatus = responce.data;
                 debugger;
          }else
          {
            // $scope.loginfailed();
          }
        });

};


$scope.goback = function(){
     $ionicHistory.goBack();
  };

$scope.getstatusindi();

});



devicemanControllers.service('approvedformadminServicesss', function($http,urlservices) {
     return {
        getdevice:getdevice,
      };


    function getdevice (id)
      {
            var url = urlservices.get_base_URL() + 'requestforms/'+ id;
            var headers = urlservices.get_header();
            return $http.get(url ,{ headers: headers});
      }

    });
