(function ($) {

    $.fn.easySelect = function (settings) {

        var currentOption = '';

        //opciones por defecto
        var options = $.extend($.fn.easySelect.defaults, settings);

        this.addClass("easy-select");
        var $textHolder = buildTextHolder(this, options);
        var $ulContainer = buildOptions(this, options);

        setupOptionsClick($ulContainer, $textHolder, currentOption, options)

        this.click(function () {
            $ulContainer.toggle({ easing: options.easing, duration: options.duration });

        });

        return this;
    };

    // Plugin defaults
    $.fn.easySelect.defaults = {

        easing: 'swing',
        duration: 200,
        defaultText: '-Seleccione-',

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
        var $textHolder = $("<div/>").addClass("easy-text-holder selected-item")
          .text(options.defaultText).appendTo(that);

        return $textHolder;
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

    var debugEnable = false;

    function debug($obj) {
        if (debugEnable) {
            if (window.console && window.console.log) {
                window.console.log($obj);
            }
        }
    };

}(jQuery));