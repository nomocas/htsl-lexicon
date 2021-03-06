/**
 * ***** Babelute HTML5 DSL lexicon *****
 * 
 * @author Gilles Coomans
 * @licence MIT
 * @copyright 2016-2017 Gilles Coomans
 */
/**
 * @external {Lexicon} https://github.com/nomocas/babelute
 */
import bbl from 'babelute';
import domUtils from 'nomocas-webutils/lib/dom-utils'; // only used in contentEditable. safe for server and string output usage.

/**
 * html lexicon
 * @type {Lexicon}
 * @public
 * @see  https://github.com/nomocas/htsl
 */
const htmlLexicon = bbl.createLexicon('html');

/*******
 *******	LANGUAGE ATOMS (all words that are engine dependent)
 *******/

htmlLexicon.addAtoms(['tag', 'attr', 'prop', 'data', 'class', 'classes', 'id', 'style', 'text', 'onDom', 'onString', 'if', 'each', 'keyedEach', 'html', 'component', 'ref', 'container', 'raw']);

/*******
 *******	COMPOUNDS WORDS (words based on language atoms)
 *******/

// simple tags (made with .tag) (list should be completed if needed)
htmlLexicon.tagsList = ['body', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'section', 'span', 'button', 'main', 'article', 'hr', 'header', 'footer', 'label', 'ul', 'li', 'p', 'small', 'b', 'strong', 'i', 'u', 'title', 'meta', 'table', 'tr', 'td', 'tbody', 'form', 'br', 'abbr', 'textarea', 'pre', 'code'];

// events (made with .on) (list should be completed if needed)
htmlLexicon.eventsList = ['click', 'blur', 'focus', 'submit', 'mouseover', 'mousedown', 'mouseup', 'mouseout', 'touchstart', 'touchend', 'touchcancel', 'touchleave', 'touchmove', 'drop', 'dragover', 'dragstart'];

htmlLexicon
	.addAliases({
		switchUse(lexemRef, ...args) {
			return this._append('html', 'switchUse', [lexemRef, args]);
		},
		on(eventName, callback, ...args) {
			return this._append('html', 'on', [eventName, callback, args]);
		}
	})
	.addCompounds(() => {
		const methods = {};
		htmlLexicon.tagsList.forEach((tagName) => {
			methods[tagName] = function() {
				return this._append('html', 'tag', [tagName, arguments]);
			};
		});
		htmlLexicon.eventsList.forEach((eventName) => {
			methods[eventName] = function(callback, ...args) {
				return this._append('html', 'on', [eventName, callback, args]);
			};
		});
		return methods;
	})
	.addCompounds((h) => {
		return {
			a(...children) {
				children[0] = h.attr('href', children[0]);
				return this.tag('a', children);
			},
			img(...children) {
				children[0] = h.attr('src', children[0]);
				return this.tag('img', children);
			},
			nbsp() {
				return this.text('\u00A0');
			},
			select(selected, options, babelute = undefined) {
				if (arguments.length === 1) // use a simple tag that receive a babelute as child (first arg)
					return this.tag('select', [selected]);
				return this.tag('select', [
					h.each(options, (option) => h.option(option.value, option.label, option.value === selected)),
					babelute
				]);
			},
			option(value, content, selected) {
				return this.tag('option', [h.attr('value', value).prop('selected', !!selected), content]);
			},
			input(type, val, babelute) {
				return this.tag('input', [h.attr('type', type).prop('value', val), babelute]);
			},
			textInput(val, babelute) {
				return this.input('text', val, babelute);
			},
			emailInput(val, babelute) {
				return this.input('email', val, babelute);
			},
			passwordInput(val, babelute) {
				return this.input('password', val, babelute);
			},
			submitInput(val, babelute) {
				return this.tag('input', [h.attr('type', 'submit').attr('value', val), babelute]);
			},
			hiddenInput(val, babelute) {
				return this.tag('input', [h.attr('type', 'hidden').attr('value', val), babelute]);
			},
			checkbox(checked, babelute) {
				return this.tag('input', [h.attr('type', 'checkbox').prop('checked', !!checked), babelute]);
			},
			radio(checked, babelute) {
				return this.tag('input', [h.attr('type', 'radio').prop('checked', !!checked), babelute]);
			},
			link(href, rel, babelute) {
				return this.tag('link', [h.attr('href', href).attr('rel', rel), babelute]);
			},
			linkCSS(href) {
				return this.link(href, 'stylesheet', h.attr('type', 'text/css'));
			},
			scriptLink(src, type = 'text/javascript') {
				return this.tag('script', [h.attr('src', src).attr('type', type)]);
			},
			scriptRaw(content, type = 'text/javascript') {
				return this.tag('script', [h.attr('type', type).prop('innerText', content)]);
			},
			visible(yes) {
				return this.style('visibility', !yes ? 'hidden' : 'visible');
			},
			display(flag) {
				return this.style('display', typeof flag === 'string' ? flag : (!flag ? 'none' : '')); // reseting display with empty string as in http://jsbin.com/wasuvi/1/edit?html,js,output
			},
			disabled(flag) {
				return this.prop('disabled', !!flag);
			},
			contentEditable(opt = {} /*{ value, updateHandler, valueType = "text"[|"html"|"integer"], updateOnEvent = "blur", isEditable = true, placeholder = '...', multiline: false } */ ) {

				const contentProperty = opt.valueType === 'html' ? 'innerHTML' : 'textContent';
				return this
					.on('keydown', e => {
						const code = e.keyCode ? e.keyCode : e.which;
						if (!opt.multiline && code === 13 /* enter */ )
							e.preventDefault();
						else if (code === 27 /* esc */ )
							e.currentTarget.blur();
						else if (opt.maxLength && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && [37, 38, 39, 40 /* arrows */ , 8 /* backspace */, 9 /* tab */ ].indexOf(code) === -1 && e.currentTarget[contentProperty].length > opt.maxLength)
							e.preventDefault();
					})
					.prop('contentEditable', !!opt.isEditable)
					.class('content-edited', !!opt.isEditable)
					.prop(contentProperty, opt.value || opt.placeholder || '')
					.on('focus', e => {
						const val = domUtils.castNodeValueTo(e.currentTarget, opt.valueType || 'text');
						if (val === opt.placeholder)
							e.currentTarget[contentProperty] = '';
					})
					.on(opt.updateOnEvent || 'blur', e => {
						const val = domUtils.castNodeValueTo(e.currentTarget, opt.valueType || 'text');
						if (val !== opt.value && val !== opt.placeholder)
							opt.updateHandler(val);
						else if (val === '')
							e.currentTarget[contentProperty] = opt.placeholder || '';
					})
					.click((e) => {
						if (opt.isEditable) {
							const val = domUtils.castNodeValueTo(e.currentTarget, opt.valueType || 'text');
							if (opt.placeholder && val === opt.placeholder)
								e.currentTarget[contentProperty] = '';
						}
					});
			}
		};
	});

export default htmlLexicon;

