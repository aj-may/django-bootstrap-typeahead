/*
 *  Django Bootstrap Typeahead
 *  Django typeahead fields.
 *
 *  Made by A.J. May
 *  Under Creative Commons Share-alike
 */
;(function ( $, window, document, undefined ) {

	var pluginName = "djangoBootstrapTypeahead",
	defaults = {
		propertyName: "value"
	};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function () {
			// Hide original select element
			$( this.element ).hide();

			// Insert new typeahead widget
			if ( this._is_multi_select() ) {
				$( this.element ).after( this._build_multiple_typeahead() );
				this.$widget = $( this.element ).siblings('.tag-input-widget');
				this.$tags = this.$widget.children('.labels');
				this.$typeahead = this.$widget.children('.typeahead');

				this._init_events();
			} else {
				$( this.element ).after( this._build_typeahead() );
				this.$typeahead = $( this.element ).siblings('.typeahead');
			}

			// Set initial values
			this.refresh();

			// Initialize typeahead
			var options = [];
			$( this.element ).children( 'option' ).each(function () {
				options.push( $(this).text() );
			});
			if ( this._is_multi_select() ) {
				this.$typeahead.typeahead({
					source: options,
					updater: $.proxy( function (value) {
						this._add_tag(value);
						return '';
					}, this)
				});
			} else {
				this.$typeahead.typeahead({
					source: options
				});
			}

			// Preprocess Field on value change
			if ( !this._is_multi_select() ) {
				this.$typeahead.on('change', function () {
					this._preprocess_field();
				});
			}

			// Process values before form submit
			$( this.element ).parent( 'form' ).on('submit', function () {
				this._preprocess_field();
			});
		},
		refresh: function () {
			if ( this._is_multi_select() ) {
				this.$tags.html('');

				var $tags = this.$tags;
				var _add_tag = this._add_tag;
				$( this.element ).children( 'option:selected' ).each($.proxy(function ( index, value ) {
					this._add_tag( $(value).text() );
				}, this));
			} else {
				this.$typeahead.val('');

				this.$typeahead.val( $( this.element ).children( 'option:selected' ).text() );
			}
		},
		_build_typeahead: function () {
			return '<input type="text" class="form-control typeahead" autocomplete="off">';
		},
		_build_multiple_typeahead: function () {
			return '<div class="form-control tag-input-widget"><span class="labels"></span><input type="text" class="typeahead" autocomplete="off"></div>';
		},
		_preprocess_field: function () {
			var $element = $( this.element ).val(null);

			if ( this._is_multi_select() ) {
				this.$tags.children().each( function () {
					var value = $(this).text(),
					found = false;

					$element.children( 'option' ).each( function () {
						if ( $( this ).text() == value ) {
							$( this ).attr('selected', 'selected');
							found = true;
						}
					});
					if (!found) {
						$element.append( '<option value="' + value + '" selected="selected">' + value + '</option>' );
					}
				});
			} else {
				var value = this.$typeahead.val(),
				found = false;

				$element.children( 'option' ).each( function () {
					if ( $( this ).text() == value ) {
						$( this ).attr('selected', 'selected');
						found = true;
					}
				});
				if (!found) {
					$element.append( '<option value="' + value + '" selected="selected">' + value + '</option>' );
				}
			}
		},
		_add_tag: function (value) {
			$( this.$tags ).append('<span class="label label-default">' + value + '<a class="remove" href="#"><span class="glyphicon glyphicon-remove"></span></a></span>');
			this._preprocess_field();
		},
		_init_events: function () {
			var self = this;
			var _preprocess_field = $.proxy(this._preprocess_field, this);

			// Remove labels on remove button click
			self.$tags.on('click', '.remove', function(e) {
				e.preventDefault();
				$(this).parent().remove();
				_preprocess_field();
			});

			// Key press events
			var _add_tag = $.proxy(this._add_tag, this);
			self.$typeahead.keyup(function( event ) {
				if( event.which == 13 && $(this).val() !== '' && $(this).siblings('ul.typeahead:visible').length < 1 ) {
					_add_tag( $(this).val() );
					$(this).val('');
				}
			}).keydown(function( event ) {
				if ( event.which == 13 && $(this).siblings('ul.typeahead:visible').length < 1 ) {
					event.preventDefault();
				}
				if( event.which == 8 ) {
					if( $(this).val() === '' ) {
						$(this).siblings('.labels').children().last().remove();
						console.log(_preprocess_field);
						_preprocess_field();
					}
				}
			});

			// Set focus on text input on container click
			self.$widget.on('click', function () {
				self.$typeahead.focus();
			});
		},
		_is_multi_select: function () {
			return $( this.element ).is( "[multiple]" );
		}
	};

	$.fn[ pluginName ] = function ( action, options ) {
		this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
			if ( action ) {
				$.data( this, "plugin_" + pluginName )[action]();
			}
		});
		return this;
	};

})( jQuery, window, document );

$(document).ready(function() {
	$('.typeahead-select').djangoBootstrapTypeahead();
});