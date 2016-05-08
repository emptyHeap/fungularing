/**
 * stupido controller for askWiki template
 * (shoud it be only for askWiki template?)
 */
class askWikiController {
  constructor(wikiGrubber) {
    this.results = []
    this.wikiGrubber = wikiGrubber
    this.query = wikiGrubber.lastQuery 
    this.sendRequest()
  }

  /**
   * getting wiki data
   */
  sendRequest() {
    this.wikiGrubber.search(
      this.query,
      angular.bind(this, this.requestSuccess),
      angular.bind(this, this.requestError)
    ) 
  }

  /**
   * error handler
   * @param {Object} data - http error
   */
  requestError(data) {
    console.log("you gotta XHR error")
    console.log(data)
  }

  /**
   * clear cache and current result list
   */
  clearCacheAndData() {
    this.results = []
    this.wikiGrubber.dropCache()
  }

  /**
   * success request handler
   */
  requestSuccess(data) {
    this.results = data.query.search
  }
}

askWikiController.$inject = ['wikiGrubber']

export default askWikiController
