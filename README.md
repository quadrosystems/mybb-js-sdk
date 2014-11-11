mybb-js-sdk
===========

MyBB Api version: 0.1

## Что это?
Это JavaScript библиотека для работы с Mybb API.

## Установка

Минифицированную версию можно скачать [здесь](#).

## Использование

### В браузере
Для выполнения API-запросов библиотека использует XhrHttpRequest() или вендора jQuery, экспортированного в Window, при ее наличии.

```
var Api = new MybbApiSDK('http://forum.mybb.ru/');

Api.call('users.get', {
    user_id: 2
}, function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});
```
В качестве адреса форума можно указать любую URL-подобную строку. Все методы API можно получить на форуме поддержки Mybb.ru http://forum.mybb.ru/pages/api_doc

### В NodeJS
```
var MybbApiSDK = require('./mybb.sdk');
```
Дальше как описано выше
