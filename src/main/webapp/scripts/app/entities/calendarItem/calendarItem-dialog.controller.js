'use strict';

angular.module('bssuiteApp').controller('CalendarItemDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'CalendarItem', 'Staff',
        function($scope, $stateParams, $modalInstance, entity, CalendarItem, Staff) {

        $scope.calendarItem = entity;
        $scope.staffs = Staff.query();
        $scope.load = function(id) {
            CalendarItem.get({id : id}, function(result) {
                $scope.calendarItem = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bssuiteApp:calendarItemUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.calendarItem.id != null) {
                CalendarItem.update($scope.calendarItem, onSaveSuccess, onSaveError);
            } else {
                CalendarItem.save($scope.calendarItem, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
