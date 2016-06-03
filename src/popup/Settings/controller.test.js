"use strict";
if(typeof MOCKS !== 'object') var MOCKS = [];
MOCKS.push(function(){
  var scope,SettingsCtrl,createCtrl;
  describe('SettingsCtrl', () => {
    
    beforeEach(() => {
      inject(($rootScope,$controller)=>{
        scope = $rootScope.$new();
        createCtrl = function(){
          return $controller('SettingsCtrl',{
            '$scope':scope
          })
        }
      })
    });
    
    
    describe('constructor of SettingsCtrl', () => {
      
      beforeEach(() => {
        SettingsCtrl = createCtrl();
      });
        
        
        it('should try to fill settings', () => {
          expect(chrome.storage.sync.get).toHaveBeenCalled();
          expect(typeof scope.settings).toBe('object');
        });
          
    });
    
    
    describe('debounce functions', () => {
      
      beforeEach(() => {
        SettingsCtrl = createCtrl();
      });
        
      
      it('should prevent instant saving', () => {
        scope.settings.notifications = true;
        scope.$apply();
        scope.settings.notifications = false;
        scope.$apply();
        expect(chrome.storage.sync.set).not.toHaveBeenCalled();
        
      });
      //?
      it('should should save settings after 700ms', () => {
        scope.$apply();
        ((function(){return new Promise((res,rej)=>setTimeout(()=>{
          expect(chrome.storage.sync.set).toHaveBeenCalled();
        },1000))})()).catch(failTest);
      });
        
        
    });
      
      
      
  });
    
})