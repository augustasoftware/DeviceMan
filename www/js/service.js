devicemanServices
    .service('devicemanServices', function($http) {
        return {
            get_devive_list_json: function() {
                return $http.get('js/device_list.json'); // this will return a promise to controller
            },
            get_inspection_checklist_json: function() {
                return $http.get('js/inspection_checklist.json'); // this will return a promise to controller
            },
            verify_token: function() {
                var url = globalurl + "customer/ValidateMobiletoken";
                return $http.post(url, { token: window.localStorage.COS_accessToken })
                    .error(function(data) {
                        console.log("Error", data);
                    });
            },
            
        };
    })
