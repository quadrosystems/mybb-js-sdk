(function(global, factory) {
  'use strict';

  if (typeof exports !== 'undefined') {
    module.exports = factory(global);
  } else {
    global.MybbSDK = factory(global);
  }
}(this, function(context) {
  'use strict';

  var environment;
  if (typeof exports !== 'undefined') {
    environment = 'node';
  } else if (context.$) {
    environment = 'jquery';
  }  else {
    environment = 'xhr';
  }

  var Api = function(host) {
    this.version = '0.2';
    this.originalHost = host;
    this.hostname = undefined;
    this.protocol = undefined;
    this.path = '/api.php';

    this.request = undefined;

    this.init();
  };

  Api.prototype.init = function() {
    this.parseUrl(this.originalHost);
    this.registerRequestService(environment);
  };

  Api.prototype.parseUrl = function(url) {
    if (!url) {
      throw new Error('Hostname not specified and should be a string');
    }

    var urlParseRE = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
    var matches = urlParseRE.exec(url);
    this.hostname = matches[11];
    this.protocol = matches[4];

    if (!this.hostname) {
      throw new Error('Cannot get hostname from arguments');
    }
  };

  Api.prototype.registerRequestService = function(env) {
    this.request = new RequestFactory().getInstance(env);
  };

  Api.prototype.call = function(method, params, successCallback, errorCallback) {
    return new Promise(function(resolve, reject) {
      params.method = method;

      var requestObject = {
        host: this.hostname,
        port: this.protocol === 'http:' ? 80 : 443,
        path: this.path,
        method: 'GET',
      };

      this.request(requestObject, params, function(result) {
        if (result.response) {
          resolve(result.response);
          (typeof successCallback === 'function') && successCallback(result.response);
        }
        else if (result.error) {
          reject(result.error);
          (typeof errorCallback === 'function') && errorCallback(result.error);
        }
      });
    });
  };

  var Methods = function() {
    this.registry = {};
  };

  Methods.prototype.register = function(name, method, requirements) {
    this.registry[name] = new Method(name, method, requirements);
  };

  var Method = function(options) {
    this.name = options.name;
    this.method = options.method;
    this.requirements = options.requirements;
  };

  var Registry = new Methods();
  Registry.register('getUsers', 'users.get', {'OR': ['user_id', 'username']});
  Registry.register('getFunds', 'board.getFunds');
  Registry.register('getBoard', 'board.get');
  Registry.register('getUserList', 'users.orderedList');

  Method.prototype.isValid = function(options) {
    // todo
  };

  Method.prototype.build = function() {};
  Method.prototype.request = function() {};

  var RequestFactory = function() {
    this.instances = {};
    this.registry = {
      'jquery': RequestJQuery,
      'xhr': RequestXhr,
      'node': RequestNode,
    };
  };

  RequestFactory.prototype.getInstance = function(name) {
    if (typeof this.instances[name] === 'undefined') {
      this.instances[name] = this.registry[name];
    }

    return this.instances[name];
  };

  var RequestXhr = function(options, params, callback){
    var _params = '';

    for (var key in params) {if (params.hasOwnProperty(key)) {
      _params += key + '=' + params[key] + '&';
    }}

    var url = [options.protocol, '//', options.host, options.path, '?', _params].join(''),
      xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {return;}
      callback && callback(JSON.parse(xhr.responseText));
    };
    xhr.send(null);
  };

  var RequestJQuery = function(options, params, callback){
    context.$.ajax({
      dataType: 'json',
      url: [options.protocol, '//', options.host, options.path].join(''),
      data: params,
      method: 'GET',
      success: callback.bind(null),
      error: function(err) {
        console.log(err);
      },
    });
  };

  var RequestNode = function(options, params, callback){
    options.path += '?' + require('querystring').stringify(params);
    var req = require(options.port === 80 && 'http' || 'https').request(options, function(res) {
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function(){
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log(e);
        }
        callback && callback(data);
      });
    });
    req.on('error', function(err){
      console.log(err);
    });
    req.end();
  };

  //    Api.prototype = Methods.registry;

  return Api;
}));
