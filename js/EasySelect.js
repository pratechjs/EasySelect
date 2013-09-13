(function ($) {

    $.fn.easySelect = function (settings) {

        var currentOption = '';

        //opciones por defecto
        var options = $.extend($.fn.easySelect.defaults, settings);

        this.addClass("easy-select");
        var $textHolder = buildTextHolder(this, options);
        var $ulContainer = buildOptions(this, options);

        var autocompleteConcatText = '';

        setupOptionsClick($ulContainer, $textHolder, currentOption, options)

        this.click(function () {
            $ulContainer.toggle({ easing: options.easing, duration: options.duration });

        });


        if (options.autocomplete === true) {
            $textHolder.keyup(function (evt) {
                if (evt.keyCode !== 13) {
                    debug(evt.keyCode);

                    if (evt.keyCode !== 8) {
                        autocompleteConcatText += String.fromCharCode(evt.keyCode);
                        
                    } else {
                        autocompleteConcatText = autocompleteConcatText.substring(0, autocompleteConcatText.length - 1);
                        debug(autocompleteConcatText);
                    }

                    var selectOptions = $ulContainer.children();
                    var txt = autocompleteConcatText.toLowerCase();

                    debug(selectOptions);

                    $.each(selectOptions, function (index, value) {

                        var optionText = ($(value).text()).toLowerCase();

                        debug(optionText.indexOf(txt));
                        debug(optionText);
                        debug(txt);

                        if (optionText.indexOf(txt) === -1) {
                            $(value).hide();
                        } else {
                            $(value).show();

                        }

                    });

                    
                }
            });
        }

        return this;
    };

    // Plugin defaults
    $.fn.easySelect.defaults = {

        easing: 'swing',
        duration: 200,
        defaultText: '-Seleccione-',
        autocomplete:false,

    };


    function buildOptions(el, options) {


        var $ulContainer = $("<ul />").addClass("list-items").appendTo(el);

        debug(options.selectData);
        if (options.options) {


            $.each(options.options, function (index, value) {
                var optionLi = $('<li/>').addClass('list-item')
                    .attr('selected', false).attr('easyvalue', value.value)
                    .text(value.text).appendTo($ulContainer);
            });
        }

        return $ulContainer;

    }

    function buildTextHolder(that, options) {
        if (options.autocomplete === true) {
            var $textHolder = $("<input  type='text'/>").addClass("easy-text-holder selected-item")
                            .text(options.defaultText).appendTo(that);
            return $textHolder;

        } else {
            var $textHolder = $("<div/>").addClass("easy-text-holder selected-item")
                            .text(options.defaultText).appendTo(that);

            return $textHolder;
        }

        
    }

    function setupOptionsClick(ulContainer, textHolder, currentOption, options) {

        ulContainer.children().click(function (evt) {

            if (options.optionClick) {
                options.optionClick(evt);
            }

            debug(currentOption);
            textHolder.html($(this).html());


            var selectedOption = { text: $(this).attr('easytext'), value: $(this).attr('easyvalue') }

            textHolder.text($(this).attr('easytext'));



            if (currentOption.value != selectedOption.value) {
                currentOption = selectedOption;

                if (options.change) {

                    ulContainer.children().attr('selected', false);
                    $(this).attr('selected', 'true');

                    options.change(evt, { selectedOption: currentOption });
                }
            }


            debug(currentOption);
        });

    }

    var debugEnable = true;

    function debug($obj) {
        if (debugEnable) {
            if (window.console && window.console.log) {
                window.console.log($obj);
            }
        }
    };

}(jQuery));