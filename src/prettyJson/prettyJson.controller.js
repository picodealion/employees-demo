(function() {

    'use strict';

    angular
        .module('app')
        .controller('prettyJsonController', PrettyJsonController);

    PrettyJsonController.$inject = ['$scope', '$sce'];

    function PrettyJsonController($scope, $sce) {

        $scope.prettyJson = $sce.trustAsHtml(prettyJson($scope.data));


        // prettify the json data by adding some classes
        // stolen from StackOverflow obviously
        function prettyJson(json) {
            var jsonRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

            if (typeof json !== 'string') {
                json = JSON.stringify(json, undefined, 2);
            }

            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return json.replace(jsonRegex, function (match) {
                var cls = 'number';

                if (/^"/.test(match)) {

                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }

                } else if (/true|false/.test(match)) {
                    cls = 'boolean';

                } else if (/null/.test(match)) {
                    cls = 'null';
                }

                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
    }

})();