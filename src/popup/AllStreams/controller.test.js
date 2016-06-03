"use strict";
if(!MOCKS) var MOCKS = [];
MOCKS.push(function(){
    var AllStreamsCtrl, createCtrl, scope;
    describe('AllStreamsCtrl', () => {
        beforeEach(() => {
            inject(($rootScope,$controller)=>{
                scope = $rootScope.$new();
                createCtrl = function(){
                    return $controller('AllStreamsCtrl',{
                        '$scope' : scope
                    })
                }
            })
        });
        afterEach(() => {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('should put streams into $scope.streams', () => {
            AllStreamsCtrl = createCtrl();
            $httpBackend.expectGET('http://api.hitbox.tv/media/live/list');
            $httpBackend.flush();
        });
            
    });
});
