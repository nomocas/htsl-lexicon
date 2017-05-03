# htsl-lexicon

[![Travis branch](https://img.shields.io/travis/nomocas/htsl-lexicon/master.svg)](https://travis-ci.org/nomocas/htsl-lexicon)
[![bitHound Overall Score](https://www.bithound.io/github/nomocas/htsl-lexicon/badges/score.svg)](https://www.bithound.io/github/nomocas/htsl-lexicon)
[![bitHound Dependencies](https://www.bithound.io/github/nomocas/htsl-lexicon/badges/dependencies.svg)](https://www.bithound.io/github/nomocas/htsl-lexicon/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/nomocas/htsl-lexicon/badges/devDependencies.svg)](https://www.bithound.io/github/nomocas/htsl-lexicon/master/dependencies/npm)
[![npm-downloads](https://img.shields.io/npm/dm/htsl-lexicon.svg)]()
[![npm](https://img.shields.io/npm/v/htsl-lexicon.svg)]()
[![licence](https://img.shields.io/npm/l/htsl-lexicon.svg)]()
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

> HTML javascript DSL. Remove "m" from HTML.

Hyper Text Specific Language. Small, Fast, Clean and Powerful.

This library is simply a lexicon containing HTML5 related words made with [babelute](https://github.com/nomocas/babelute).

It offers out-of-the-box :
- Natural and clean __Functional javascript syntax__ for writting HTML fragments.
- Natural Web __Components definitions__ and usage.
- Natural and clean __React-like one-way data-binding__ (or no-binding-at-all).
- Natural and easy __Dialects management__.
- __Free outputs engine__ (DOM, String, Diffing, ... or bridges with existing frameworks) (see below)
- No JSX, and so __no transpilation is needed__.

As all lexicon, it only gives words aimed to encapsulate/catch information and kowledge of its own domain, and so it does not provide any implementation.

So, it should be used in conjonction with an output engine (called Pragmatics in babelute's vocabulary).

For the moment it exists :
- [htsl-dom-pragmatics](https://github.com/nomocas/htsl-dom-pragmatics)
	- DOM Engine demo
- [htsl-string-pragmatics](https://github.com/nomocas/htsl-string-pragmatics)
	- Ultra fast server side string rendering.
- [htsl-dom-diffing-pragmatics](https://github.com/nomocas/htsl-dom-diffing-pragmatics)
	- __One of the lightest__ modern pure js html lib avaiable (around 4Ko gzipped with dependencies) 
	- __One of the fastest DOM diffing engine__ (fastest than Mithril in chrome and firefox - several times faster than React)
	- Immutables based comparison. 
	- Algo that will show excellent behaviour when scalling. More components you have, more optimisation happend.
	- Play really well with other libs (redux, immutables, jquery, ...).
	- Simple and easy to understand algorithm. No more esoteric interpretation. You are the master.
- htsl-two-pass-pragmatics
	- Perfectly isomorphic HTML-to-String output (real isomorphism is much more than just printing html to string). (work in progress)

And it could be extended for any other rendering engine. (example coming soon)

## Dialects

- [htsl-meta-tag-lexicon](https://github.com/nomocas/htsl-meta-tag-lexicon)
- [htsl-uikit-lexicon](https://github.com/nomocas/htsl-uikit-lexicon)
- [htsl-foundation-6-lexicon](https://github.com/nomocas/htsl-foundation-6-lexicon)

## Plugins

- [htsl-component](https://github.com/nomocas/htsl-component) : React Style Component
- htsl-postal-component ([component](https://github.com/nomocas/htsl-component) with [postaljs](https://github.com/postaljs/postal.js))
- [htsl-router](https://github.com/nomocas/htsl-router) : Router for htsl.

## Examples

- [htsl-todomvc](https://github.com/nomocas/htsl-todomvc)
- [nomocas.github.io](https://github.com/nomocas/nomocas.github.io)

## Benchmark

Already done but need publication.

## Genesis

Please refer to [designing a DSL](https://github.com/nomocas/babelute/blob/master/manual/designing-dsl.md) to understand __how this could be constructed and extended__.

Then take a look to [sources](https://github.com/nomocas/htsl-lexicon/blob/master/src/index.js). Everything is there.

## Install

```
npm i --save babelute htsl-lexicon
```

## Usage

```javascript
h.h1('A first').div(h.class('my-div'), 'html fragment...');
```

Basical example (no state, pure HTML5 lexicon) :
```javascript
import htslLexicon from 'htsl-lexicon';

const h = htslLexicon.initializer();

const aFlag = true,
	items = ['one', 'two', 'three'],
	inputHandler = (e) => console.log('input : %s', e.currentTarget.value);

const mySentence = h
	.h1('hello world')
	.div(h.class('my-div'), 'something to say...')
	.if(aFlag, () => h.ul(
		h.class('my-list')
		.each(items, (item) => h.li(item))
	))
	.section(
		h.id('my-section')
		.textInput('aValue', h.attr('name', 'zoo').on('input', inputHandler))
		.article(
			h.html('<div>Lollipop...</div>')
		)
		...
	)
	...
```

## Outputs Engines

For the moment, there is three main outputs engines (an output engine for babelute sentences is called __pragmatics__) listed above.

Lets use the DOM engine first :

```
npm i --save babelute htsl-lexicon htsl-dom-pragmatics
```
(or yarn add ...)

```javascript
import htslLexicon from 'htsl-lexicon';

// simply load your engine.
// here it adds directly a method in htslLexicon : .$toDOM(DomElement)
import pragmas from 'htsl-dom-pragmatics'; 

const h = htslLexicon.initializer(),
	$root = document.getElementById('app');

h.h1('hello world').div(h.class('my-div'), 'something to say...').$toDOM($root);
```
String output : 
```
npm i --save babelute htsl-lexicon htsl-string-pragmatics
```
```javascript
import htslLexicon from 'htsl-lexicon';

// simply load your engine.
// here it adds directly a method in htslLexicon : .$toHTMLString()
import pragmas from 'htsl-string-pragmatics'; 

const h = htslLexicon.initializer();

const stringOutput = h.h1('hello world').div(h.class('my-div'), 'something to say...').$toHTMLString();
```

Dom-diffing : 
```
npm i --save babelute htsl-lexicon htsl-dom-diffing-pragmatics
```
```javascript
import htslLexicon from 'htsl-lexicon';

// simply load your engine.
// here it adds directly a method in htslLexicon : .$render(DomElement, oldRendered)
import pragmas from 'htsl-dom-diffing-pragmatics'; 

const h = htslLexicon.initializer(true), // use firstLevel initializer
	$root = document.getElementById('app');

let rendered;

//...

rendered = h.h1('hello world').div(h.class('my-div'), 'something to say...').$render($root, rendered);
```
(see [htsl-todomvc](https://github.com/nomocas/htsl-todomvc) for example)
## API

### .text

`.text(value:String)` : Create a textNode with provided value.


`.nbsp()` : Create a non-breaking space.


### Tags

Create a tag :
`.tag(tagName:String, children:Array<String|Babelute>)`

```javascript
h.tag('div', [h.class('foo'), 'some text', h.div(...)..., ...]);
```

`children` is an array of
- Babelute (that define attributes or DOMElement children)
- or String (for text node).

Any following tags is made of `.tag(name, children)` :

`['body', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'section', 'span', 'button', 'main', 'article', 'hr', 'header', 'footer', 'label', 'ul', 'li', 'p', 'small', 'b', 'strong', 'i', 'u', 'title', 'meta', 'table', 'tr', 'td', 'tbody', 'form', 'br', 'abbr', 'textarea']`

and is implemented as 

```javascript
function(...children) {
	return this.tag(tagName, children);
}
```

and so could be used as :
```javascript
h.div(h.class('foo').p('my paragraph...'), 'bla bla...', h.span(...))
```

### img

`.img(src:String, ...children:<Babelute|String>)` : create an img tag

```javascript
h.img('./img/myimage.png', h.class('my-image'))
```

### a

`.a(href:String, ...children:<Babelute|String>)`
```javascript
h.a('https://www.w3.org/', 'the text...', h.class('my-image'))
```

### Attributes and co

`.attr(attrName:String, value:*)` : set attrbute in current node.

`.class(className:String, flag:Boolean = true)` : add class to current node (not if flag == false).

`.classes('foo bar zoo')` : add classes to current node (will not be diffed).

`.prop(propName:String, value:*)` : Set property in current node.

`.data(propName:String, value:*)` : Set data-* attributes in current node (propName shoud be in camelCase).

`.id(name:String)` : Set id to current node.

`.style(styleName:String, value:String)` : Set style to current node.


### .visible and .display

`.visible(flag:Boolean = true)` : equivalent to `.style('visibility', flag ? 'visible' : 'hidden')`


`.display(flag:<Boolean|String> = true)`
- if flag is boolean : equivalent to `.style('display', flag ? '' : 'none')`
- if flag is string : equivalent to `.style('display', flag)`

### .disabled

`.disabled(flag:Boolean = true)` : equivalent to `.prop('disabled', flag)`


### Events

`.on(eventName:String, handler:Function, ...args = null)`


All current events : `['click', 'blur', 'focus', 'submit', 'mouseover', 'mousedown', 'mouseup', 'mouseout', 'touchstart', 'touchend', 'touchcancel', 'touchleave', 'touchmove', 'drop', 'dragover', 'dragstart']`

Usage : 

`.click(handler:Function, ...args = null)`

### .input and co

`.input(type:String, val:*, babelute:Babelute)`

`.textInput(val:*, babelute:Babelute)`

`.emailInput(val:*, babelute:Babelute)`

`.hiddenInput(val:*, babelute:Babelute)`

`.passwordInput(val:*, babelute:Babelute)`

`.submitInput(val:*, babelute:Babelute)`

`.checkbox(checked:Bool, babelute:Babelute)`

`.radio(checked:Bool, babelute:Babelute)`


### .select and .option


There is two way to use select :

Auto creation of options from an array of objects containing options infos :<br/>
`.select(selected:String, options:Array, babelute = undefined)`

```javascript
const myOptions = [{ value:'en', label:'EN' }, { value:'fr', label:'FR' }];

h.select(
	'en', 
	myOptions, 
	h.class('my-select').on('change', myHandler)
)
```

and :<br/>
`.select(options:Babelute)`<br/>
with<br/>
`.option(value:String, content:<Babelute|String>, isSelected:Boolean = false)`

```javascript
h.select(
	h.class('my-select').on('change', myHandler)
	.option('en', 'EN', true)
	.option('fr', 'FR')
)
```

or with .each (see below) :
```javascript
const myOptions = [{ value:'en', label:'EN' }, { value:'fr', label:'FR' }];

h.select(
	h.class('my-select').on('change', myHandler)
	.each(myOptions, (opt) => h.option(opt.value, opt.label, opt.value === 'en'))
)
```

### .contentEditable
`.contentEditable(opt:Object)`

```
opt = { 
	value:*, 
	updateHandler:Function, 
	?valueType : "text"|"html"|"integer", 
	?updateOnEvent : "blur", 
	?isEditable : true, 
	?placeholder : '...' 
}
```

```javascript
let editable = true;
const contentUpdated = (value) => console.log('content updated : %s', value);

h.div(h.contentEditable({
	value:'my initial value', 
	updateHandler:contentUpdated,
	isEditable : editable, 
	placeholder : 'Some useful text...' 
}));
```
=> div will be editable (default : update on "blur" event and content is text)



### .link and .linkCSS

`.link(href:String, rel:String, babelute:Babelute = undefined)` : create a link tag

`.linkCSS(href:String)` : a link tag to load an external css file

### .scriptLink and .scriptRaw

`.scriptLink(src:String, type:String = 'text/javascript')` : create a script tag to load ressource

`.scriptRaw(content:String, type:String = 'text/javascript')` : create a script tag with inner script.

### .if

`.if(condition:Boolean, isTrue:<Babelute|Function>, isFalse:<Babelute|Function>)`

```javascript
let condition = false;

h.if(condition, 

	// returned babelute will be inserted if condition is true (could be also a direct babelute)
	() => h.div('is true...'), 

	// will be inserted if condition is false (could be also a function that return a babelute)
	h.p('is false...')
)`
```

### .each and .keyedEach

`.each(collection:Array<*>, handler:Function)`

```javascript
h.each(['one', 'two', 'three'], (item, index) => h.div(item, ...))
```

__Rem__ : `keyedEach` is almost finished. 

### ._use

(From babelute core)

`._use(lexemRef:String|babelute:Babelute, ...args)`

```javascript

```

### .switchUse

A special lexem made with dom-diffing in mind.

`.switchUse(lexemRef:String, ...args)`


### .onDom and .onString

`.onDOM((node) => node.classList.add('foo'))`

`.onString((descriptor) => descriptor.children += '...')`

### .container

`.container((ctrl) => h.div('...', h.click(ctrl.unmount)))`

## Dialecting

Dialecting == Create and Isolate Compounds words made from another lexicon.

Compound Word == Word made with other words.

It's simply a clean way to encapsulate sentences fragments in functions.

Dialects examples :
- [htsl-meta-tag-lexicon](https://github.com/nomocas/htsl-meta-tag-lexicon)
- [htsl-uikit-lexicon](https://github.com/nomocas/htsl-uikit-lexicon)
- [htsl-foundation-6-lexicon](https://github.com/nomocas/htsl-foundation-6-lexicon)
- [htsl-todomvc](https://github.com/nomocas/htsl-todomvc)

```javascript
import htmlLexicon from 'htsl-lexicon';
const myDialectLexicon = htmlLexicon.createDialect('my-dialect')
	.addCompounds((h) => {
		return {
			myCompoundWord(arg1, arg2) {
				return this.section(h.class('my-coumpound'), 'bla bla...')...;
			},
			myOtherCompoundWord(...args) {
				return this.each(args, (item) => h.div(item.name, ...));
			}
		};
	});

...

const h = myDialectLexicon.initialier();

const sentence = h.myCompoundWord('hello', 'world').myOtherCompoundWord({ name:'one' }, { name:'two' })...;

```


## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright 2016-2017 (c) Gilles Coomans <gilles.coomans@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
