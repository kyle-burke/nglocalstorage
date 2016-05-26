[![Build Status](https://api.travis-ci.org/kyle-burke/nglocalstorage.svg)](https://api.travis-ci.org/kyle-burke/nglocalstorage)

# $localStorage
A little Angular 1.x service that uses Angular's wrapper for $window and will take arguments
to set up expiration for your localStorage items. Passing in a timestamp in the future on the
`$localStorage.set` method will create a setTimeout to clean out your item.

If an expiration timestamp is given, an extra localStorage item is created that tracks that timestamp.
Calling `$localStorage.checkExpiredItems()` on future page loads (probably in your main module's run block)
will make a pass through localStorage items and reinitialize timers or remove expired items.
