describe('$localStorage', function() {
  var $localStorage, $window;

  beforeEach(module('$localStorage'));
  beforeEach(inject(function(_$localStorage_, _$window_) {
    $localStorage = _$localStorage_;
    $window = _$window_;
  }));


  it('should set an item correctly', function() {
    $localStorage.set('test', 'value');
    expect($window.localStorage.getItem('test')).toEqual('value');
  });

  it('should set an item with an expiration', function() {
    var expiration = Date.now() + 100;
    $localStorage.set('test', 'value', expiration);

    expect($window.localStorage.getItem('test-expiration')).not.toBe(null);
  });

  it('should remove an item after it has expired', function() {
    jasmine.clock().install();

    var expiration = Date.now() + 10;
    $localStorage.set('test', 'value', expiration);

    jasmine.clock().tick(11);

    expect($window.localStorage.getItem('test')).toBe(null);
    expect($window.localStorage.getItem('test-expiration')).toBe(null);

    jasmine.clock().uninstall();
  });
});