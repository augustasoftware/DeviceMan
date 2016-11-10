devicemanControllers
.controller('pendingrequestadminController', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,$ionicPopup,$window,devicependingadminServicesss,$ionicLoading) {


var getuserID = localStorage.getItem("getuserID");

$scope.getstatusindi =function(){
	//$scope.deviceID = list.device_id
	$scope.id=$stateParams.Id;
	devicependingadminServicesss.getdevice($scope.id).then(function(responce){
          if (responce.data ) {
              $scope.getstatus = responce.data;
                 //debugger;
          }else
          {
           alert('Connection failed !!');
          }
        });

};


$scope.cancelrequest = function(){
   $scope.deleteId =  $stateParams.Id
   $scope.show();
   devicependingadminServicesss.cancelrequest($scope.deleteId).then(function(responce){

            if (responce.data ) {
                $scope.hide();
                $scope.showAlert();

               // $scope.getstatusindi();


          }else
          {
            $scope.hide();
            alert('Cancel failed !!');
          }
        });

};



$scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };



$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Canceled !!',
     template: 'This device has been canceled by admin !!'
   });

   alertPopup.then(function(res) {
                $scope.getstatusindi();
                $state.go('admin.admin_pending_list');
     console.log('Thank you ');
   });
 };



$scope.goback = function(){
   $ionicHistory.goBack();

};

$scope.getstatusindi();

});


devicemanControllers.service('devicependingadminServicesss', function($http,urlservices) {

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
