angular.module('popup', ['ngRoute']);
angular.module('popup').config(['$routeProvider', function routeConfig($routeProvider) {
    $routeProvider.when('/AllStreams', {
        templateUrl: 'AllStreams/main.html',
        controller: 'AllStreamsCtrl'
    }).when('/Followed', {
        templateUrl: 'Followed/main.html',
        controller: 'FollowedCtrl'
    }).when('/Login', {
        templateUrl: 'Login/main.html',
        controller: 'LoginCtrl'
    }).when('/Settings', {
        templateUrl: 'Settings/main.html',
        controller: 'SettingsCtrl'
    }).when('/Streams', {
        templateUrl: 'Streams/main.html',
        controller: 'StreamsCtrl'
    }).otherwise({
        redirectTo: '/Followed'
    });
}]);
angular.module('popup').service('ChromeSrvc', function ($rootScope, $q) {
	return {
		storageSyncGet: function (query) {
			var deferred = $q.defer();
			chrome.storage.sync.get(query, function (data) {
				if (data) {
					deferred.resolve(data);
				} else {
					deferred.reject();
				}
			});
			return deferred.promise;
		},
		storageSyncSet: function (query) {
			chrome.storage.sync.set(query, function (data) {});
		}
	};
});

angular.module('popup').service('HitboxSrvc', function ($rootScope, $q, $http) {
	return {
		getLiveFollowed: function () {
			var deferred = $q.defer();
			chrome.storage.local.get({ livestream: null }, function (response) {
				console.log(response);
				if (response) {
					deferred.resolve(response);
				} else {
					deferred.reject();
				}
			});
			return deferred.promise;
		},
		getAllStreams: function () {
			var deferred = $q.defer();
			$http.get("http://api.hitbox.tv/media/live/list").success(function (response) {
				console.log(response);
				if (response) {
					deferred.resolve(response);
				} else {
					deferred.reject();
				}
			}).error(function () {
				deferred.reject();
			});
			return deferred.promise;
		}
	};
});
angular.module('popup').service('AuthSrvc', function ($http) {
	return {
		login: function (form) {
			return $http.post('http://api.hitbox.tv/auth/token', {
				data: {
					login: form.login,
					pass: form.pass,
					app: "desktop"
				},
				responseType: "json"
			}).then(response => {
				let data = response ? response.data : response;
				if (data && data.authToken) {
					return $http.get("http://api.hitbox.tv/user/" + form.login).then(userdata => {
						userdata = userdata ? userdata.data : null;
						if (userdata && userdata.user_id) {
							chrome.storage.sync.set({
								auth_token: data.auth_token,
								login: form.login,
								user_id: userdata.user_id
							}, () => {
								$location.path('/Followed');
							});
						}
					});
				}
			});
		}
	};
});
"use strict";

angular.module('popup').controller('AllStreamsCtrl', function ($scope, HitboxSrvc) {
	HitboxSrvc.getAllStreams().then(result => {
		$scope.streams = result ? result.livestream : null || null;
	});
});
angular.module('popup').controller('PopupCtrl', function ($scope, $location, ChromeSrvc) {
  $scope.isActive = function (dir) {
    return dir === $location.path();
  };
  $scope.logout = function () {
    chrome.storage.sync.clear(() => {
      document.location.href = "";
    });
  };
  $scope.updateBtn = function (evt) {
    chrome.runtime.sendMessage({
      query: "update"
    }, response => {});
    $("#updateBtn-img").stop();
    $({ deg: 0 }).animate({ deg: -360 }, {
      duration: 1000,
      step: function (now) {
        $("#updateBtn-img").css({
          transform: 'rotate(' + now + 'deg)'
        });
      }
    });
    $location.path() !== '/followed' && document.location.reload();

    ChromeSrvc.storageSyncGet({
      auth_token: null, user_id: null, login: null
    }).then(result => {
      result.auth_token === null || result.user_id === null && (document.location.herf = '#/Login');
      $scope.auth_token = result.auth_token;
      $scope.user_id = result.user_id;
      $scope.login = result.login;
      user_id = result.user_id;
    });
  };
});
angular.module('popup').controller('FollowedCtrl', function ($scope, HitboxSrvc) {
    HitboxSrvc.getLiveFollowed().then(result => {
        $scope.streams = result ? result.livestream : null || null;
    });
});
"use strict";

angular.module('popup').controller('LoginCtrl', function ($scope, AuthSrvc) {
    $scope.submit = AuthSrvc.login;
});
"use strict";

angular.module('popup').controller('SettingsCtrl', function ($scope, $timeout, ChromeSrvc) {
  $scope.settings = {
    notification: null,
    interval: null
  };
  ChromeSrvc.storageSyncGet('settings').then(settings => {
    $scope.settings = settings && Object.keys(settings).length > 0 ? settings.settings : $scope.settings;
  });
  let timeout = null,
      saveSettings = function () {
    ChromeSrvc.storageSyncSet({ settings: $scope.settings });
  },
      debounceSaveSettings = function (newVal, oldVal) {
    console.log(oldVal, newVal);
    timeout && $timeout.cancel(timeout);
    timeout = $timeout(saveSettings, 700);
  };

  $scope.$watch('settings.notifications', debounceSaveSettings);
  $scope.$watch('settings.interval', debounceSaveSettings);
});
