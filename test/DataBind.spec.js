describe("DataBind", function() {

//    beforeEach(function() {
//        // remove all bindings
//        var ids = [ 'in-text', 'textarea', 'in-checkbox', 'in-radio', 'select', 'select-mul', 'div1', 'span1', 'span2', 'has-children' ];
//        for (var i = 0; i < ids.length; i++) {
//            DataBind.unbind(ids[i]);
//        }
//    });

    function fireEvent(element,event){
        if (document.createEventObject){
            // dispatch for IE
            var evt = document.createEventObject();
            return element.fireEvent('on'+event,evt)
        }
        else{
            // dispatch for firefox + others
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true ); // event type,bubbling,cancelable
            return !element.dispatchEvent(evt);
        }
    }

    function isArrayEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        // make sure both arrays have same values exactly
        var i;
        for (i=0; i<arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) === -1) return false;
        }
        for (i=0; i<arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) === -1) return false;
        }
        return true;
    }

    describe("Test different DOM element type", function() {

        it("should input type text be 2-way bound", function() {
            var textElem = document.getElementById('in-text');
            $(textElem).attr('data-key', 'k1');
            var model = {k1: 'some text'};
            DataBind.bind(textElem, model);
            expect( $(textElem).val() ).toBe( model.k1 );

            model.k1 = 'changed via model';
            expect( $(textElem).val() ).toBe( 'changed via model' );

            $(textElem).val('changed via elem.');
            // simulate as if the change was a user input
            fireEvent(textElem, 'input');
            expect( model.k1 ).toBe( 'changed via elem.' );
        });

        it("should textarea be 2-way bound", function() {
            var textElem = document.getElementById('textarea');
            $(textElem).attr('data-key', 'k1');
            var model = {k1: 'some text'};
            DataBind.bind(textElem, model);
            expect( $(textElem).val() ).toBe( model.k1 );

            model.k1 = 'changed via model';
            expect( $(textElem).val() ).toBe( 'changed via model' );

            $(textElem).val('changed via elem.');
            // simulate as if the change was a user input
            fireEvent(textElem, 'input');
            expect( model.k1 ).toBe( 'changed via elem.' );
        });

        it("should checkbox be 2-way bound", function() {
            var elem = document.getElementById('in-checkbox');
            $(elem).attr('data-key', 'k1');
            var model = {k1: false};
            DataBind.bind(elem, model);
            expect( $(elem).prop('checked') ).toBe( model.k1 );

            model.k1 = true;
            expect( $(elem).prop('checked') ).toBe( true );

            $(elem).prop('checked', false);
            // simulate as if the change was a user input
            fireEvent(elem, 'change');
            expect( model.k1 ).toBe( false );
        });

        it("should radio be 2-way bound", function() {
            var elem = document.getElementById('in-radio');
            $(elem).attr('data-key', 'k1');
            var model = {k1: false};
            DataBind.bind(elem, model);
            expect( $(elem).prop('checked') ).toBe( model.k1 );

            model.k1 = true;
            expect( $(elem).prop('checked') ).toBe( true );

            $(elem).prop('checked', false);
            // simulate as if the change was a user input
            fireEvent(elem, 'change');
            expect( model.k1 ).toBe( false );
        });

        it("should select be 2-way bound", function() {
            var elem = document.getElementById('select');
            $(elem).attr('data-key', 'k1');
            var model = {k1: 'value1'};
            DataBind.bind(elem, model);
            expect( $(elem).val() ).toBe( model.k1 );

            model.k1 = 'value2';
            expect( $(elem).val() ).toBe( 'value2' );

            $(elem).val('value2');
            // simulate as if the change was a user input
            fireEvent(elem, 'change');
            expect( model.k1 ).toBe( 'value2' );
        });

        it("should select with multi-select be 2-way bound", function() {
            var elem = document.getElementById('select-mul');
            $(elem).attr('data-key', 'k1');
            var model = {k1: ['value1', 'value2']};
            DataBind.bind(elem, model);
            expect( isArrayEqual($(elem).val(), model.k1)).toBe(true);

            model.k1 = ['value1', 'value3'];
            expect( isArrayEqual($(elem).val(), ['value1', 'value3'])).toBe(true);

            $(elem).val('value3');
            // simulate as if the change was a user input
            fireEvent(elem, 'change');
            expect( isArrayEqual(model.k1, ['value3'])).toBe(true);
        });

    });

    describe("Test unbind detaches bindings", function() {
        // re-attach
        // removes watches
    });

    describe("Test binding configurable", function() {

    });

    describe("Test binding with nested key", function() {

    });

    describe("Test Watchable", function() {
        // dependant on config
        // watch
        // unwatch(fn)
        // unwatch()
    });


});