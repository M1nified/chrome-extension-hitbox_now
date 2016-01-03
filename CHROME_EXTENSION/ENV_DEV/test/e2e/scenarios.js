'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
/*scope={streams:[{media_display_name:"testFilter",category_name:"aa",media_views:"b",media_status:"live"}]};*/
describe('startup', function() {

  it('should redirect popup.html to popup.html#/following', function() {
    browser().navigateTo('background/popup.html');
    expect(browser().location().url()).toBe('/following');
  });

});

describe('allstreams',function(){
  var $httpBackend, $rootScope, createController, authRequestHandler;
  beforeEach(function(){
    browser().navigateTo('background/popup.html#/allstreams');

    $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('GET', '/auth.py')
     .respond({livestream:[{media_display_name:"testFilter",category_name:"aa",media_views:"b",media_status:"live"}]});
   })

  it('should display all streams',function(){
    expect(browser().location().url()).toBe('/allstreams');
    //expect(scope.streams.length).toBe(1);
  });

})