/**
 * stupido controller for detailWiki template
 */
class detailWikiController {
  /**
   * init loading data by route params
   */
  constructor($routeParams, $location, wikiGrubber){
    this.name = $routeParams.subject 
    this.title = 'loading'
    this.text = 'loading'
    wikiGrubber.details($routeParams.subject, 
      angular.bind(this, function(data){
        this.title = data.parse.title
        this.text = data.parse.text["*"]
      })
    )
  }
}

detailWikiController.$inject = [
  '$routeParams',
  '$location',
  'wikiGrubber'
]

export default detailWikiController
