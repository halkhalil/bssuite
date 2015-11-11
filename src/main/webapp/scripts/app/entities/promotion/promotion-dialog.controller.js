'use strict';

angular.module('bssuiteApp').controller('PromotionDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Promotion', 'Store',
        function($scope, $stateParams, $modalInstance, entity, Promotion, Store) {

        $scope.promotion = entity;
        $scope.stores = Store.query();
        $scope.load = function(id) {
            Promotion.get({id : id}, function(result) {
                $scope.promotion = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bssuiteApp:promotionUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.promotion.id != null) {
                Promotion.update($scope.promotion, onSaveSuccess, onSaveError);
            } else {
                Promotion.save($scope.promotion, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
