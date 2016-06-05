"use strict";
if(!MOCKS) var MOCKS = [];
MOCKS.push(function(){
    var scope, FollowedCtrl, createCtrl;
    describe('FollowedCtrl',()=>{
        
        beforeEach(() => {
            inject(($rootScope,$controller)=>{
                scope = $rootScope.$new();
                createCtrl = function () {
                    return $controller('FollowedCtrl',{
                        '$scope':scope
                    })
                }
            })
        });
        afterEach(() => {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('should put live followed streams into $scope.streams',()=>{
            FollowedCtrl = createCtrl();
            expect(chrome.storage.local.get).toHaveBeenCalled();
        })    
    })
})