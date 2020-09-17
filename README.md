mybb-sdk
===========

MyBB Api version: 0.2

## Что это?
Это JavaScript библиотека для работы с Mybb API.

## Установка

Минифицированную версию можно скачать [здесь](#).

```
npm install mybb-sdk
```

## Использование

### В браузере
Для выполнения API-запросов библиотека использует XMLHttpRequest() или вендора jQuery, экспортированного в Window, при ее наличии.

```
var Api = new MybbSDK('http://forum.mybb.ru/');

Api.call('users.get', {
    user_id: 2
}, function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});

Api.call('users.get', {
  user_id: 2
})
.then(function(result) {
    console.log(result);
})
.catch(function(err) {
    console.log(err);
});
```
В качестве адреса форума можно указать любую URL-подобную строку. Все методы API можно получить по адресу https://mybb.ru/forumapi/

### В NodeJS
```
var MybbApiSDK = require('mybb-sdk');
```
Дальше как описано выше
