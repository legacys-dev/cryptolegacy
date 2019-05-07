import {route} from '@orion-js/app'

route('/', async function({params, query, pathname, request, headers, response, getBody}) {
  return 'hello world'
})
