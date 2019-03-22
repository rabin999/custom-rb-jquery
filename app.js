(() => {

    "use strict";

    /**
     *
     *  A small plugin written by Rabin Bhandari
     *
     *  @copyright 2018
     *  @author Rabin Bhandari <rabin.bhandari999@gmail.com>
     *
     */

    // -------------------------------
    //          Helpers
    // --------------------------------

    /**
     * Throw Error using custom message
     *
     * @param {string} type
     * @param {string} message
     */
    function error(type = "Error", message) {
        if (message) {
            if (window[type]) {
                throw new window[type](message);
            } else if (window.console) {
                console.error(message);
            }
        }
    }

    /**
     * Check support of querySelectorAll in browser
     * @returns {boolean}
     */
    function querySelectorAllExist() {
        return !!(document.querySelector || document.querySelectorAll);
    }

    /**
     * Optimized version of console.log
     * @param {string} value
     * @return {(number|string|boolean|object|array)}
     */
    window.cl = function(value) {
        console.log(value);
    };

    /**
     * Optimized version of console.dir
     * @param {(string|object)} value
     * @return {(number|string|boolean|object|array)}
     */
    window.cd = function(value) {
        console.dir(value);
    }

    /**
     * Check weather user agent is mobile or desktop
     * @returns {boolean}
     */
    window.isMobile = function() {
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            return true;
        }
        return false;
    }

    // -------------------------------
    //          Polyfill
    // --------------------------------

    /**
     * Check weather array contain given value or not
     * @param {string} needle
     * @returns {boolean}
     */
    Array.prototype.contains = function ( needle ) {
        for (let i in this) {
            if (this[i] === needle) return true;
        }
        return false;
    };

    if (!Array.isArray) {
        /**
         * Check given argument is array or not
         * @param {(string|boolean|number|object|array)} arg - Depend on argument
         * @returns {boolean}
         */
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    /*
    * Closest DOM API
    * */
    if (!Element.prototype.matches)
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (!Element.prototype.closest) {
        /**
         * Polyfill of closest DOM API
         * @param {string} s
         * @returns {*}
         */
        Element.prototype.closest = function (s) {
            let el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    /**
     * After
     * @param {array} arr
     */
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('after')) {
                return;
            }
            Object.defineProperty(item, 'after', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function after() {
                    let argArr = Array.prototype.slice.call(arguments),
                        docFrag = document.createDocumentFragment();

                    argArr.forEach(function (argItem) {
                        let isNode = argItem instanceof Node;
                        docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                    });

                    this.parentNode.insertBefore(docFrag, this.nextSibling);
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

    /*
    * Event Support for IE >= 7
    * */
    if (!Element.prototype.addEventListener) {
        let oListeners = {};

        // noinspection JSAnnotator
        /**
         * Runlistener - Provide environment for addEvent and removeEvent listener
         * @param {*} oEvent
         */
        function runListeners(oEvent) {
            if (!oEvent) { oEvent = window.event; }
            for (let iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) {
                    for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }
                    break;
                }
            }
        }

        /**
         * Support of addEventListener for old browser
         * @param {string} sEventType - Event Type
         * @callback fListener
         */
        Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
            if (oListeners.hasOwnProperty(sEventType)) {
                let oEvtListeners = oListeners[sEventType];
                for (let nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                    if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
                }
                if (nElIdx === -1) {
                    oEvtListeners.aEls.push(this);
                    oEvtListeners.aEvts.push([fListener]);
                    this["on" + sEventType] = runListeners;
                } else {
                    let aElListeners = oEvtListeners.aEvts[nElIdx];
                    if (this["on" + sEventType] !== runListeners) {
                        aElListeners.splice(0);
                        this["on" + sEventType] = runListeners;
                    }
                    for (let iLstId = 0; iLstId < aElListeners.length; iLstId++) {
                        if (aElListeners[iLstId] === fListener) { return; }
                    }
                    aElListeners.push(fListener);
                }
            } else {
                oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
                this["on" + sEventType] = runListeners;
            }
        };

        /**
         * Support of removeEventListener for old browser
         * @param sEventType
         * @param fListener
         */
        Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
            if (!oListeners.hasOwnProperty(sEventType)) { return; }
            let oEvtListeners = oListeners[sEventType];
            for (let nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
            }
            if (nElIdx === -1) { return; }
            for (let iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
                if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
            }
        };
    }

    /*
    * Query Selector Support for IE >= 7
    * */
    (function setUpQuerySelectorPolyfill() {
        if (!querySelectorAllExist()) {
            let d = document,
                s = d.createStyleSheet();

            /**
             * @function querySelectorAll - Support for IE >= 7
             * @param r
             * @param c
             * @param i
             * @param j
             * @param a
             * @returns {Array}
             */
            d.querySelectorAll = function (r, c, i, j, a) {
                a = d.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            }
        }
    })();

    /**
     * getCookie - Return cookie key-value detail
     * @param {string} cname - Cookie name
     * @returns {string} - If cookie exist return key[value]
     */
    window.getCookie = function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /**
     * @class - RB
     */
    class RB {

        /**
         * @constructs RB
         * @param {(string|object)} selector - DOM Selector, Node Object
         */
        constructor(selector) {
            // Development Mode
            this.development = false;
            this.selector = selector;
            this.length = 0;
            this.element = false;
            this.init();
        }

        /**
         * Check weather selector is Window Object or not
         * @returns {boolean}
         * @private
         */
        __isWindowObj() {
            return (this.selector === this.selector.window || this.selector.NodeType === 9);
        };

        /**
         * Check weather selector is single DOM Object or not
         * @returns {boolean}
         * @private
         */
        __singleObj() {
            return (this.element && this.length === 1) ? true : false;
        };

        /**
         * Check NODE has an Event or not
         * @param {string} event - type of event
         * @param {string} element - selector
         * @returns {boolean}
         * @private
         */
        __hasEvent(event, element = this.element) {
            return true;
            // return typeof element['on' + event] !== "undefined";
        };

        /**
         * Check weather event with multiple types
         * @param {string} events
         * @returns {(array|boolean)}
         * @private
         */
        __hasMultipleEvents(events) {
            let evs = [];
            if(events) {
                events = events.split(' ');
                if(events.length > 1) {
                    events.forEach(function(ev) {
                        if(ev !== '' && ev.match(/^[A-Za-z]+$/))
                            evs.push(ev);
                    });
                }
            }
            return (evs.length && evs.length > 1 ) ? evs : false;
        };

        /**
         * Manage Event of on, one and off
         * @param {string} event - type of event
         * @param {string } operation - type of event operation like addEventListener
         * @callback {function} callback - callback function for event
         * @param {object} options - capture and bubbling phase
         * @private
         */
        __manageEvent(event, operation, callback, options = null) {

            let that = this,
                multipleEvents = that.__hasMultipleEvents(event);
            event = multipleEvents ? multipleEvents : event;

            if (!(window[operation] || callback)) {
                error('ReferenceError', 'Event || Event Function reference not found');
            }

            if (window[operation] && this.element) {
                // Single Object
                if (that.__isWindowObj() || that.__singleObj()) {
                    if(Array.isArray(event) && event.length > 1) {
                        if (that.__hasEvent(event, that.element)) {
                            event.forEach(function (e) {
                                that.element[operation](e, callback, (options !== null) ? options : '');
                            });
                        }
                    } else {
                        if (that.__hasEvent(event, that.element)) {
                            that.element[operation](event, callback, (options !== null) ? options : '');
                        }
                    }
                } else {
                    // Multiple Objects
                    if(Array.isArray(event) && event.length > 1) {
                        that.element.forEach((el) => {
                            if (that.__hasEvent(event, el)) {
                                event.forEach(function (e) {
                                    el[operation](e, callback, (options !== null) ? options : '');
                                });
                            }
                        });
                    } else {
                        that.element.forEach((el) => {
                            if (that.__hasEvent(event, el)) {
                                el[operation](event, callback);
                            }
                        });
                    }
                }
            }
        }

        /**
         * Manage class attributes
         * @param {string} classes
         * @param {string} operation - type of operation like add or remove
         * @private
         */
        __manageClass(classes, operation) {
            if (!classes)
                error('ReferenceError', 'Class arguments not founds !');

            let classLists = classes.trim().split(' ');

            if (!this.element) {
                return;
            }
            if (this.__isWindowObj() || this.__singleObj()) {
                classLists.forEach((cl) => {
                    this.element.classList[operation](cl);
                });
            } else {
                this.element.forEach((el) => {
                    classLists.forEach(function (cl, index) {
                        el.classList[operation](cl);
                    });
                });
            }
        }

        /**
         * Manage Attribute of Node | Nodes
         * @param {string} attr - attribute of node
         * @param {string} operation - type of Operation
         * @param {string} value - Attribute value
         * @returns {*}
         * @private
         */
        __manageAttr(attr, operation, value = false) {
            if (!attr.length) {
                error("ReferenceError", "Attr not provided");
            }

            if (!this.element) {
                return;
            }

            if (this.__isWindowObj() || this.__singleObj()) {
                if (operation === "removeAttribute" || operation === "getAttribute") {
                    if (this.element.hasAttribute(attr)) {
                        if (operation === "getAttribute") {
                            return this.element[operation](attr);
                        }
                        this.element[operation](attr);
                    }
                } else {
                    this.element[operation](attr, value);
                }
            } else {
                if (operation === "removeAttribute" || operation === "getAttribute") {
                    this.element.forEach((el) => {
                        if (el.hasAttribute(attr)) {
                            if (operation === "getAttribute") {
                                return el[operation](attr);
                            }
                            el[operation](attr);
                        }
                    });

                } else {
                    this.element.forEach((el) => {
                        el[operation](attr, value);
                    });
                }
            }
        }

        /**
         * Manage Style Attribute
         * @param {string} operation - typeof Operation
         * @private
         */
        __manageStyle(operation) {
            if (!this.length || !operation) {
                return;
            }

            if (this.__isWindowObj() || this.__singleObj()) {
                if(this.element.style)
                    this.element.style.display = operation;
            } else {
                this.element.forEach((el) => {
                    el.style.display = operation;
                });
            }
        }

        /**
         * Prepare node selector
         * Filter type of node selector of string and object
         * @constructor
         */
        init() {

            if (this.selector.length && (typeof this.selector === 'string')) {
                this.element = document.querySelectorAll(this.selector);
                this.length = this.element.length;

                if (this.length === 1) {
                    this.element = this.element[0];
                }

            } else if (typeof this.selector === 'object'  || [1,3,9].includes(this.selector.nodeType)) {

                if (this.__isWindowObj()) {
                    this.element = this.selector;
                    this.length = 1;
                } else {
                    this.length = (this.selector && [1,3,9].includes(this.selector.nodeType)) ? 1 : 0;
                    this.element = this.selector;

                    if (this.length === 1) {
                        this.element = this.selector;
                    }
                }
            } else {
                if (this.development)
                    console.warn(`Selector (${this.selector}) not found on DOM`);
            }

            // Check Node found or not
            // Need to be improve

            if (this.element instanceof HTMLElement || this.element instanceof Node || this.element instanceof NodeList) {
                if (this.element instanceof NodeList) {
                    if (!this.element.length || !this.element) {
                        this.element = false;
                        if (this.development)
                            console.warn(`Selector (${this.selector}) not found on DOM`);
                        // return;
                    }
                }
            }
        }

        /*
         * ---------------
         * Events
         * ---------------
         */

        /**
         * On Click - add event to object
         * @param {string} event - type of event
         * @param {function} callback - Event callback
         */
        on(event, callback = false) {
            this.__manageEvent(event, 'addEventListener', callback);
        }

        /**
         * One Click - add event only once to object
         * @param {string} event - type of event
         * @param {function} callback - Event callback
         */
        one(event, callback = false) {
            this.__manageEvent(event, 'addEventListener', callback, {once: true});
        }

        /**
         * Off Click - remove event from object
         * @param {string} event - type of event
         * @param {function} callback - Event callback
         */
        off(event, callback = false) {
            this.__manageEvent(event, 'removeEventListener', callback);
        }

        /*
         * ---------------
         * Class
         * ---------------
         */

        /**
         * Check weather dom has given class or not
         * @param {string} className
         * @returns {boolean}
         */
        hasClass(className) {
            let r = false;
            if (!className.length)
                error('ReferenceError', 'Class argument not founds !');

            className = className.trim();

            // if(this.element.classList.length === 1 && this.element.classList[0] === className) {
            if (this.element.classList.length) {
                if (this.element.classList.length === 1 && this.element.classList.contains(className)) {
                    r = true;
                } else {
                    this.element.classList.forEach(function (cl) {
                        cl
                            = cl.trim();
                        if (className === cl) {
                            r = true;
                        }
                    });
                }

                return r;
            }
        }

        /**
         * Add class | classes to DOM
         * @param {string} classes - Class name(s)
         * @returns {RB} - Class Object
         */
        addClass(classes) {
            this.__manageClass(classes, 'add');
            return this;
        }

        /**
         * Remove class | classes from DOM
         * @param {string} classes - class name(s)
         * @returns {RB} - Class Object
         */
        removeClass(classes) {
            this.__manageClass(classes, 'remove');
            return this;
        }


        /*
         * ---------------
         * Attributes
         * ---------------
         */

        /**
         * Fetch and Set Attribute to DOM
         * @param {string} attr - Attribute
         * @param {(string|boolean)} value - Attribute value
         * @returns {RB} - Class Object
         */
        attr(attr, value = false) {
            if (value) {
                this.__manageAttr(attr, "setAttribute", value);
            } else {
                return this.__manageAttr(attr, "getAttribute");
            }
            return this;
        }

        /**
         * Remove Attribute from DOM
         * @param {string} attr - Attribute
         * @returns {RB} - Class Object
         */
        removeAttr(attr) {
            this.__manageAttr(attr, "removeAttribute");
            return this;
        }

        /**
         * Check weather check box is checked or not
         * @returns {boolean} - Status of checkbox
         */
        isChecked() {
            return this.element.checked
        }

        /**
         * Css Rules - add and remove style from DOM
         * @param rules
         */
        css(rules) {
            if (!this.element || !rules) {
                return;
            }
            if (this.__isWindowObj() || this.__singleObj()) {
                if(Object.keys(rules)) {
                    for(let key in rules) {
                        this.element.style[key] = rules[key];
                    }
                }
            } else {
                this.element.forEach((el) => {
                    if(Object.keys(rules)) {
                        for(let key in rules) {
                            el.style[key] = rules[key];
                        }
                    }
                });
            }
        }

        /*
         * ---------------
         * Traversing
         * ---------------
         */

        /**
         * Return closest parent of selector
         * @param value
         * @returns {*}
         */
        closest(value) {
            if (this.element && !this.__isWindowObj() || this.__singleObj()) {
                return this.element.closest(value);
            }
            error('ReferenceError', `${value} not found !`);
        }

        /*
         * ---------------
         * Page
         * ---------------
         */
        /**
         * Document Ready - trigger callback function after DOM ready
         * @param {function} callback
         */
        ready(callback) {
            if(this.element && this.element === document && this.element.readyState === "loading") {
                this.element.addEventListener('DOMContentLoaded', callback);
            }
        }

        /**
         * Fetch and update html content
         * @arguments {string} - new html content
         * @returns {*}
         */
        html() {
            if (arguments[0] && typeof arguments[0] === "string") {
                this.element.innerHTML = arguments[0];
                return this;
            } else {
                // Return Outer HTML
                if (arguments[0] && arguments[0] === true)
                    return this.element.outerHTML;
                return this.element.innerHTML;
            }
        }

        /**
         * Next Dom Element
         * @returns {Element}
         */
        next() {
            if(this.length) {
                return new RB(this.element.nextElementSibling);
            }
        }

        /**
         * Append New Document after selected element
         * @param {array} html - new html
         */
        after(html) {
            if(this.length && Object.keys((html)).length) {
                for (let tag in html) {
                    if(tag && html[tag]) {
                        let newElement = document.createElement(tag);
                        if(Object.keys(html[tag]).length) {
                            for(let attr in html[tag]) {
                                switch (attr) {
                                    case 'text':
                                        newElement.textContent = html[tag][attr];
                                    break;
                                    case 'class':
                                        newElement.classList.add(html[tag][attr].split(' ').join(' '))
                                }
                            }
                        }
                        this.element.after(newElement);
                        break;
                    }
                }
            }
        }

        /**
         * Fetch and update text content or value of NODE
         * @param {string} value - value | textContent of NODE
         * @returns {*}
         */
        text(value = null) {
            if(value === null){
                return this.element.textContent;
            }

            if(this.element.nodeName === "TEXTAREA" || this.element.nodeName === "INPUT") {
                return this.element.value = value;
            }
            return this.element.textContent = this.element.innerText = value;
        }

        /*
         * ---------------
         * Utilities
         * ---------------
         */

        /**
         * Remove DOM
         * @returns {RB}
         */
        remove() {
            this.element.parentNode.removeChild(this.element);
            return this;
        }

        /**
         * Uppercase first letter
         * @param {string} string - string to be uppercase
         * @returns {string} - uppercase letter with string
         */
        ucFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /**
         * Validate form
         * @param form
         */
        validateForm() {
            let errorElementNode = 'p';
            let errorElementNodeClass = 'error-text';
            let customRule = "This Field is required";
            let form = rb(this.element);

            if (form.attr('data-validation') === "on") {
                let elems = form.element.elements;
                if (elems.length) {

                    Array.from(elems).forEach(function(element) {
                        // Check element is required or not
                        if (element.required !== undefined && element.required && element.value.trim() === "") {
                            // check element has own custom error or not
                            if (element.getAttribute('data-error') && rb(element).next().text() !== element.getAttribute('data-error')) {
                                rb(rb(element).closest('.group.col')).addClass('error');
                                rb(element).after({
                                    errorElementNode: {
                                        "class": errorElementNodeClass,
                                        "text": element.getAttribute('data-error')
                                    }
                                });
                            } else {
                                if(rb(element).next().text() !== customRule) {
                                    rb(element).after({
                                        errorElementNode: {
                                            "class": errorElementNodeClass,
                                            "text": customRule
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        }

        /*
         * ---------------
         * Effect
         * ---------------
         */

        /**
         * Show DOM
         * @returns {RB}
         */
        show() {
            this.__manageStyle('block');
            return this;
        }

        /**
         * Hide DOM
         * @returns {RB}
         */
        hide() {
            this.__manageStyle('none');
            return this;
        }

        /**
         * Slide animation
         * @param {string} direction - direction of slide
         * @param {function} callback
         */
        slide(direction, callback) {
            if(direction) {
                let direction_class = "slide-"+direction;

                if(direction === "left") {
                    this.removeClass('slide-right slide-center').addClass(direction_class);
                }
                else if(direction === "right") {
                    this.removeClass('slide-left slide-center').addClass(direction_class);
                }
                else if(direction === "center") {
                    this.removeClass('slide-left slide-right').addClass(direction_class);
                }

                if(typeof callback === "function") {
                    callback();
                }
            }
        }
    }

    if (!window.rb) {
        /**
         * Create new instance of RB for selector
         * @param {string} ref - selector reference
         * @returns {RB}
         */
        window.rb = function (ref) {
            if (!ref)
                error('ReferenceError', 'Reference not provided');
            return new RB(ref);
        }
    }
})();
