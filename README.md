local storage helper library
============================

usage
-----

storageHelper.set.local('key',{ name: 'value', content: 'store a json Object in local storage' });
storageHelper.get.local('key');
storageHelper.remove.local('key');

storageHelper.set.session('key',{ name: 'value', content: 'store a json Object in session storage' });
storageHelper.get.session('key');
storageHelper.remove.session('key');



// store / retrieve JSON object direct to storage
// checks storage exists
// handle wierd exception thrown in safari provate browsing


TODO:: handle cookie fallback
