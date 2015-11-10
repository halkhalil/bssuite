'use strict';

angular.module('bssuiteApp')
    .controller('TxnActivityAuditController', function ($scope, TxnActivityAudit, TxnActivityAuditSearch, ParseLinks) {
        $scope.txnActivityAudits = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            TxnActivityAudit.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.txnActivityAudits = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            TxnActivityAudit.get({id: id}, function(result) {
                $scope.txnActivityAudit = result;
                $('#deleteTxnActivityAuditConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            TxnActivityAudit.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteTxnActivityAuditConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            TxnActivityAuditSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.txnActivityAudits = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.txnActivityAudit = {
                editedOn: null,
                txnNumber: null,
                txnType: null,
                txnAmount: null,
                bankAcc: null,
                editType: null,
                id: null
            };
        };
    });