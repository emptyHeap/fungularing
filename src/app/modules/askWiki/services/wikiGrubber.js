import sizeof from 'object-sizeof'

class wikiGrubber {
  constructor($http){
    this.cache = {}
    this.approximateCacheSize = 4 * 1024 * 1024
    this.http = $http
  }
  dropCache(){
    this.cache = {}
  }
  details(subject, ...successAndError){
    this.cJSONP(
      'https://en.wikipedia.org/w/api.php?' + 
      'action=parse&section=0&prop=text&page=' +
      subject +
      '&utf8=true&format=json&callback=JSON_CALLBACK',
      'details',
      subject,
      ...successAndError
    )
  }
  search(query, ...successAndError){
    this.cJSONP(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&srsearch=' + 
      query +
      '&utf8=true&format=json&callback=JSON_CALLBACK',
      'search',
      query,
      ...successAndError)
  }
  cJSONP(url, cacheType, id, success, error = function(){}){
    console.log(success)
    if (!this.cache[cacheType]) { this.cache[cacheType] = {} }
    if (this.cache[cacheType][id]) {
      success(this.cache[cacheType][id])
    } else {
      this.http.jsonp(
        url
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
  cSizeControll(){
    console.log(this.cache)
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
  static wikiGrubberFactory($http){
    return new wikiGrubber($http);
  }
}

wikiGrubber.wikiGrubberFactory.$inject = [
  '$http'
]

export default wikiGrubber
