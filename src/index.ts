import fetch from 'isomorphic-fetch';
import {CharsetType, FormatType,
  GetBoardParams,
  GetFileMetadataParams, GetForumParams, GetOnlineUsersParams, GetPostParams, GetPostVotesParams, GetRecentParams,
  GetRespectParams, GetSubscriptionsParams, GetTopicsParams, GetUsersParams, MethodType, Options} from './types';

class MybbSDK {
  private readonly originalHost: string;
  private readonly path: string;
  private readonly format: FormatType;
  private readonly charset: CharsetType;
  private hostname: string | undefined;
  private protocol: string | undefined;
  private token: string | undefined;
  private hash: string | undefined;

  constructor(host: string | undefined, options?: Options) {
    this.originalHost = host;
    if (!host && typeof window !== undefined && document.location.origin) {
      this.originalHost = document.location.origin;
    }
    this.path = '/api.php';
    this.format = options && options.format || 'json';
    this.charset = options && options.charset || 'utf-8';

    this.init();
  }

  init(): void {
    this.parseUrl(this.originalHost);
  }

  parseUrl(url: string | undefined): void {
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
  }

  setToken(token: string) {
    this.token = token;
    return this;
  }

  withHash(hash: string) {
    this.hash = hash;
    return this;
  }

  getBoard(params?: GetBoardParams) {
    return this.call('board.get', params)
  }

  getForums(params?: GetForumParams) {
    return this.call('board.getForums', params);
  }

  getFunds() {
    return this.call('board.getFunds');
  }

  getSubscriptions(params: GetSubscriptionsParams) {
    return this.call('board.getSubscriptions', params);
  }

  getFileMetadata(params: GetFileMetadataParams) {
    return this.call('board.getFileMetadata', params);
  }

  auth(login: string, password: string) {
    return this.call('board.auth', {
      login,
      password
    });
  }

  getUsers(params: GetUsersParams) {
    return this.call('users.get', params);
  }

  getOnlineUsers(params?: GetOnlineUsersParams) {
    return this.call('users.getOnline', params);
  }

  getRespect(params?: GetRespectParams) {
    return this.call('users.getRespect', params);
  }

  getTopics(params: GetTopicsParams) {
    return this.call('topic.get', params);
  }

  getRecent(params?: GetRecentParams) {
    return this.call('topic.getRecent', params);
  }

  getPosts(params?: GetPostParams) {
    return this.call('post.get', params);
  }

  getPostVotes(params?: GetPostVotesParams) {
    return this.call('post.getVotes', params);
  }

  storageSet(key: string, value: string, action?: 'append' | 'prepend') {
    return this.call('storage.set', {
      token: this.token,
      key,
      value,
      action
    });
  }

  storageGet(key: string) {
    return this.call('storage.get', {
      token: this.token,
      key
    });
  }

  storageKeys() {
    return this.call('storage.keys');
  }

  storageDelete(key: string) {
    return this.call('storage.delete', {
      token: this.token,
      key,
    });
  }

  storageFlush() {
    return this.call('storage.flush', {
      token: this.token
    });
  }

  async call(method: MethodType, params?: Record<string, any>, successCallback?: (response: any) => ({}), errorCallback?: (error: any) => ({})): Promise<any> {
    const requestObject = {
      host: this.hostname,
      port: this.protocol === 'http:' ? 80 : 443,
      path: this.path,
      apiMethod: method,
      method: 'GET',
    };

    const response = await this.request(requestObject, params);
    if (response.response) {
      (typeof successCallback === 'function') && successCallback(response.response);
      return response.response;
    }
    else if (response.error) {
      console.error(response);
      if (typeof errorCallback === 'function') {
        errorCallback(response.error)
      } else {
        throw new Error(response.error);
      }
    }
  }

  async request(requestObject: Record<string, any>, requestParams: Record<string, any>): Promise<any> {
    let params = [];
    params.push('method=' + requestObject.apiMethod);
    params.push('format=' + this.format);
    params.push('charset=' + this.charset);

    for (const key in requestParams) {if (requestParams.hasOwnProperty(key)) {
      const value = Array.isArray(requestParams[key]) ? requestParams[key].map(encodeURIComponent).join(',') : encodeURIComponent(requestParams[key]);
      params.push(key + '=' + value);
    }}
    const url = [requestObject.protocol, '//', requestObject.host, requestObject.path, '?', params.join('&')].join('');
    return fetch(url, {
      method: requestObject.method || 'GET',
      headers: {
        Cookie: this.hash ? `mybb_ru=${this.hash}` : undefined
      }
    }).then(response => this.format === 'json' ? response.json() : response.text());
  }
}

export default MybbSDK;
