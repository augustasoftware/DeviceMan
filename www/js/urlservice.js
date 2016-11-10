devicemanServices
    .service('urlservices', function($http) {
        return {
            get_base_URL: function() {
                return 'https://api.us.apiconnect.ibmcloud.com/ibmaugusta-augustademo/sb/api/';
            },

            get_header: function() {

                var headers = {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'x-ibm-client-id': '33cf123c-625d-4bef-9844-9f9b216a6c08',
                    'x-ibm-client-secret': 'hK7mY5sF6nG6bG3dG3dI8aU3hN1wC4lY2pA4yN1gN6iE4kG6hO'
                };

                return headers;
            },
        };



    });
