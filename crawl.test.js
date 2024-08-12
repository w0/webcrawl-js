
import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

const bootExpected = 'blog.boot.dev/path'
const bootSearch = 'blog.boot.dev/path?sort=date'

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