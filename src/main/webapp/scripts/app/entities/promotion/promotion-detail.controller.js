'use strict';

angular.module('bssuiteApp')
    .controller('PromotionDetailController', function ($scope, $rootScope, $stateParams, entity, Promotion, Store) {
        $scope.promotion = entity;
        $scope.load = function (id) {
            Promotion.get({id: id}, function(result) {
                $scope.promotion = result;
            });
        };
        var unsubscribe = $rootScope.$on('bssuiteApp:promotionUpdate', function(event, result) {
            $scope.promotion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
