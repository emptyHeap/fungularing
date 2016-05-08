angular.module('askWikiFilters', []).
  filter('relativeToDomain', 
  () => {
    return (html, domain) => {
      return html.replace(/(href=")\//g, '$1' + domain + '/')
    }
  }).
  filter('hrefToAppCommand', () => {
    return (html) => {
      return html.replace(/(href=")\/[^"]*\/([^"]*")/g, '$1#askWiki/$2' )
    } 
  }).
  filter('regexpReplace',
  () => {
    // shoud be pretty messy in html
    return (input, regexp, replace) => {
      return input.replace(regexp, replace)
    }
  })
