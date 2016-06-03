"use strict";
var chrome;
var AllStreamsCtrl, createCtrl, scope;
var $httpBackend;
var allStreamsResponse2 = {
    request:{this:"\/media\/live\/list"},media_type:"live",livestream:[]
}
describe('AllStreamsCtrl', () => {
    beforeEach(module('popup'))
    beforeEach(() => {
        chrome = {
            storage : {
                sync : {
                    get : function(){},
                    set : function(){}
                },
                local : {
                    get : function(){},
                    set : function(){}
                }
            }
        }
        spyOn(chrome.storage.sync, 'get');
        spyOn(chrome.storage.sync, 'set');
        spyOn(chrome.storage.local,'get');
        spyOn(chrome.storage.local,'set');
        
        inject(($injector)=>{
            // AllStreamsCtrl = $injector.get('AllStreamsCtrl');
            $httpBackend = $injector.get('$httpBackend');
        })
        
        inject(($rootScope,$controller)=>{
            scope = $rootScope.$new();
            createCtrl = function(){
                return $controller('AllStreamsCtrl',{
                    '$scope' : scope
                })
            }
        })
        
        var getAllStreamsRequestHandler = $httpBackend.when('GET','http://api.hitbox.tv/media/live/list').
        respond(allStreamsResponse2);
    });
    
    
    it('should put streams into $scope.streams', () => {
        AllStreamsCtrl = createCtrl();
        $httpBackend.expectGET('http://api.hitbox.tv/media/live/list');
    });
        
});
    