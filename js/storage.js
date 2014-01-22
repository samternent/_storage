storageHelper = (function () {
    var settings = { storage: true },
        lib = {
            checkStorage: function () {
                if (typeof (window.Storage) !== 'undefined') {
                    try {
                        // test for safari private browsing exception
                        window.localStorage.setItem('test', 1);
                        window.localStorage.removeItem('test');
                        settings.storage = true;
                    } catch (e) {
                        settings.storage = false;
                    }
                } else {
                    settings.storage = false;
                }
            },
            // set to local storage
            setLocal: function (name, value) {
                lib.checkStorage();
                if (settings.storage) {
                    window.localStorage.setItem(name, JSON.stringify(value));
                    return true;
                } else {
                    return false;
                }
            },
            // set to session storage
            setSession: function (name, value) {
                lib.checkStorage();
                if (settings.storage) {
                    window.sessionStorage.setItem(name, JSON.stringify(value));
                    return true;
                } else {
                    return false;
                }
            },
            // get from local storage
            getLocal: function (name) {
                lib.checkStorage();
                return (settings.storage) ? JSON.parse(window.localStorage.getItem(name)) : false;
            },
            // get from session storage
            getSession: function (name) {
                lib.checkStorage();
                return (settings.storage) ? JSON.parse(window.sessionStorage.getItem(name)) : false;
            },
            // remove from local storage
            removeLocal: function (name) {
                lib.checkStorage();
                if (settings.storage) {
                    window.localStorage.removeItem(name)
                    return true;
                } else {
                    return false;
                }
            },
            // remove from session storage
            removeSession: function (name) {
                lib.checkStorage();
                if (settings.storage) {
                    window.sessionStorage.removeItem(name)
                    return true;
                } else {
                    return false;
                }
            }
        };

    return {
        setLocal: lib.setLocal,
        setSession: lib.setSession,
        getLocal: lib.getLocal,
        getSession: lib.getSession,
        removeLocal: lib.removeLocal,
        removeSession: lib.removeSession
    };
}());