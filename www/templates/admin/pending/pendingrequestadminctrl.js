devicemanControllers
.controller('pendingrequestadminctrl', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,$window,devicependingadminService,$ionicLoading,$ionicPopup,$rootScope) {

var getuserID = localStorage.getItem("getuserID");


 //getpendinglist();
 //function getpendinglist() {



$scope.getpendinglistret = function(){
  $scope.show();
     devicependingadminService.getpendinglists().then(function(responce){
           debugger;
           $scope.show();
            if (responce.data.response ) {
                 $scope.getlist = responce.data.response;
                 $scope.hide();
          }else
          {
            $scope.hide();
             alert('Connection failed !!');
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


$scope.approve=function(id,list){
  //$scope.approveID = id;
  //$scope.readstatusID =2;
  //alert(JSON.stringify(list));
var model={
   // "requestStatus" : $scope.readstatusID,
    "Date":$scope.Date=list.Date,
    "DeviceName":$scope.DeviceName=list.DeviceName,
    "endTime":$scope.endTime=list.endTime,
    "imageUrl":$scope.imageUrl=list.imageUrl,
    "requestStatus":$scope.requestStatus=2,
    "requestformId":$scope.requestformId=0,
    "startTime":$scope.startTime=list.startTime,
    "userId":$scope.userId=list.userId,
    "userName":$scope.userName=list.userName,
     "id":$scope.id =list.id,
    };


  debugger;
  devicependingadminService.approvedevice(model).then(function(responce){
           debugger;
            if (responce.data ) {
              debugger;
                 $scope.hide();
                 //getpendinglist();
                  $scope.getpendinglistret();
                 $scope.showAlertafterapprove();

          }else
          {
            $scope.hide();
             alert('Connection failed !!');
          }
        });

};

$scope.goto_pendingpage = function(id){
  debugger;
	$scope.Id=id;
  $state.go('admin.pending_form',{ Id: $scope.Id} );
  $rootScope.Devicename = list.Devicename;


};

$scope.goto_devicedetail=function(){
	$state.go('app.device_details');
};

$scope.goback = function(){
   $ionicHistory.goBack();
 };

 $scope.showAlertafterapprove = function() {
       var alertPopup = $ionicPopup.alert({
          title: 'SUCCESS !!!',
          template: 'SUCCESSFULLY Approved !!',
       });
       alertPopup.then(function(res) {
         console.log('Thanks');
         //$scope.clearlog();
       });
    };


 $scope.getpendinglistret();


});


devicemanControllers.service('devicependingadminService', function($http,urlservices) {

     return {

        getpendinglists:getpendinglists,
        approvedevice:approvedevice,


      };

      function getpendinglists ()
      {
            var url = urlservices.get_base_URL() + 'requestforms/getPendingRequestForm/1';
            var headers = urlservices.get_header();
            return $http.get(url,{ headers: headers});
      }

      function approvedevice (model)
      {
            var url = urlservices.get_base_URL() + 'requestforms/updateRequestForm';
            var headers = urlservices.get_header();
            //debugger;
            return $http.post(url,model,{ headers: headers});
      }


    });

