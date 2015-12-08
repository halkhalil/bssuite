'use strict';

angular.module('bssuiteApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('customerDiscountRule', {
                parent: 'entity',
                url: '/customerDiscountRules',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'CustomerDiscountRules'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/customerDiscountRule/customerDiscountRules.html',
                        controller: 'CustomerDiscountRuleController'
                    }
                },
                resolve: {
                }
            })
            .state('customerDiscountRule.detail', {
                parent: 'entity',
                url: '/customerDiscountRule/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'CustomerDiscountRule'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/customerDiscountRule/customerDiscountRule-detail.html',
                        controller: 'CustomerDiscountRuleDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'CustomerDiscountRule', function($stateParams, CustomerDiscountRule) {
                        return CustomerDiscountRule.get({id : $stateParams.id});
                    }]
                }
            })
            .state('customerDiscountRule.new', {
                parent: 'customerDiscountRule',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/customerDiscountRule/customerDiscountRule-dialog.html',
                        controller: 'CustomerDiscountRuleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    priceGroupCode: null,
                                    ruleNo: null,
                                    isAppliedGlobally: null,
                                    isAppliedOnSpecialItemsOnly: null,
                                    customerCode: null,
                                    customerCategoryCode: null,
                                    fromProductCode: null,
                                    toProductCode: null,
                                    startDate: null,
                                    endDate: null,
                                    qtyBreak: null,
                                    fromSupplierCode: null,
                                    toSupplierCode: null,
                                    fromStockGroupCode: null,
                                    toStockGroupCode: null,
                                    taxCode: null,
                                    isAppliedWhenTaxExempt: null,
                                    storeCode: null,
                                    discountName: null,
                                    stockFamilyCode: null,
                                    listPrice: null,
                                    discountFormula: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('customerDiscountRule', null, { reload: true });
                    }, function() {
                        $state.go('customerDiscountRule');
                    })
                }]
            })
            .state('customerDiscountRule.edit', {
                parent: 'customerDiscountRule',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/customerDiscountRule/customerDiscountRule-dialog.html',
                        controller: 'CustomerDiscountRuleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['CustomerDiscountRule', function(CustomerDiscountRule) {
                                return CustomerDiscountRule.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('customerDiscountRule', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('customerDiscountRule.delete', {
                parent: 'customerDiscountRule',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/customerDiscountRule/customerDiscountRule-delete-dialog.html',
                        controller: 'CustomerDiscountRuleDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['CustomerDiscountRule', function(CustomerDiscountRule) {
                                return CustomerDiscountRule.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('customerDiscountRule', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
