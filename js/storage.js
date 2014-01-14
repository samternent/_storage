window.easyStore = (function () {

    var settings = {
            storage: true,
            cookie: true,
            userSettings: {
                cookieExp: 365,
                name: '',
                value: '',
                cookieFallBack: false
            }
        },

        easyStore = {
            checkStorage: function (name, value) {
                settings.userSettings.name = name;
                settings.userSettings.value = value;
                if (window.Storage) {
                    try {
                        settings.storage = true;

                        // test for safari private browsing exception
                        window.localStorage.setItem('test', 1);
                        window.localStorage.removeItem('test');

                        settings.storage = true;
                    } catch (e) {
                        settings.storage = false;
                    }
                    try {
                        settings.cookie = navigator.cookieEnabled ? true : false;
                        if (typeof navigator.cookieEnabled == 'null' && !settings.cookie)
                        {
                            document.cookie = 'test';
                            settings.cookie = (document.cookie.indexOf('test') != -1) ? true : false;
                            document.cookie = 'test=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        }
                    } catch (e) {
                        settings.cookie = false;
                    }
                } else {
                    settings.storage = false;
                }
            },

            // set to storage

            // set to local storage
            setLocal: function (name, value, usrSet) {
                // set what type has been used
                settings.userSettings.type = 'setLocal';
                settings.userSettings.method = 'set';
                settings.userSettings.cookieFallBack = usrSet;

                easyStore.checkStorage(name, value);
                if (settings.storage) {
                    window.localStorage.setItem(name, JSON.stringify(value));
                    return easyStore.exit(true);
                } else {
                    return easyStore.exit(false);
                }
            },
            // set to session storage
            setSession: function (name, value, usrSet) {
                // set what type has been used
                settings.userSettings.type = 'setSession';
                settings.userSettings.method = 'set';
                settings.userSettings.cookieFallBack = usrSet;

                easyStore.checkStorage(name, value);
                if (settings.storage) {
                    window.sessionStorage.setItem(name, JSON.stringify(value));
                    return easyStore.exit(true);
                } else {
                    return easyStore.exit(false);
                }
            },
            // set to cookie
            setCookie: function (name, value) {
                // set what type has been used
                settings.userSettings.type = 'setCookie';
                settings.userSettings.method = 'set';

                easyStore.checkStorage(name, value);

                var d = new Date(),
                    expires;
                d.setTime(d.getTime()+(settings.userSettings.cookieExp*24*60*60*1000));
                expires = 'expires='+d.toGMTString();

                document.cookie = name + '=' + JSON.stringify(value) + '; ' + expires;
                return easyStore.exit(true);
            },

            // retrieval from storage

            // get from local storage
            getLocal: function (name, usrSet) {
                // set what type has been used
                settings.userSettings.type = 'getLocal';
                settings.userSettings.method = 'get';
                settings.userSettings.cookieFallBack = usrSet;

                easyStore.checkStorage(name);
                if (settings.storage) {
                    return easyStore.exit(JSON.parse(window.localStorage.getItem(name)));
                } else {
                    return easyStore.exit(false);
                }
            },
            // get from session storage
            getSession: function (name, usrSet) {
                // set what type has been used
                settings.userSettings.type = 'getSession';
                settings.userSettings.method = 'get';
                settings.userSettings.cookieFallBack = usrSet;

                easyStore.checkStorage(name);
                if (settings.storage) {
                    return easyStore.exit(JSON.parse(window.sessionStorage.getItem(name)));
                } else {
                    return easyStore.exit(false);
                }
            },
            // get from cookie
            getCookie: function (name, usrSet) {
                // set what type has been used
                settings.userSettings.type = 'getCookie';
                settings.userSettings.method = 'get';
                settings.userSettings.cookieFallBack = usrSet;

                easyStore.checkStorage(name);

                name += '=';
                var cookies = document.cookie.split(';');
                for(var i=0; i<cookies.length; i++) {
                  var c = cookies[i].trim();
                  if (c.indexOf(name) == 0) {
                      return c.substring(name.length,c.length);
                  }
                }
                return false;
            },

            exit: function (success) {
                if(!success) {
                    if (settings.userSettings.cookieFallBack && settings.userSettings.type !== 'setCookie') {
                        if (settings.userSettings.method === 'set') {
                            easyStore.setCookie(settings.userSettings.name, settings.userSettings.value);
                        } else {
                            easyStore.getCookie(settings.userSettings.name);
                        }
                    }
                }
                return success;
            }
    }

    return {
        setLocal: easyStore.setLocal,
        setSession: easyStore.setSession,
        setCookie: easyStore.setCookie,
        getLocal: easyStore.getLocal,
        getSession: easyStore.getSession,
        getCookie: easyStore.getCookie
    }
}());