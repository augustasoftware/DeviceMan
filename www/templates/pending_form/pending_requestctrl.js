devicemanControllers
.controller('pendingrequestctrl', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,$window,devicependingService,$ionicLoading) {

var getuserID = localStorage.getItem("getuserID");

$scope.getpendinglist = function(){
  debugger;
  var model ={
     "userId": $scope.getuserID =getuserID,
     "requestStatus":$scope.requestStatus =1
   };
   $scope.Loadingshow();
   devicependingService.getpendinglists(model).then(function(responce){
           debugger;
            if (responce.data.response ) {
                 $scope.getlist = responce.data.response;
                 $scope.Loadinghide();
          }else
          {
             alert('Connection Failed !!');
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

$scope.golist = function(){
$state.go('app.home_list');
};

$scope.goto_pendingpage = function(id){
	$scope.Id=id;
 $state.go('app.pending_form',{ Id: $scope.Id} );

};

$scope.goto_devicedetail=function(){
	$state.go('app.device_details');
};

$scope.goback = function(){
   $ionicHistory.goBack();

};

$scope.getpendinglist();

});


devicemanControllers.service('devicependingService', function($http,urlservices) {

     return {

        getpendinglists:getpendinglists,


      };

      function getpendinglists (model)
      {
            var url = urlservices.get_base_URL() + 'requestforms/getRequestFormByStatus';
            var headers = urlservices.get_header();
            debugger;
            return $http.post(url,model,{ headers: headers});
      }



    });
