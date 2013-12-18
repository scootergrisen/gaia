'use strict';

requireApp('system/shared/test/unit/mocks/mock_settings_listener.js');
requireApp('system/js/places.js');

var mocksForPlaces = new MocksHelper([
  'SettingsListener'
]).init();

suite('Places', function() {

  var url = 'http://google.com';

  mocksForPlaces.attachTestHelpers();

  suiteSetup(function(done) {
    Places.init(done);
  });

  setup(function(done) {
    Places.clear(done);
  });

  test('Storing and fetching a simple url', function(done) {
    Places.addVisit(url, function() {
      assert.ok(true, 'Added url');
      Places.getPlace(url, function(err, data) {
        assert.ok(data.url, 'Place has url');
        assert.ok(data.title, 'Place has title');
        assert.ok(data.frecency, 'Place has frecency');
        done();
      });
    });
  });

  test('Visit twice', function(done) {
    Places.addVisit(url, function() {
      Places.addVisit(url, function() {
        assert.ok(true, 'Added url');
        Places.getPlace(url, function(err, data) {
          assert.equal(data.frecency, 2, 'Visited twice');
          done();
        });
      });
    });
  });

  test('Update a place', function(done) {
    Places.addVisit(url, function(err, place) {
      var newPlace = {
        url: url,
        title: 'A Url',
        frecency: 2
      };
      Places.updatePlace(url, newPlace, function() {
        Places.getPlace(url, function(err, theNewPlace) {
          assert.equal(theNewPlace.frecency, 2);
          done();
        });
      });
    });
  });

  test('Update title', function(done) {
    Places.addVisit(url, function() {
      Places.setPlaceTitle(url, 'A New Title', function() {
        Places.getPlace(url, function(err, data) {
          assert.equal(data.title, 'A New Title');
          done();
        });
      });
    });
  });
});
