import sizeof from 'object-sizeof'

/**
 * http success callback
 * @callback successCallback
 * @param {Object} data - json from server
 */

/**
 * http error callback
 * @callback errorCallback
 * @param {Object} data - error info
 */

/**
 * Service for retriving information parts from wiki api
 * and maybe cache something (i believe that feature shoud be 
 * moved in other class from who wikiGrubber shoud be extended)
 */
class wikiGrubber {
  /**
   * Create a wiki grubber service
   * require $http
   */
  constructor($http){
    this.cache = {}
    this.approximateCacheSize = 4 * 1024 * 1024
    this.http = $http
    this.lastQuery = "looking for something?"
  }

  /**
   * Drop all cached data
   */
  dropCache(){
    this.cache = {}
  }

  /**
   * Retrive article about subject from wiki
   * @param {string} subject - retriving from wiki subject full-name (title)
   * @param {function[]} ...successAndError - success and error callbacks
   */
  details(subject, ...successAndError){
    this.cJSONP(
      'https://en.wikipedia.org/w/api.php?' + 
      'action=parse&section=0&prop=text&page=' +
      subject +
      '&utf8=true&format=json',
      'details',
      subject,
      ...successAndError
    )
  }

  /**
   * Retrive article list from wiki
   * @param {string} query - search query
   * @param {[successCallback, errorCallback]} ...successAndError - success and error callbacks
   */
  search(query, ...successAndError){
    this.lastQuery = query
    this.cJSONP(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&srsearch=' + 
      query +
      '&utf8=true&format=json',
      'search',
      query,
      ...successAndError)
  }

  /**
   * JSONP request with simplest ever caching
   * @param {string} url - request URL (exclude &callback param)
   * @param {string} cacheType - cached type identificator
   * (shoud be unique for each type of returned data)
   * @param {string} id - unique object key
   * @callback {successCallback} success - JSONP success callback
   *  
   * @param {errorCallback} [error=function(){}] - JSONP error callback
   */
  cJSONP(url, cacheType, id, success, error = function(){}){
    if (!this.cache[cacheType]) { this.cache[cacheType] = {} }
    if (this.cache[cacheType][id]) {
      success(this.cache[cacheType][id])
    } else {
      this.http.jsonp(
        url + '&callback=JSON_CALLBACK'
      ).
      success(
        angular.bind(
          this,
          function(data){
            this.cache[cacheType][id] = data
            success(data) 
          }
        )
      ).
      error(
        error
      )
    }
    this.cSizeControll()
  }
  /**
   * calculate cache size, remove oldest cached objects if size more than 
   * @param {int} this.approximateCacheSize
   */
  cSizeControll(){
    if (sizeof(this.cache) > this.approximateCacheSize){
      for (var key in this.cache) {
        for (var cacheType in this.cache[key]) {
          delete this.cache.details[key]
            delete this.cache.details[key]
            break
        }
      }
    }

  }
  /**
   * Factory
   * @return {wikiGrubber} instance
   */
  static wikiGrubberFactory($http){
    return new wikiGrubber($http);
  }
}

wikiGrubber.wikiGrubberFactory.$inject = [
  '$http'
]

export default wikiGrubber
