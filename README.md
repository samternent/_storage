storageHelper
=========

Local storage library

- created to solve issue with safari private browsing... window.Storage exists but throws exception if you try to use it :s
- handles parse and stringify objects to store in local or session storage so full object can be passed an retrieved

storageHelper.setLocal('localVar', 'this is a session storage var');

var obj = {
  id: 1,
  name: 'objName',
  details: {
    one: 'you can pass complex objects',
    two: 'or just single string/int',
    three: 'to be stored in local or session storage'
  }
};

storageHelper.setSession('sessionObj', obj);  // return true or false if set

storageHelper.getSession('sessionObj');       // return true or false if retrieved

storageHelper.removeSession('sessionObj');    // return true or false is deleted
