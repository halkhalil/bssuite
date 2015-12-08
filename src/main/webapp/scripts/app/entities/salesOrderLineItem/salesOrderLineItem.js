'use strict';

angular.module('bssuiteApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('salesOrderLineItem', {
                parent: 'entity',
                url: '/salesOrderLineItems',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'SalesOrderLineItems'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/salesOrderLineItem/salesOrderLineItems.html',
                        controller: 'SalesOrderLineItemController'
                    }
                },
                resolve: {
                }
            })
            .state('salesOrderLineItem.detail', {
                parent: 'entity',
                url: '/salesOrderLineItem/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'SalesOrderLineItem'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/salesOrderLineItem/salesOrderLineItem-detail.html',
                        controller: 'SalesOrderLineItemDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'SalesOrderLineItem', function($stateParams, SalesOrderLineItem) {
                        return SalesOrderLineItem.get({id : $stateParams.id});
                    }]
                }
            })
            .state('salesOrderLineItem.new', {
                parent: 'salesOrderLineItem',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/salesOrderLineItem/salesOrderLineItem-dialog.html',
                        controller: 'SalesOrderLineItemDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    description: null,
                                    cost: null,
                                    soldFor: null,
                                    qtyOrdered: null,
                                    qtyAllocated: null,
                                    totalTaxCharge: null,
                                    discountPercentage: null,
                                    lineNo: null,
                                    requiredDate: null,
                                    listPrice: null,
                                    listPriceDiscount: null,
                                    cost2: null,
                                    isHidden: null,
                                    Ref1: null,
                                    Ref2: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('salesOrderLineItem', null, { reload: true });
                    }, function() {
                        $state.go('salesOrderLineItem');
                    })
                }]
            })
            .state('salesOrderLineItem.edit', {
                parent: 'salesOrderLineItem',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/salesOrderLineItem/salesOrderLineItem-dialog.html',
                        controller: 'SalesOrderLineItemDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['SalesOrderLineItem', function(SalesOrderLineItem) {
                                return SalesOrderLineItem.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('salesOrderLineItem', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('salesOrderLineItem.delete', {
                parent: 'salesOrderLineItem',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/salesOrderLineItem/salesOrderLineItem-delete-dialog.html',
                        controller: 'SalesOrderLineItemDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['SalesOrderLineItem', function(SalesOrderLineItem) {
                                return SalesOrderLineItem.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('salesOrderLineItem', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
