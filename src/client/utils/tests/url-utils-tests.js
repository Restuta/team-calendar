import { createTest } from 'tests/test-utils'
import { addUrlParams } from '../url-utils'


const test = createTest('Url Utils')

test('addUrlParams url with no params and trailing slash and object with one param', t => {
  const urlWithTrailingSlash = 'http://rcn.io/'
  const params = { p: 8 }
  const newUrl = addUrlParams(urlWithTrailingSlash, params)

  t.equal(newUrl, 'http://rcn.io/?p=8', 'should add param after ?')
  t.end()
})


test('addUrlParams url with no params and no trailing slash and object with one param', t => {
  const urlWithoutTrailingSlash = 'http://rcn.io'
  const params = { p: 8 }
  const newUrl = addUrlParams(urlWithoutTrailingSlash, params)

  t.equal(newUrl, 'http://rcn.io/?p=8', 'should add param after ? and also trailing slash')
  t.end()
})

test('addUrlParams url with no params and no trailing slash and object with two params', t => {
  const url = 'http://rcn.io'
  const params = { p1: 1, p2: 2 }
  const newUrl = addUrlParams(url, params)

  t.equal(newUrl, 'http://rcn.io/?p1=1&p2=2', 'should add two params after ?')
  t.end()
})

test('addUrlParams with params in the url', t => {
  const url = 'http://rcn.io'
  const params = { ['encode&me']:'and me'}
  const newUrl = addUrlParams(url, params)

  t.equal(newUrl, 'http://rcn.io/?encode%26me=and%20me', 'should add two params after ?')
  t.end()
})
