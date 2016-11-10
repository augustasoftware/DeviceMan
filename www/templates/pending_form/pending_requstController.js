devicemanControllers
.controller('pendingrequestController', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,$window,devicependingServicesss,$ionicLoading,$ionicPopup) {


var getuserID = localStorage.getItem("getuserID");

$scope.getstatusindi =function(){
	//$scope.deviceID = list.device_id
	$scope.id=$stateParams.Id
	debugger;
 devicependingServicesss.getdevice($scope.id).then(function(responce){
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

$scope.cancelrequest = function(){
  debugger;
   $scope.deleteId =  $stateParams.Id
   $scope.Loadingshow();
   devicependingServicesss.cancelrequest($scope.deleteId).then(function(responce){
           $scope.Loadinghide();
            if (responce.data ) {
                $scope.Loadinghide();
                $scope.showAlert();
                $state.go('app.pending_request');

          }else
          {
            alert('Cancel failed !!');
          }
        });

};

$scope.Loadingshow = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.Loadinghide = function(){
    $ionicLoading.hide();
  };

$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Request Canceled !!',
     template: 'This device request has been cancelled !!'
   });

   alertPopup.then(function(res) {
     console.log('Thank you ');
   });
 };



$scope.goback = function(){
   $ionicHistory.goBack();

};

$scope.getstatusindi();

});


devicemanControllers.service('devicependingServicesss', function($http,urlservices) {

     return {


        getdevice:getdevice,
        cancelrequest:cancelrequest,

      };


       function getdevice (id)
      {
            var url = urlservices.get_base_URL() + 'requestforms/'+ id;
            var headers = urlservices.get_header();
            debugger;
            return $http.get(url,{ headers: headers});
      }

       function cancelrequest (deleteId)
      {
            var url = urlservices.get_base_URL() + 'requestforms/'+ deleteId;
            var headers = urlservices.get_header();
            debugger;
            return $http.delete(url,{ headers: headers});
      }

    });
