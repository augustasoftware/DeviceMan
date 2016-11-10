devicemanControllers
    .controller('loginCtrl', function($scope, $ionicModal, $stateParams, $timeout, $state, adduserService, $ionicPopup, $cordovaOauth, $cookieStore, $cookies, $ionicLoading,$rootScope) {

 $scope.DeviceIDSTART = localStorage.getItem("DeviceIDR");
 console.log($scope.DeviceIDSTAR);



// var settings = {
//              ios: {
//                  alert: true,
//                  badge: true,
//                  sound: true
//              }
//          };
//          var success = function(response) { console.log("Success: " + response); };
//          var failure = function(response) { console.log("Error: " + response); };
//          MFPPush.registerDevice(settings, success, failure);
//          var handleNotificationCallback = function(notification) {
//              // notification is a JSON object
//              alert(notification.message);
////              $scope.showAlert = function() {
////                 var alertPopup = $ionicPopup.alert({
////                    title: 'Message !!',
////                    template: 'This is alert popup',
////                 });
////                 alertPopup.then(function(res) {
////
////                 });
////              };
//          };
//          MFPPush.registerNotificationsCallback(handleNotificationCallback);

        ///////////******* login button function******///////////////////
        $scope.temp_login = function() {
            //$scope.loginmodel.userEmail;
            //$scope.loginmodel.userPwd;
            $scope.Id = '495add5906b8a69f10bad1bd854db614';
            adduserService.getuserlogin($scope.Id).then(function(responce) {
                if (responce.data.exists) {
                    debugger;
                    $state.go('app.home_list');
                    console.log("responce :: " + responce.data.exists);
                    $scope.showAlertafterlogin();
                } else {
                    $scope.loginfailed();
                }
            });
        };

        //Loading Function ////////
        $scope.show = function() {
            $ionicLoading.show({
                template: 'Loading...'
            }).then(function() {
                console.log("The loading indicator is now displayed");
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide().then(function() {
                console.log("The loading indicator is now hidden");
            });
        };

      $scope.log='True';

        $scope.login = function() {


 if ($scope.DeviceIDSTART == 'undefined'){

       var success = function(response) { console.log("Success: " + response);
            localStorage.setItem("DeviceIDR", JSON.parse(response).deviceId);
            $scope.DeviceIDSTART = localStorage.getItem("DeviceIDR");
            alert("Check : " + localStorage.getItem("DeviceIDR"));
        };
       var failure = function(response) { console.log("Error: " + response); };
       MFPPush.registerDevice(settings, success, failure);
     }
            var model = {
                "userEmail": $scope.email,
                "userPwd": $scope.password,
                 "deviceId":$scope.deviceId= $scope.DeviceIDSTART,
            };
            debugger;
            $scope.show();
            if ($scope.email !== undefined && $scope.password !== undefined) {
                adduserService.userlogin(model).then(function(responce) {
                    debugger;
                    if (responce.data.response instanceof Object) {
                        //debugger;
                        if (responce.data.response.userEmail == 'admin@deviceman.com') {
                            $scope.getEMPName = responce.data.response.userName;
                            $scope.getuserID = responce.data.response.id;
                            $scope.email=responce.data.response.userEmail;
                            localStorage.setItem("getUserEmail", $scope.email);
                            localStorage.setItem("getEMPName", $scope.getEMPName);
                            localStorage.setItem("getuserID", $scope.getuserID);
                            localStorage.setItem("isloggedIN", $scope.log);
                            $scope.hide();
                            $state.go('admin.admin_pending_list');
                            //$scope.showAlertafterlogin();
                        } else {

                            $scope.email=responce.data.response.userEmail;
                            localStorage.setItem("getUserEmail", $scope.email);

                            $scope.getEMPName = responce.data.response.userName;
                            $scope.getuserID = responce.data.response.id;
                            localStorage.setItem("getEMPName", $scope.getEMPName);
                            localStorage.setItem("getuserID", $scope.getuserID);
                            localStorage.setItem("isloggedIN", $scope.log);
                            $state.go('app.home_list');
                            $scope.hide();
                           // $scope.showAlertafterlogin();
                        }

                    } else {
                        $scope.hide();
                        $scope.loginfailed();
                    }
                });
            } else {
                $scope.hide();
                $scope.alertforem();
            }

        };



        $scope.showAlertafterlogin = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'SUCCESS !!!',
                template: 'SUCCESSFULLY LOGGED-IN !!',
            });
            alertPopup.then(function(res) {
                console.log('Thanks');
                //$scope.clearlog();
            });
        };

        $scope.showAlertafter = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'SUCCESS',
                template: 'SUCCESSFULL SIGN-UP !!',
            });
            alertPopup.then(function(res) {
                console.log('Thanks');
                //$scope.clearlog();
            });
        };

        $scope.alertforem = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'FAILED !!!',
                template: 'PLEASE ENTER USERNAME & PASSWORD CORRECTLY !!',
            });
            alertPopup.then(function(res) {
                console.log('Thanks');
                //$scope.clearlog();
            });
        };

        $scope.loginfailed = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'LOGIN FAILED !!!',
                template: 'PLEASE CHECK YOUR CREDENTIALS AND ENTER CORRECTLY !!',
            });
            alertPopup.then(function(res) {
                console.log('Thanks');
                //$scope.clearlog();
            });
        };

        ///////////******* login function END******///////////////////






        $scope.clearlog = function() {
            localStorage.removeItem('id');
            localStorage.removeItem("name");
            localStorage.removeItem("idGoogle");
            localStorage.removeItem("EmailID");
        };


        //signup button function
        $scope.temp_signup = function() {
            $state.go('app.home_list');
            $scope.close_signup_menu();
        };

        ////////////////////////////////////////FACEBOOK/////////////////////////////


        $scope.facebook = function() {
//            BMSClient.initialize("http://devicemanfb.ibmaugusta-augustademo.apic.mybluemix.net", "6053cc66-0e59-432d-8bfc-b214b4a1aea9", 1, function(success) {
                var request = new MFPRequest("http://devicemanfb.ibmaugusta-augustademo.apic.mybluemix.net/protected", MFPRequest.GET,20000);
                request.send("", function(success) {
                    console.log("onSuccess :: " + success.responseText);
                    MFPAuthorizationManager.getUserIdentity(function(gotsuccess) {
                        console.log("onSuccess Data :: " + gotsuccess);
                        // alert("Facebook : " + success);
                        localStorage.setItem("id", JSON.parse(gotsuccess).id);
                        localStorage.setItem("getEMPName", JSON.parse(gotsuccess).displayName);

                        localStorage.setItem("isloggedIN", $scope.log);
                        //alert("Check : " + localStorage.getItem("id"));
                        //alert("Check : " + localStorage.getItem("name"));
                        $state.go('app.home_list');
                        $scope.showPopupforFB();
                        //alert("read : "+ JSON.parse(gotsuccess).id);
                        //alert("Check : "+localStorage.getItem("id"));
                        //var id = localStorage.getItem("test");
                    }, function(error) {
                        console.log("MFPAuthorizationManager.getUserIdentity - failed");
                        alert("Facebook - MFPAuthorizationManager.getUserIdentity - failed");
                    });
                }, function(error) {
                    console.log("failed");
                    alert("Facebook - send request - failed");
                });
//             }, function(error) {
//                 console.log("failed");
//                 alert("Facebook - initialize - failed");
//             });
        };

        // Get id and name using LocalStorage :
        var id = localStorage.getItem("id");
        var name = localStorage.getItem("getEMPName");

        //$rootScope.empnames = name;

        $scope.$broadcast('test');
        //Popop For get Username and password @Facebook
        $scope.showPopupforFB = function() {
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                template: ' Enter Email ID<input type="email" id="userEmail" ng-model="userEmail" placeholder="XXX@mail.com">',
                //template: '<input type="text" ng-model="data.userEmail" id="userEmail" maxlength="13"> &gt;&lt;br&gt; Enter  Password  &lt;input type="password" ng-model="data.userPwd" &gt;',
                title: 'Enter Username.',
                controller: 'loginCtrl',
                subTitle: 'We are collecting your crendential for default login!!',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(data) {

                            //debugger;
                            var model = {
                                "userId": $scope.userId = id,
                                "userName": $scope.userName = name,
                                "userEmail": $scope.userEmail = document.getElementById("userEmail").value,
                                //"userPwd": $scope.userPwd = document.getElementById("userPwd").value,
                                "deviceId": $scope.deviceId = localStorage.getItem("DeviceIDR"),
                                "provider": $scope.provider = 1,
                                "active": $scope.active = 1,
                            };
                            $scope.show();
                            adduserService.addusers(model).then(function(responce) {
                                $scope.data = responce;
                                //$scope.email=responce.data.response.userEmail;
                               // localStorage.setItem("getUserEmail", $scope.email);
                                console.log("responce :: " + responce.data.id);
                                $scope.hide();
                                $scope.showAlertafterSave();

                            });



                            return data;
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);

            });

        };


        // After save popup
        $scope.showAlertafterSave = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Success !!!',
                template: 'Using Facebook ID registered successfully !!',
            });
            alertPopup.then(function(res) {
                console.log('Thanks');
                //$scope.clearlog();
            });
        };


        ///////////////**********FACBOOK END HERE ************/////////////////////////

       // $rootScope.empamesend=localStorage.getItem("getEMPName");

        //$rootScope.empamesends=localStorage.getItem("name");

        ///////////////////**********GOOGLE LOGIN **************////////////////////////


        $scope.google = function() {
            BMSClient.initialize("http://devicemangoogle.ibmaugusta-augustademo.apic.mybluemix.net", "debb4eb8-c65e-4622-843f-faab7b537ea4", 2, function(success) {
                var request = new MFPRequest("http://devicemangoogle.ibmaugusta-augustademo.apic.mybluemix.net/protected", MFPRequest.GET);
                request.send("", function(success) {
                    console.log("onSuccess :: " + success.responseText);
                    MFPAuthorizationManager.getUserIdentity(function(successforgoogle) {
                        console.log("onSuccess Data :: " + successforgoogle);

                        localStorage.setItem("idGoogle", JSON.parse(successforgoogle).id);
                        localStorage.setItem("EmailID", JSON.parse(successforgoogle).displayName);

                        alert("Check : " + localStorage.getItem("idGoogle"));
                        alert("Check : " + localStorage.getItem("EmailID"));

                        $state.go('app.home_list');
                        $scope.showPopupforgoogle();


                        //  alert("Google : " + success);
                    }, function(error) {
                        console.log("MFPAuthorizationManager.getUserIdentity - failed");
                        alert("Google - MFPAuthorizationManager.getUserIdentity - failed");
                    });
                }, function(error) {
                    console.log("failed");
                    alert("Google - send request - failed");
                });
            }, function(error) {
                console.log("failed");
                alert("Google - initialize - failed");
            });
        };


        var idGoogle = localStorage.getItem("idGoogle");
        var EmailID = localStorage.getItem("EmailID");


        //Popop For get Username and password @Facebook
        $scope.showPopupforgoogle = function() {
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                template: ' Enter Name<input type="email" id="userGname" ng-model="userGname" placeholder="your name">   <br> Enter Password <input type="password" ng-model="userGOPwd" id="userGOPwd" placeholder="*******" > ',
                title: 'Enter Username and Password.',
                controller: 'loginCtrl',
                subTitle: 'We are collecting your Password for login!!',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(data) {
                           // debugger;
                            var model = {
                                "userId": $scope.userId = idGoogle,
                                "userName": $scope.userName = document.getElementById("userGname").value,
                                "userEmail": $scope.userEmail = EmailID,
                                "userPwd": $scope.userPwd = document.getElementById("userGOPwd").value,
                                "deviceId": $scope.deviceId = localStorage.getItem("DeviceIDR"),
                                "provider": $scope.provider = 2,
                                "active": $scope.active = 1,
                            };
                            $scope.show();
                            adduserService.addusers(model).then(function(responce) {
                                $scope.data = responce;
                                console.log("responce :: " + responce.data.id);
                                $scope.hide();
                                $scope.showAlertafterSave();

                            });
                            return responce;
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

        };

        ///////////////GOOGLE END HERE /////////////////////////


//alert("Check : " + localStorage.getItem("DeviceIDR"));


        // User Register Function & passing models from signuppage
        $scope.adduser = function(signup) {
            var model = {
                "userId": $scope.userId = 0,
                "userName": $scope.userName = signup.userName,
                "userEmail": $scope.userEmail = signup.userEmail,
                "userPwd": $scope.userPwd = signup.userPwd,
                "deviceId": $scope.deviceId = localStorage.getItem("DeviceIDR"),
                "provider": $scope.provider = 0,
                "active": $scope.active = 1,
            };
            $scope.show();
            adduserService.addusers(model).then(function(responce) {
                $scope.data = responce;
                $scope.hide();
                $scope.showAlertafter();
                $scope.close_signup_menu();
            });
        };

        // Alert Function
        $scope.showAlertgoogle = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Success !!',
                template: 'Using Google ID registered successfully !!'
            });

            alertPopup.then(function(res) {
                console.log('Thank you !!');
            });
        };


        ///****Forgot Password********////////////
        $scope.showForgotPopup = function() {
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="username" value = "bala@gmail.com" id="username" maxlength="40">',
                title: 'Enter your Username',
                controller: 'loginCtrl',
                subTitle: 'Your username must be an email address !!!',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Ok</b>',
                        type: 'button-positive',
                        onTap: function(username) {
                            var username = document.getElementById("username").value;
                            $scope.userEmail = username;
                            $scope.show();
                            adduserService.forgotpwd($scope.userEmail).then(function(responce) {
                                //debugger;
//                                alert("Check : " + responce.data);
                                 //console.log('Test response'+JSON.stringify(responce.data));
                                //alert(responce.data.response[0].userName);
                                $scope.password = responce.data.response[0].userPwd;

                                //alert("Check : " + responce.data.response[0].userPwd);
                                localStorage.setItem("password", $scope.password);
                                $scope.hide();
                                $scope.showAlert();
                            });

                            return username;
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
                localStorage.setItem("username", res);
            });
        };

        $scope.showAlert = function() {

            var Userpassword = localStorage.getItem("password");
            var tpl = '<input type="text" value="{{Userpassword}}" id="username" ng-disabled="!editpass">'.replace('{{Userpassword}}', Userpassword);
            //debugger;
            $scope.editpass = false;
            var alertPopup = $ionicPopup.alert({
                title: 'Your Password',
                template: tpl
            });

            alertPopup.then(function(res) {
                // Custom functionality....
            });
        };



        //Sigup_Bottom Menu
        $ionicModal.fromTemplateUrl('templates/login/signup_menu.html', {
            scope: $scope


        }).then(function(bottom_menu) {
            $scope.bottom_menu = bottom_menu;
        });
        $scope.close_signup_menu = function() {
            $scope.bottom_menu.hide();
        };

        $scope.open_signup_menu = function() {
            $scope.bottom_menu.show();
        };
    });

// Factory services
devicemanControllers.service('adduserService', function($http,urlservices) {

    return {

        addusers: addusers,
        getuserlogin: getuserlogin,
        forgotpwd: forgotpwd,
        userlogin: userlogin,

    };

    function addusers(model) {

        var url = urlservices.get_base_URL() + 'users';
        var headers = urlservices.get_header();
        return $http.post(url, model, { headers: headers });
    }

    function getuserlogin(id) {
        var url = urlservices.get_base_URL() + 'users/' + id + '/exists';
        var headers = urlservices.get_header();
        return $http.get(url, { headers: headers });
    }

    function userlogin(model) {
    debugger;
        var url = urlservices.get_base_URL() + 'users/login';
        var headers = urlservices.get_header();
        debugger;
        return $http.post(url, model, { headers: headers });
    }

    function forgotpwd(userEmail) {
        var url = urlservices.get_base_URL() + 'users/forgotpassword/' + userEmail;
        var headers = urlservices.get_header();
        debugger;
        return $http.get(url, { headers: headers });
    }


});

