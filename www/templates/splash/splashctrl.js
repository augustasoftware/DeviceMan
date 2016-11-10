devicemanControllers
.controller('splashctrl', function($scope,$stateParams,$state) {

  var loggedin = localStorage.getItem("isloggedIN");
  //alert(loggedin);

    $scope.gologin=function(){
      	if (loggedin !=null && loggedin =='True'){

      		var useremail= localStorage.getItem("getUserEmail");
      		if(useremail !=null && useremail=='admin@deviceman.com'){
      			 $state.go('admin.admin_pending_list');
      		}
      		else{
      			$state.go('app.home_list');
      		}

    	}
    	else{
    		$state.go('login');
    	}
      //$state.go('login');
    };

    });
