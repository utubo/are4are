function Are4AreUtil() {
}

Are4AreUtil.prototype = {
	// Field //////////////////////////////////////////////////
	_owner: null,
	$: null,
	$win: null,
	$toast: null,
	toolbar: null,

	// Util ///////////////////////////////////////////////////
	format: function() {
		var args = arguments;
		var str = args[0].replace(/__MSG_([^_]+)__/g, function(m, c) { return chrome.i18n.getMessage(c); });
		return str.replace(/\{(\d)\}/g, function(m, c) { return args[parseInt(c) + 1]; });
	},
	escapeWithoutAmp: function(str) {
		return str
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	},
	html: function(str) {
		return this.escapeWithoutAmp(str.replace(/&/g, '&amp;'));
	},
	toast: function() {
		var text = this.format.apply(this, arguments);
		if (!this.$toast) {
			this.$toast = this.$('<div>');
			this.$toast.addClass('are_toast');
			this.$toast.hide();
			this.$('body').append(this.$toast);
		}
		this.$toast.html(text);
		this.$toast.fadeIn();
		var t = this.$toast;
		window.setTimeout((function() { t.fadeOut('slow'); t = null;}), 3000);
	},
	// DOM & HTML Util ////////////////////////////////////////
	addCssFile: function(cssFile) {
		var cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = chrome.extension.getURL(cssFile);
		document.getElementsByTagName('head')[0].appendChild(cssLink);
	},

	clearTimeout: function(id) {
		if (id) window.clearTimeout(id);
		return null;
	},

	_scrollendTimer: null,
	_scrollendEventTrigger: null,
	scrollendEventTrigger: function() {
		this.clearTimeout(this._scrollendTimer);
		this._scrollendTimer = window.setTimeout((function() {
			this.trigger('scrollend');
		}).bind(this.$win), 50);
	},
	scrollTo: function(y, func) {
		this.scrollToNoMargin(Math.max(y - 2, 0), func);
	},
	scrollToNoMargin: function(targetY, func) {
		y = Math.min(targetY, document.body.clientHeight - window.innerHeight);
		var _func = (function() {
			try {
				func && func();
			} finally {
				this.$win.on('scroll.scrollendTrigger', this._scrollendEventTrigger);
				this.$win.trigger('scrollend', [targetY, y]);
			}
		}).bind(this);
		this.$win.off('scroll.scrollendTrigger');
		this.clearTimeout(this._scrollendTimer);
		if (this.$win.scrollTop() != y) {
			this.$('html,body').animate({scrollTop: y}, 'slow', 'easeOutCubic', _func);
		} else {
			_func();
		}
	},

	// init /////////////////////////////////////////////////////
	init: function(owner, jQuery) {
		// setup fields
		this._owner = owner;
		this.$ = jQuery;
		this.$win = jQuery(window);
		this.$win.unload(function() { this.$ = this.$win = null; });

		// jQuery extend
		jQuery.extend(jQuery.easing, {
			def: 'easeOutCubic',
			easeOutCubic: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t + 1) + b;
			}
		});
		new this.$.Event('scrollend');
		this._scrollendEventTrigger = this.scrollendEventTrigger.bind(this);
		this.$win.on('scroll.scrollendTrigger', this._scrollendEventTrigger);
		this.$('body').on('touchmove', this._scrollendEventTrigger);

		// ViewPort
		var head = document.getElementsByTagName('head')[0];
		var viewPort = document.createElement('meta');
		viewPort.name = 'viewport';
		viewPort.content = 'width=device-width';
		head.insertBefore(viewPort, head.firstChild);

		// CSS
		this.addCssFile('common/util.css');

		// ToolBar
		this.toolbar = document.createElement('div');
		this.toolbar.id = 'are_toolbar';
		document.body.appendChild(this.toolbar);
		return this;
	},

	// ToolBar //////////////////////////////////////////////////
	addToolButton: function(label, onclick) {
		var btn = this.toolbar.appendChild(document.createElement('a'), this.toolbar.firstChild);
		btn.textContent = chrome.i18n.getMessage(label);
		btn.id = 'are_toolbtn_' + label;
		btn.href = 'javascript:void(0);';
		btn.classList.add('are_toolbtn');
		if (onclick) {
			btn.onclick = onclick.bind(this._owner);
		}
		return btn;
	},
	activateToolBar: function() {
		this.toolbar.classList.add('active');
	},
	noactivateToolBar: function() {
		this.toolbar.classList.remove('active');
	}

};

