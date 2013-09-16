(function ($) {

    $.fn.easySelect = function (settings) {

        var currentOption = '';



        // Plugin defaults
        var defaults = {
            easing: 'swing',
            duration: 200,
            defaultText: '-Seleccione-',
            autocomplete: false,
        };


        //opciones por defecto
        var options = $.extend(defaults, settings);

        debug(options);
       

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

                    if (evt.keyCode !== 8) {
                        autocompleteConcatText += String.fromCharCode(evt.keyCode);
                        
                    } else {
                        autocompleteConcatText = autocompleteConcatText.substring(0, autocompleteConcatText.length - 1);
                    }

                    var selectOptions = $ulContainer.children();
                    var txt = autocompleteConcatText.toLowerCase();


                    $.each(selectOptions, function (index, value) {

                        var optionText = ($(value).text()).toLowerCase();

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



    function buildOptions(el, options) {


        var $ulContainer = $("<ul />").addClass("list-items").appendTo(el);

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

        debug(options.autocomplete);
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


            debug(options.autocomplete);

            if (options.autocomplete === true) {
                
                textHolder.val($(this).html());

            } else {
                textHolder.html($(this).html());

            }

            var selectedOption = { text: $(this).attr('easytext'), value: $(this).attr('easyvalue') }

            textHolder.text($(this).attr('easytext'));



            if (currentOption.value !== selectedOption.value) {
                currentOption = selectedOption;

                if (options.change) {

                    ulContainer.children().attr('selected', false);
                    $(this).attr('selected', 'true');

                    options.change(evt, { selectedOption: currentOption });
                }
            }


           
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