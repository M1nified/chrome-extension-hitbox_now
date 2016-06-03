"use strict";

// var allStreamsResponse1 = JSON.parse(
//     '{"request":{"this":"\/media\/live\/list"},"media_type":"live","livestream":[{"media_user_name":"WellPlayRU","media_id":"939451","media_file":"WellPlayRU","media_user_id":"4367311","media_profiles":"[{\"height\":\"360\",\"fps\":\"30\",\"bitrate\":\"500\"},{\"height\":\"480\",\"fps\":\"30\",\"bitrate\":\"1000\"},{\"height\":\"720\",\"fps\":\"30\",\"bitrate\":\"2000\"}]","media_type_id":"1","media_is_live":"1","media_live_delay":"0","media_date_added":"2016-03-16 05:16:12","media_live_since":"2016-06-03 16:50:01","media_transcoding":"1","media_chat_enabled":"1","media_countries":["RU"],"media_hosted_id":null,"media_mature":null,"media_hidden":null,"media_offline_id":null,"user_banned":null,"media_name":"wellplayru","media_display_name":"WellPlayRU","media_status":"Wellplay Invitational by VitalBet : Fantastic Five (0) vs Danish Bears (1) || Bo3 || By Davidokkkk","media_title":"","media_tags":"","media_duration":"0.0000","media_bg_image":"\/static\/img\/channel\/cover_57388f82501b8.jpg","media_views":"3817","media_views_daily":"0","media_views_weekly":"0","media_views_monthly":"0","category_id":"2","category_name":"Dota 2","category_name_short":null,"category_seo_key":"dota-2","category_viewers":"7157","category_media_count":"16","category_channels":null,"category_logo_small":null,"category_logo_large":"\/static\/img\/games\/cover_dota-2_5742fe5acc504.png","category_updated":"2016-06-03 18:20:38","team_name":"wellplay","media_start_in_sec":"0","media_duration_format":"00:00:00","media_thumbnail":"\/static\/img\/media\/live\/wellplayru_mid_000.jpg","media_thumbnail_large":"\/static\/img\/media\/live\/wellplayru_large_000.jpg","channel":{"followers":"47","videos":"0","recordings":"0","teams":"1","user_id":"4367311","user_name":"WellPlayRU","user_status":"1","user_logo":"\/static\/img\/channel\/WellPlayRU_56e8f0caadf80_large.jpg","user_cover":"\/static\/img\/channel\/cover_57388f82501b8.jpg","user_logo_small":"\/static\/img\/channel\/WellPlayRU_56e8f0caadf80_small.jpg","user_partner":"1","partner_type":"self","user_beta_profile":"1","media_is_live":"1","media_live_since":"2016-06-03 16:50:01","user_media_id":"939451","twitter_account":null,"twitter_enabled":null,"livestream_count":"1","channel_link":"http:\/\/hitbox.tv\/wellplayru"}}]}');
if(!MOCKS) var MOCKS = [];
MOCKS.push(function(){
    
    describe('App Services', () => {
        describe('ChromeSrvc',()=>{
            describe('storageSyncGet', () => {
                it('should call chrome.storage.sync.get', () => {
                    ChromeSrvc.storageSyncGet({});
                    expect(chrome.storage.sync.get).toHaveBeenCalled();
                    expect(chrome.storage.sync.set).not.toHaveBeenCalled();
                });
            });
            describe('storageSyncSet', () => {
                it('should call chrome.storage.sync.set', () => {
                    ChromeSrvc.storageSyncSet({});
                    expect(chrome.storage.sync.set).toHaveBeenCalled();
                    expect(chrome.storage.sync.get).not.toHaveBeenCalled();
                });
            });
                
        });

        describe('HitboxSrvc', () => {
            
            describe('getLiveFollowed', () => {

                it('should call chrome.storage.local.get', () => {
                    HitboxSrvc.getLiveFollowed();
                    expect(chrome.storage.local.get).toHaveBeenCalled();
                });

            });
            
            describe('getAllStreams', () => {
                
                afterEach(() => {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });
                    
                it('should call $http.get', () => {
                    HitboxSrvc.getAllStreams()
                    $httpBackend.expectGET('http://api.hitbox.tv/media/live/list');
                    $httpBackend.flush()
                });
                    
            });
                
        });
        
        describe('AuthSrvc', () => {
            beforeEach(() => {
            });
            afterEach(()=>{
            })
            
            describe('login', () => {
                afterEach(() => {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });
                it('should attempt to login with no credentials given and fail cos of not token recieved', () => {
                    AuthSrvc.login({login:"",pass:""});
                    $httpBackend.expectPOST('http://api.hitbox.tv/auth/token').respond({"success":true,"error":false,"error_msg":"auth_failed"});
                    $httpBackend.flush();
                    
                });
                
                it('should attempt to login with given credentials and success', () => {
                    var userDataResponseSuccess = $httpBackend.when('GET','http://api.hitbox.tv/user/name').
                    respond(200,{"user_name":"name","user_id":"123456"});
                    AuthSrvc.login({login:"name",pass:"some_pass"}).
                    catch(failTest)
                    $httpBackend.expectPOST('http://api.hitbox.tv/auth/token',{data:{login:"name",pass:"some_pass",app:"desktop"},responseType:"json"}).
                    respond({"authToken":"0c3d0d7e8e94f718a1f287fb0d15a533720c109a"});
                    $httpBackend.expectGET('http://api.hitbox.tv/user/name')
                    $httpBackend.flush();
                    expect(chrome.storage.sync.set).toHaveBeenCalled();
                });
                    
                    
            });
                
        });
            
    });
})