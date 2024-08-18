function normalizeURL(url) {
  let someURL
  try {
    someURL = new URL(url)
  } catch (err) {
    someURL = new URL(`http://${url}`)
  }

  let normalized = someURL.hostname

  if (someURL.pathname.endsWith('/')) {
    normalized = normalized.concat(someURL.pathname.slice(0, -1))
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
    try {
      const url = new URL(anchor.toString(), baseURL)
      foundURLs.push(url.href)
    } catch (err) {
      console.log(err)
    }
  }

  return foundURLs
}

async function fetchURL(url) {
  let currentPage
  try {
    currentPage = await fetch(url)
  } catch (err) {
    throw new Error(`Unable to fetch: ${err}`)
  }

  if (currentPage.status >= 400) {
    console.log(new Error(`HTTP Error: ${currentPage.status}`))
    return
  }

  const type = currentPage.headers.get('Content-Type')

  if (!type.includes('text/html')) {
    console.log(new Error(`Content-Type not text/html: ${type}, ${url}`))
    return
  }

  return await currentPage.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const currentURLObj = new URL(currentURL)
  const baseURLObj = new URL(baseURL)

  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages
  }

  const currentNormalized = normalizeURL(currentURL)

  if (Object.hasOwn(pages, currentNormalized)) {
    pages[currentNormalized]++
    return pages
  }

  pages[currentNormalized] = 1

  const body = await fetchURL("https://" + currentNormalized)

  const foundURLs = getURLsFromHTML(body, baseURL)
  
  for (const url of foundURLs) {
    pages = await crawlPage(baseURL, url, pages )
  }

  return pages

}

export { normalizeURL, getURLsFromHTML, crawlPage }