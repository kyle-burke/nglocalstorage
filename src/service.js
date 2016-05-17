(function() {
  'use strict';
  angular
    .module('$localStorage', [])
    .factory('$localStorage', $localStorage);
  $localStorage.$inject = ['$window'];
  /* @ngInject */
  function $localStorage($window) {
    var service = {
      get: get,
      set: set,
      checkExpiredItems: checkExpiredItems
    };
    return service;
    ////////////////
    function get(key) {
      return $window.localStorage.getItem(key);
    }

    function set(key, value, expiration) {
      if (expiration !== undefined && Date.parse(expiration) === NaN) {
        throw new Error('Invalid timestamp string given');
        return false;
      }

      $window.localStorage.setItem(key, value);

      if (expiration !== undefined) {
        $window.localStorage.setItem(key+'-expiration', expiration);
        _registerExpiration(key, expiration);
      }
    }

    function remove(key) {
      $window.localStorage.removeItem(key);
      $window.localStorage.removeItem(key+'-expiration');
    }

    // ideally called in your main module's run block
    function checkExpiredItems() {
      for (var key in $window.localStorage) {
        if (key.indexOf('-expiration') > -1) {
          _registerExpiration(key.replace('-expiration', ''), $window.localStorage.getItem(key+'-expiration'));
        }
      }
    }

    function _registerExpiration(key, expiration) {
      var timeLeft = expiration - new Date();
      if (timeLeft <= 0) {
        remove(key);
      }
      else {
        setTimeout(function() {
          remove(key);
        }, timeLeft);
      }
    }
  }
})();