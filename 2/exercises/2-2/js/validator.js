// ensure EOC
EOC = EOC || {};

EOC.validator = function (form) {

    var self = this,
        result = {
            response : true,
            messages : {}
        },

        resetResponse = function () {
            result.response = true;
            result.messages = {};
        },

        /**
         * [getVal description]
         * @scope private
         * @param  {DOMnode} node the node 
         * @return {mixed}      the value as concerns the regexp validation
         */
        getVal = function (node) {

            var nodetype,
                type;
            if (node.length){
                var tmp = Array.prototype.slice.call(node);
                nodetype = tmp[0].tagName.toLowerCase();
                type = tmp[0].type;
            } else {
                nodetype = node.tagName.toLowerCase();
                type = node.type;
            }

            if (nodetype === 'textarea') {

                return node.innerHTL;

            } else {
                if (type.match(/radio|checkbox/i)) {
                    if (node.length) {
                        var els = Array.prototype.slice.call(node);
                        for (var i = 0, l = els.length; i < l; i ++) {
                            if (els[i].checked) {
                                return els[i].value;
                            }
                        }
                        return '';
                    }
                    return node.checked;
                }
                return node.value;
            }
        },
        getLast = function (maybenodelist) {
            if (maybenodelist.length){
                var tmp = Array.prototype.slice.call(maybenodelist);
                return tmp[maybenodelist.length - 1];
            }
            return maybenodelist;
        }

    this.form = form;

    this.fields = {};
    
    this.rules = {
        required : {
            regexp : new RegExp(/(.+)/),
            message : 'required'
        },

        email : {
            regexp : new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            message : 'email required'
        },
        url : {
            regexp : new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i),
            message : 'url required'
        },
        alfa : {
            regexp : new RegExp(/^[A-z]*$/),
            message : 'alfa required'
        },
        numint : {
            regexp : new RegExp(/^[0-9]*$/),
            message : 'integer required'
        },
        floatnum : {
            regexp : new RegExp(/^[0-9\.]*$/),
            message : 'floatrequired'
        },
        alfanum : {
            regexp : new RegExp(/^[A-z0-9]*$/),
            message : 'alfanum required'
        }
    };

    this.add = function (fieldName, rule) {
        if (!this.fields[fieldName]) {
            this.fields[fieldName] = {};
        }
        this.fields[fieldName][rule] = true;
    };

    this.remove = function (fieldName, rule) {
        if (fieldName in this.fields &&  rule in this.fields[fieldName]) {
            this.fields[fieldName][rule] = null;
        }
    };

    this.validate = function (rules) {
        if (rules) {
            for (var j in rules) {
                this.add(j, rules[j]);
            }
        }

        // get a reference to the validation object,
        // to be used in any binded function;
        // in binded function this refers no more
        // to the validation object
        // 
        var self = this;

        // at keypress in to the form if the focus is
        // NOT a textarea AND enter is the key pressed
        // THEN prevent the default action (submit of the form)
        // 
        EOC.events.bind(self.form, 'keypress', function (e) {
            !e.target.tagName.match(/textarea/i) &&
            e.keyCode === 13 &&
            EOC.events.preventDefault(e);
        });
        


        EOC.events.bind(self.form, 'submit', function (e) {

            // the default action the browser takes at submit 
            // is to submit :D
            // lock it !
            // 
            EOC.events.preventDefault(e);
            

            var i,
                j,
                tmp,
                fieldtmp,
                form = self.form;
            
            // reset the response
            // 
            resetResponse();

            // loop over booked fields
            //
            for (i in self.fields) {

                // reset a flag for that field
                // 
                fieldtmp = true;

                // loop over field rules
                // 
                for (j in self.fields[i]) {

                    // skip removed rules (are set to null by validation.remove function)
                    if (!self.fields[i][j]) {continue; }

                    // check if the element honours the rule
                    // note: the way to get the value of an element depends
                    //       on the nature of the tag
                    //       
                    // Access Prop | SELECTOR
                    // ------------+---------------------
                    // .value      | input[type=text]
                    //             | select
                    //  -----------+---------------------
                    // .checked    | input[type=checkbox]
                    //             | input[type=radio])
                    // ------------+---------------------
                    // .innerHTML  | textarea
                    // ------------+---------------------
                    // 
                    // even more, in the case of radios or checkboxes
                    // the validation rule (that could require for example at least 2 checked checkboxes)
                    // is not value-based, in fact the mean user `cannot modify it`
                    // but checked-unchecked based
                    // 
                    // 
                    // the getVal() private function is a really simple and dumb helper
                    // to get the value that should be matched against the regexp 
                    // 
                    tmp = !!(getVal(form[i]).match(self.rules[j].regexp));
                    
                    // if the validation for that rule not passes
                    // 
                    if (!tmp) {

                        // for sure something is wrong with the field
                        // 
                        fieldtmp = false;

                        // in case the filed related messages are not initialized
                        // create an array for it
                        if (!(i in result.messages)) {
                            result.messages[i] = [];
                        }

                        // push the wired message
                        // in the field message array
                        // 
                        result.messages[i].push(self.rules[j].message);
                    }

                    // update the form submission result
                    // casting always to bool
                    result.response = !!result.response && !!tmp;
                }
                

                var last = getLast(form[i]);
                if (!fieldtmp) {
                    
                    if (!last.advice) {
                        last.advice = document.createElement('span');

                        last.advice.className = 'warning';
                        last.advice.innerHTML = '?';
                    }
                    

                    last.advice.title = last.getAttribute('data-msg') || result.messages[i].join("\n");

                    result.messages[i].length = 0;
                    
                    EOC.dom.insertAfter(last.advice, last);
                    
                } else {
                    if (last.advice) {
                        EOC.dom.remove(last.advice);
                        last.advice = null;
                    }
                }
            }

            // now MAYBE it's time to call form.submit()
            // the default action
            // previously locked with the preventDefault call
            // 
            if(result.response) form.submit();
        });
    };
};





