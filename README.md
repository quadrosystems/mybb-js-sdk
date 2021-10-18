mybb-sdk
===========

MyBB Api version: 0.9

[![](https://data.jsdelivr.com/v1/package/npm/@quadrosystems/mybb-sdk/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@quadrosystems/mybb-sdk)

## Что это?
Это JavaScript библиотека для работы с Mybb API.

## Установка

Минифицированную версию можно скачать [здесь](https://www.jsdelivr.com/package/npm/@quadrosystems/mybb-sdk).

```
npm install @quadrosystems/mybb-sdk
```

## Использование

### В браузере

```javascript
var mybb = new MybbSDK('https://forum.mybb.ru/', {
  format: 'json',
  charset: 'utf-8'
});
```

```javascript
mybb.call('users.get', {
    user_id: 2
}, function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});
```

promises
```javascript
mybb.call('users.get', {
  user_id: 2
})
.then(function(result) {
    console.log(result);
})
.catch(function(err) {
    console.log(err);
});
```

async/await
```javascript
async function() {
  try {
    const users = await mybb.call('users.get');
    console.log(users);
  } catch (e) {
    console.error(e);
  }
}
```
В качестве адреса форума можно указать любую URL-подобную строку. Все методы API можно получить по адресу https://mybb.ru/forumapi/

### В NodeJS
```javascript
var MybbSDK = require('@quadrosystems/mybb-sdk');
```
Дальше как описано выше


### Доступные методы:
```javascript
setToken(token: string)
withHash(hash: string)
getBoard(params?: GetBoardParams)
getForums(params?: GetForumParams)
getFunds()
getSubscriptions(params: GetSubscriptionsParams)
getFileMetadata(params: GetFileMetadataParams)
auth(login: string, password: string)
getUsers(params: GetUsersParams)
getOnlineUsers(params?: GetOnlineUsersParams)
getRespect(params?: GetRespectParams)
getTopics(params: GetTopicsParams)
getRecent(params?: GetRecentParams)
getPosts(params?: GetPostParams)
getPostVotes(params?: GetPostVotesParams)
storageSet(key: string, value: string, action?: 'append' | 'prepend')
storageGet(key: string)
storageKeys()
storageDelete(key: string)
storageFlush()
call(method: MethodType, params?: Record<string, any>, successCallback?: (response: any) => ({}), errorCallback?: (error: any) => ({}))
```
