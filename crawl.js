function normalizeURL(url) {
  let someURL
  try {
    someURL = new URL(url)   
  } catch (err) {
    someURL = new URL(`http://${url}`)
  }

  let normalized = someURL.hostname
  
  if (someURL.pathname.endsWith('/')) {
    normalized = normalized.concat(someURL.pathname.slice(0,-1))
  } else {
    normalized = normalized.concat(someURL.pathname)
  }

  if (someURL.search) {
    normalized = normalized.concat(someURL.search)
  }

  return normalized
}

import { JSDOM } from 'jsdom'

function getURLsFromHTML(html, baseURL) {
  const theDOM = new JSDOM(html)
  const allAnchors = theDOM.window.document.querySelectorAll('a')

  const foundURLs = []

  for (const anchor of allAnchors) {
    if (anchor.toString().startsWith(baseURL)) {
      foundURLs.push(anchor.toString())
    } else {
      foundURLs.push(`${baseURL}${anchor.toString()}`)
    }
    
  }

  return foundURLs
}

export { normalizeURL, getURLsFromHTML }