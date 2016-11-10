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
                    'x-ibm-client-id': 'XXXXXXXXX-XXXX-XXXX-XXXX-XXXX',
                    'x-ibm-client-secret': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                };

                return headers;
            },
        };



    });
