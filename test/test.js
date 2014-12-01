var assert = require('assert')
var parse  = require('../')

// test parser
assert.equal(parse('***foo***'),
                   '<p><strong><em>foo</em></strong></p>\n')
assert.equal(parse('# **blah**'),
                   '<h1><a name="--blah--"></a><strong>blah</strong></h1>\n')
assert.equal(parse('Blah blah\n-----'),
                   '<h2><a name="blah-blah"></a>Blah blah</h2>\n')

// test sanitizer
assert.equal(parse('<a href="blah" id="wat">foo</a>'),
                   '<p><a href="blah">foo</a></p>\n')

assert.equal(parse('<a href=blah>foo</a>'),
                   '<p><a href="blah">foo</a></p>\n')

assert.equal(parse('<div><i>foo <b>blah</i></b>'),
                   '<div><i>foo <b>blah</b></i></div>')

assert.equal(parse('<a class="evil" href="blah">foo</a>'),
                   '<p></p>\n')

// highlighter
assert.equal(parse('```js\nvar foo = "bar";\n```'),
                   '<pre><code class="lang-js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">"bar"</span>;\n</code></pre>\n')
