/**
 * stupido controller for detailWiki template
 */
class detailWikiController {
  /**
   * init loading data by route params
   */
  constructor($scope, $routeParams, $location, wikiGrubber){
    $scope.name = $routeParams.subject 
    $scope.title = 'loading'
    $scope.text = 'loading'
    wikiGrubber.details($routeParams.subject, 
      function(data){
        $scope.title = data.parse.title
        $scope.text = data.parse.text["*"]
      }
    )
  }
}

detailWikiController.$inject = [
  '$scope',
  '$routeParams',
  '$location',
  'wikiGrubber'
]

export default detailWikiController
