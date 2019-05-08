import React from 'react'
import {renderToString} from 'react-dom/server'
import Layout from './templates/Layout'
import getContent from './getContent'
import juice from 'juice'

export default function(children) {
  const body = renderToString(<Layout>asdas</Layout>)
  const html = getContent(body)

  return juice(html)
}
