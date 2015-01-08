(function(angular) {
    'use strict';

    var _moduleId = 'abd',
        _start = new Date().getTime();

    angular.module(_moduleId, [])
        .directive("onLastRepeat", onLastRepeat)
        .controller('bigdata', controller);

    controller.$inject = ['$scope', '$http'];

    function controller($scope, $http) {
        var _vm = this;

        log('controller started');

        // load the data
        $http.get('data.json')
            .success(onDataLoad);

        $scope.$on('onRepeatLast', function(scope, element, attrs) {
            log('rows loaded');
        });


        function onDataLoad(data) {
            log('data loaded');
            $scope.data = data;
        }
    }

    function log(message) {
        console.log(message + ' time:' + (new Date().getTime() - _start) + 'ms');
    }

    function onLastRepeat() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function() {
                scope.$emit('onRepeatLast', element, attrs);
            }, 1);
        };
    }
})(angular);