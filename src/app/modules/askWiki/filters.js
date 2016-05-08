angular.module('askWikiFilters', []).
  filter('relativeToDomain', () => {
    return (
      /**
       * replace relative links to absolute to absolute with passed parameter
       * as prefix
       * @param {string} html filter input
       * @param {string} domain - prefix for absolute links or http domain name
       * @return {string} with only absolute links
       */
      (html, domain) => {
        if (domain.indexOf("http")){
          html = "http://" + html
        }
        return html.replace(/(href=")\//g, '$1' + domain + '/')
      }
    )
  }).
  filter('hrefToAppCommand', () => {
    return (
      /**
       * modify wiki articles content to change relative links
       * @param {string} html modifying html code
       * @return {string} html code with modified links
       */
      (html) => {
        return html.replace(/(href=")\/[^"]*\/([^"]*")/g, '$1#askWiki/$2' )
      }
    ) 
  }).
  filter('regexpReplace', () => {
    return ( 
      /**
       * js replace function
       * @param {string} input filter input
       * @param {replace params} ..params parameters for javascript replace function
       * @return modified string
       */ 
      (input, ...params) => {
        return input.replace(...params)
      }
    )
  })
