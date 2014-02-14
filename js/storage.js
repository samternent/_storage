/*jslint browser: true*/

var storageHelper = storageHelper || (function (window) {
    'use strict';

    /* private methods */
    var settings = {
            storage: true,
            storageTested: false
        },
        
        library = {
            
            /* check local storage is available */
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
            }
        },
    
        set = {
            /* set to local storage */
            local: function (name, value, options) {
                library.checkStorage();
                if (settings.storage) {
                    window.localStorage.setItem(name, JSON.stringify(value));
                } else {
                    set.cookie(name, value);
                }
            },
            /* set to session storage */
            session: function (name, value, options) {
                library.checkStorage();
                if (settings.storage) {
                    window.sessionStorage.setItem(name, JSON.stringify(value));
                } else {
                    set.cookie(name, value, options);
                }
            },
            cookie: function (name, value, options) {
                options = options !== null ? options : {};
                // TODO: write some cookie logic
            }
        },
        
        get = {
            /* get from local storage */
            local: function (name) {
                library.checkStorage();
                return (settings.storage) ? JSON.parse(window.localStorage.getItem(name)) : get.cookie(name);
            },
            /* get from session storage */
            session: function (name) {
                library.checkStorage();
                return (settings.storage) ? JSON.parse(window.sessionStorage.getItem(name)) : get.cookie(name);
            },
            cookie: function (name) {
                //TODO: write some cookie logic
            }
        },
        
        remove = {
            /* remove from local storage */
            local: function (name) {
                library.checkStorage();
                if (settings.storage) {
                    window.localStorage.removeItem(name);
                } else {
                    remove.cookie(name);
                }
            },
            /* remove from session storage */
            session: function (name) {
                library.checkStorage();
                if (settings.storage) {
                    window.sessionStorage.removeItem(name);
                } else {
                    remove.cookie(name);
                }
            },
            /* remove cookie */
            cookie: function (name) {
                // TODO: write some cookie logic
            }
        },

        /* public methods */
        publicParts = {
            set: {
                local: set.local,
                session: set.session,
                cookie: set.cookie
            },
            get: {
                local: get.local,
                session: get.session,
                cookie: get.cookie
            },
            remove: {
                local: remove.local,
                session: remove.session,
                cookie: remove.cookie
            }
        };


    /* return */
    return publicParts;

}(window));
