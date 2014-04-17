;(function ( $, window, document, undefined ) {
    var pluginName = "djangoBootstrapTypeahead",
    defaults = {};

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // Hide django select and create tags widget
            $(this.element).hide();
            $(this.element).after('\
                <input type="text" class="form-control typeahead-input" autocomplete="off">\
            ');

            // Populate widget with selected options and initialize typeahead
            $(this.element).each(function() {
                var currentElement = this;
                var options = [];
                $(this).find('option').each(function() {
                    if($(this).val()) {
                        options.push($(this).text());

                        if($(this).is('[selected]')) {
                            $(currentElement).siblings('.typeahead-input').val($(this).text());
                        }
                    } else {
                        $(currentElement).siblings('.typeahead-input').attr('placeholder', $(this).text());
                    }
                });

                // Initialize typeahead
                $(this).siblings('.typeahead-input').typeahead({
                    source: options
                });
            });

            // Process tags before form submission
            $('form').on('submit', function(e) {
                $(this).find('.typeahead-select').each(function() {
                    var selectElement = this;
                    $(selectElement).children().removeAttr('selected');

                    var value = $(this).siblings('.typeahead-input').val().trim();
                    var found = false;

                    $(selectElement).children('option').each(function() {
                        if($(this).text().trim() == value) {
                            $(this).attr('selected', 'selected');
                            found = true;
                        }
                    });
                    if(!found) {
                        $(selectElement).append('<option value="' + value + '" selected="selected">' + value + '</option>');
                    }
                });
            });
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };
})( jQuery, window, document );

$(document).ready(function() {
    $('.typeahead-select').djangoBootstrapTypeahead();
})
