;(function (window) {
  'use strict';

  var settings = {
      storage: true,
      storageTested: false
    },

    storageSample = {
      value: {},
      expires: {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        months: 0,
        years: 0
      }
    },

    library = {

      // check local storage is available
      checkStorage: function () {
        if (!settings.storageTested) {
          library.testStorage();
        }
      },

      testStorage: function () {
        settings.storageTested = true;
        if (typeof (window.Storage) !== 'undefined') {
          try {

            // test for safari private browsing exception
            window.localStorage.setItem('teststorage', 1);
            window.localStorage.removeItem('teststorage');
            settings.storage = true;
          } catch (e) {
            settings.storage = false;
          }
        } else {
          settings.storage = false;
        }
      },

      extend: function () {
        for (var i = 1; i < arguments.length; i++)
          for (var key in arguments[i])
            if (arguments[i].hasOwnProperty(key))
              arguments[0][key] = parseInt(arguments[i][key], 10);
        return arguments[0];
      },
      calculateDate: function (times) {

        var now = new Date();

        return new Date(
          now.getFullYear() + times.years,
          now.getMonth() + times.months,
          now.getDate() + times.days,
          now.getHours() + times.hours,
          now.getMinutes() + times.minutes,
          now.getSeconds() + times.seconds,
          now.getMilliseconds() + times.milliseconds
        );

      }
    },

    set = {

      /**
      * Set local storage object
      * @param {string} - key
      * @param {object} - value object
      * @param {object} (optional) - expiry object
      */
      local: function (name, value, options) {
        library.checkStorage();
        if (settings.storage) {
          window.localStorage.setItem(name, JSON.stringify(set.dataObj(value, options)));
        }
      },

      /**
      * Set session storage object
      * @param {string} - key
      * @param {object} - value object
      * @param {object} (optional) - expiry object
      */
      session: function (name, value, options) {
        library.checkStorage();
        if (settings.storage) {
          window.sessionStorage.setItem(name, JSON.stringify(set.dataObj(value, options)));
        }
      },
      dataObj: function (value, options) {
        var storage = Object.create(storageSample);

        if (options !== undefined) {
          storage.expires = library.calculateDate(
            library.extend(storageSample.expires, options)
          );

          if (storage.expires - new Date() === 0) {
            delete storage.expires;
          }
        }

        storage.value = value;

        return storage;
      }
    },

    get = {

      /**
      * Get local storage object
      * @param {string} - key
      * @returns {object} - JSON value object
      */
      local: function (name) {
        library.checkStorage();
        if (settings.storage) {
          var store = JSON.parse(window.localStorage.getItem(name));
          return get.dataObj(store, name, 'local');
        }
      },

      /**
      * Get session storage object
      * @param {string} - key
      * @returns {object} - JSON value object
      */
      session: function (name) {
        library.checkStorage();
        if (settings.storage) {
          var store = JSON.parse(window.sessionStorage.getItem(name));
          return get.dataObj(store, name, 'session');
        }
      },
      dataObj: function (store, name, type) {
        if (!store) {
          return false;
        }

        if (store.hasOwnProperty('expires')) {
          if (new Date(store.expires) - new Date() > 0) {
            return store.value;
          } else {

            // Object has expired remove previously set object
            remove[type](name);
            return false;
          }
        } else {
          return store.value;
        }
      }
    },

    remove = {

      /**
      * Remove local storage object
      * @param {string} - key
      */
      local: function (name) {
        library.checkStorage();
        if (settings.storage) {
          window.localStorage.removeItem(name);
        }
      },

      /**
      * Remove session storage object
      * @param {string} - key
      */
      session: function (name) {
        library.checkStorage();
        if (settings.storage) {
          window.sessionStorage.removeItem(name);
        }
      }
    },

    expose = {
      set: {
        local: set.local,
        session: set.session
      },
      get: {
        local: get.local,
        session: get.session
      },
      remove: {
        local: remove.local,
        session: remove.session
      }
    };

  window._storage = expose;

}(window));
