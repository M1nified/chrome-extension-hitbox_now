"use strict";
var chrome;
var $httpBackend;
var ChromeSrvc,HitboxSrvc,AuthSrvc;
var allStreamsResponse2 = {
    request:{this:"\/media\/live\/list"},media_type:"live",livestream:[]
}
var twoWithCb = function(a,callback){
    if(typeof callback === 'function'){
        callback();
    }
}

var failTest = function(error){
    expect(error).toBeUndefined();
}
describe('Test launcher', () => {
    beforeEach(module('popup'))
    beforeEach(() => {
        chrome.storage = {
            sync : {
                get : twoWithCb,
                set : twoWithCb
            },
            local : {
                get : twoWithCb,
                set : twoWithCb
            }
        }
        spyOn(chrome.storage.sync, 'get');
        spyOn(chrome.storage.sync, 'set');
        spyOn(chrome.storage.local,'get');
        spyOn(chrome.storage.local,'set');
        // console.log('BEFORE CHROME')
        
        inject(($injector)=>{
            ChromeSrvc = $injector.get('ChromeSrvc');
            HitboxSrvc = $injector.get('HitboxSrvc');
            AuthSrvc = $injector.get('AuthSrvc');
            $httpBackend = $injector.get('$httpBackend');
        })
        
        var getAllStreamsRequestHandler = $httpBackend.when('GET','http://api.hitbox.tv/media/live/list').
            respond(allStreamsResponse2);
            
    });
    
    
    describe('MOCKS', () => {
        if(MOCKS){
            MOCKS.forEach((elem)=>{
                elem();
            }, this);
        }        
    });
        
});
    