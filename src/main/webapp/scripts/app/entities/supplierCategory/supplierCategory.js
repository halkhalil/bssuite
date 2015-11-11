'use strict';

angular.module('bssuiteApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('supplierCategory', {
                parent: 'entity',
                url: '/supplierCategorys',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'SupplierCategorys'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/supplierCategory/supplierCategorys.html',
                        controller: 'SupplierCategoryController'
                    }
                },
                resolve: {
                }
            })
            .state('supplierCategory.detail', {
                parent: 'entity',
                url: '/supplierCategory/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'SupplierCategory'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/supplierCategory/supplierCategory-detail.html',
                        controller: 'SupplierCategoryDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'SupplierCategory', function($stateParams, SupplierCategory) {
                        return SupplierCategory.get({id : $stateParams.id});
                    }]
                }
            })
            .state('supplierCategory.new', {
                parent: 'supplierCategory',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/supplierCategory/supplierCategory-dialog.html',
                        controller: 'SupplierCategoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    code: null,
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('supplierCategory', null, { reload: true });
                    }, function() {
                        $state.go('supplierCategory');
                    })
                }]
            })
            .state('supplierCategory.edit', {
                parent: 'supplierCategory',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/supplierCategory/supplierCategory-dialog.html',
                        controller: 'SupplierCategoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['SupplierCategory', function(SupplierCategory) {
                                return SupplierCategory.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('supplierCategory', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('supplierCategory.delete', {
                parent: 'supplierCategory',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/supplierCategory/supplierCategory-delete-dialog.html',
                        controller: 'SupplierCategoryDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['SupplierCategory', function(SupplierCategory) {
                                return SupplierCategory.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('supplierCategory', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
