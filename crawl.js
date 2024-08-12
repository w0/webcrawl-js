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

export { normalizeURL }
