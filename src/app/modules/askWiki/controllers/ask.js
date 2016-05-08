class askWikiController {
  constructor(wikiGrubber) {
    this.query = 'looking for something?'
    this.results = []
    this.wikiGrubber = wikiGrubber
  }
  sendRequest() {
    this.wikiGrubber.search(
      this.query,
      angular.bind(this, this.requestSuccess),
      angular.bind(this, this.requestError)
    ) 
    
  }
  requestError(data) {
    console.log("you gotta XHR error")
    console.log(data)
  }
  clearCacheAndData() {
    this.results = []
    this.wikiGrubber.dropCache()
  }
  requestSuccess(data) {
    this.results = data.query.search
  }
}

askWikiController.$inject = ['wikiGrubber']

export default askWikiController
