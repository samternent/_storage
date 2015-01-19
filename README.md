###Local storage helper library

A simple library to iron out browser quirks and support for browser storage

####Usage

```var key = 'key-name';```
```var value = {
    title: 'about',
    description: 'store any valid JSON object in local storage'
};```
```var expiryOptions = {
    days: 14,
    months: 1,
    years: 1
};```

Sets storage object
```_storage.set.local(key, value, expiryOptions);```
```_storage.set.session(key, value, expiryOptions);```

Returns storage object by key name
```_storage.get.local(key);```
```_storage.get.session(key);```

Removes storage object by key name
```_storage.remove.local(key);```
```_storage.remove.session(key);```
