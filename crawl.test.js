
import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

const bootExpected = 'blog.boot.dev/path'
const bootSearch = 'blog.boot.dev/path?sort=date'

const link = '<a href="https://boot.dev">Learn Backend Development</a>'
const relative = '<a href="/page2">Wow page 2!!!</a>'

const bigBody = `<body>
    <h1>Welcome to My Page</h1>
    <p>Here are some useful links:</p>
    <ul>
        <li><a href="https://www.example.com">Example Website</a></li>
        <li><a href="https://www.example.com/mycoolpage">My Cool Page</a></li>
    </ul>
</body>`


test ('http', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe(bootExpected)
})

test ('https', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe(bootExpected)
})

test('trailing path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe(bootExpected)
})

test('missing protocol', () => {
    expect(normalizeURL('blog.boot.dev/path')).toBe(bootExpected)
})

test('Search parameters', () => {
    expect(normalizeURL('https://blog.boot.dev/path?sort=date')).toBe(bootSearch)
})

test('Single URL', () => {
    expect(getURLsFromHTML(link, 'https://boot.dev')).toStrictEqual(['https://boot.dev/'])
})

test('Multiple URLs', () => {
    expect(getURLsFromHTML(bigBody, 'https://www.example.com')).toStrictEqual(['https://www.example.com/', 'https://www.example.com/mycoolpage'])
})

test('Relative URL', () => {
    expect(getURLsFromHTML(relative, 'http://www.boot.dev')).toStrictEqual(['http://www.boot.dev/page2'])
})