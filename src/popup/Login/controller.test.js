"use strict";
if(!MOCKS) var MOCKS = [];
MOCKS.push(function(){
  var scope, LoginCtrl, createCtrl;
  describe('LoginCtrl', () => {
    
    beforeEach(() => {
      inject(($rootScope,$controller)=>{
        scope = $rootScope.$new();
        createCtrl = function(){
          return $controller('LoginCtrl',{
            '$scope':scope
          })
        }
      })
    });
    
    beforeEach(() => {
      LoginCtrl = createCtrl();
    });
          
    it('should set submit as function', () => {
      expect(typeof scope.submit).toBe('function');
    });
  });
    
})