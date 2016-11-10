devicemanControllers
.controller('devicerequestctrl', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopover,$state,$ionicHistory,devicerequestService,$filter,$ionicLoading,$rootScope) {

  var getEMPName = localStorage.getItem("getEMPName");
  var getuserID = localStorage.getItem("getuserID");

  $rootScope.empamesend=localStorage.getItem("getEMPName");
  var empid = localStorage.getItem("id");
  //var getEMPName = localStorage.getItem("name");

 var ss= $scope.datepicker;
 //$scope.checktime ="2015-05-10T22:00:00.000Z"
 //$scope.dates = $filter("date")(Date.now(), 'yyyy-MM-dd');

//$rootScope.DeviceName= DeviceName;
  var getDevName = localStorage.getItem("DevName");
  var getimgurl = localStorage.getItem("IMGurl");

$scope.device_submit = function () {
  debugger;
 $scope.endtimes= document.getElementById("endtimes").value,
 $scope.startTimes= document.getElementById("startTimes").value;


      var model =
            {
                "userId":$scope.userId = getuserID,
                "userName":$scope.userName=getEMPName,
                "Date":$scope.datepicker,
                //"imageUrl":$scope.imageUrl=getimgurl,
                //"Date":$scope.dates,
                "DeviceName":$scope.DeviceName=getDevName,
                "startTime":$scope.startTimes,
                "endTime":$scope.endtimes,
                "imageUrl":$scope.image=getimgurl,
                "requestformId":$scope.requestformId=1,
                "requestStatus":$scope.requestStatus=1,

            };
            debugger;
            $scope.show();
        devicerequestService.devicerequest(model).then(function (response) {
               if (response) {
                $scope.getresponce = response;
                debugger;
                $scope.hide();
               $state.go('app.pending_request');
            }
        }, function (error) {
            //alert(error);
        });
    };


///////////////LOADING FUNCTION ////////////////////

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




$scope.gobacs = function() {

        $ionicHistory.goBack();
        };

//Date Picker

    $ionicModal.fromTemplateUrl('templates/datemodal.html',
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        controller:'devicerequestctrl',
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModal = function() {
      $scope.datemodal.show();
    };
    $scope.savedateModal = function(modal) {
      debugger;
      $scope.datepicker = modal;
      debugger;
      $scope.datemodal.hide();
    };

$scope.modalAnimations = ['bounceInDown']

  $scope.showModal = function(animation) {
    console.log(animation);
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'animated ' + animation,
      hideDelay:1020
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
      $scope.hideModal = function(){
        $scope.modal.hide();
        // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
        // It is important to remove the modal to avoid memory leaks
        $scope.modal.remove();
      };
    });
  };


});


devicemanControllers.service('devicerequestService', function($http,$cookies,urlservices) {
 //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    return {

        devicerequest:devicerequest,

      };


      function devicerequest (model)
      {
            var url = urlservices.get_base_URL() + "requestforms/createNewRequest";
            var headers = urlservices.get_header();
            return $http.post(url,model,{ headers: headers});
      }

    });
