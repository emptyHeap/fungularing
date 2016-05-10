/**
 * stupido controller for askWiki template
 * (shoud it be only for askWiki template?)
 */
class askWikiController {
  constructor($scope, wikiGrubber) {
    $scope.results = []
    $scope.query = wikiGrubber.lastQuery 
    /**
     * getting wiki data
     */
    $scope.sendRequest = () => {
      wikiGrubber.search(
        $scope.query,
        $scope.requestSuccess,
        $scope.requestError
      ) 
    }

    /**
     * error handler
     * @param {Object} data - http error
     */
    $scope.requestError = (data) => {
      console.log("you gotta XHR error")
      console.log(data)
    }

    /**
     * clear cache and current result list
     */
    $scope.clearCacheAndData = () => {
      $scope.results = []
      wikiGrubber.dropCache()
    }

    /**
     * success request handler
     */
    $scope.requestSuccess = (data) => {
      $scope.results = data.query.search
    }
    
    $scope.sendRequest()
  }
}

askWikiController.$inject = ['$scope', 'wikiGrubber']

export default askWikiController
