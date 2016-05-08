class detailWikiController {
  constructor($routeParams, $location, wikiGrubber){
    this.location = $location
    this.routeParams = $routeParams
    this.grubber = wikiGrubber

    this.name = $routeParams.subject 
    this.title = 'loading'
    this.text = 'loading'
    wikiGrubber.details(this.routeParams.subject, 
      angular.bind(this, function(data){
        this.title = data.parse.title
        this.text = data.parse.text["*"]
      })
    )
    //this.JSONP()
  }
  JSONP(){
    this.http.jsonp(
      'https://en.wikipedia.org/w/api.php?' + 
      'action=parse&section=0&prop=text&page=' +
      this.routeParams.subject +
      '&utf8=true&format=json&callback=JSON_CALLBACK'
    ).
    success(
      angular.bind(this, function(data){
        this.title = data.parse.title
        this.text = data.parse.text["*"]
      })
    )
 }
  newSearch(){
    this.location.path( '/askWiki/' + this.query )
  }
}

detailWikiController.$inject = [
  '$routeParams',
  '$location',
  'wikiGrubber'
]

export default detailWikiController
