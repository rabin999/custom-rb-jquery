(() => {

    "use strict";

    /**
     *
     * A small plugin written by Rabin Bhandari
     *
     *    @copyright 2018
     *    @author Rabin Bhandari <rabin.bhandari999@gmail.com>
     *
     */

    // -------------------------------
    //          Helpers
    // --------------------------------

    /**
     * @param type: string types of errors
     * @param message: string
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

    // Helpers
    function querySelectorAllExist() {
        return (document.querySelector || document.querySelectorAll) ? true : false;
    }

    // Query Selector Support for IE 7
    (function setUpQuerySelectorPolyfill() {
        if (!querySelectorAllExist()) {
            let d = document,
                s = d.createStyleSheet();
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

    class RB {
        constructor(selector) {

            // Development Debug
            this.development = true;
            this.selector = selector;
            this.length = 0;
            this.element = false;
            this.init();

        }

        // private helper
        __isWindowObj() {
            return (this.selector === this.selector.window || this.selector.NodeType === 9) ? true : false
        };

        __singleObj() {
            return (this.element && !Boolean(this.element.length)) ? true : false;
        };

        __hasEvent(event, element = this.element) {
            return typeof element['on' + event] !== "undefined";
        };

        __manageEvent(event, operation, callback) {
            if (!(window[operation] || callback)) {
                error('ReferenceError', 'Event || Event Function reference not found');
            }

            if (window[operation] && this.element) {
                if (this.__isWindowObj() || this.__singleObj()) {
                    if (this.__hasEvent(event, this.element)) {
                        this.element[operation](event, callback);
                    }
                } else {
                    this.element.forEach((el) => {
                        if (this.__hasEvent(event, el)) {
                            el[operation](event, callback);
                        }
                    });
                }
            }
        }

        // Class
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

        // Attr
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

        // Class
        __manageStyle(operation) {
            if (!this.element && !operation) {
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

        // Prepare selector
        init() {

            if (typeof this.selector === 'string' && this.selector.length) {
                this.element = document.querySelectorAll(this.selector);
                this.length = this.element.length;

                if (this.length === 1) {
                    this.element = this.element[0];
                }

            } else if (typeof this.selector === 'object') {
                if (this.__isWindowObj()) {
                    this.element = this.selector;
                    this.length = 1;
                } else {
                    this.length = this.selector.length;
                    this.element = this.selector;

                    if (this.length === 1) {
                        this.element = this.selector[0];
                    }
                }
            } else {
                if (this.development)
                    console.warn(`Selector (${this.selector}) not found on DOM`);
            }

            // Check Node found or not 
            if (this.element instanceof HTMLElement || this.element instanceof Node || this.element instanceof NodeList) {
                if (this.element instanceof NodeList) {
                    if (!this.element.length) {
                        this.element = false;
                        if (this.development)
                            console.warn(`Selector (${this.selector}) not found on DOM`);
                    }
                }
            }
        }

        /*
         * ---------------
         * Events
         * ---------------
         */

        on(event, callback = false) {
            this.__manageEvent(event, 'addEventListener', callback);
        }

        off(event, callback = false) {
            this.__manageEvent(event, 'removeEventListener', callback);
        }

        /*
         * ---------------
         * Class
         * ---------------
         */

        addClass(classes) {
            this.__manageClass(classes, 'add');
            return this;
        }

        removeClass(classes) {
            this.__manageClass(classes, 'remove');
            return this;
        }


        /*
         * ---------------
         * Attributes
         * ---------------
         */
        attr(attr, value = false) {
            if (value) {
                this.__manageAttr(attr, "setAttribute", value);
            } else {
                return this.__manageAttr(attr, "getAttribute");
            }
            return this;
        }

        removeAttr(attr) {
            this.__manageAttr(attr, "removeAttribute");
            return this;
        }

        /*
         * ---------------
         * Page
         * ---------------
         */

        html() {
            // Update New Dom Element
            if (arguments[0] && typeof arguments[0] === "string") {
                this.element.innerHTML = arguments[0];
                return this;
            } else {
                // Return Outer HTMl
                if (arguments[0] && arguments[0] === true)
                    return this.element.outerHTML;
                return this.element.innerHTML;
            }
        }

        /*
         * ---------------
         * Effect
         * ---------------
         */
        show() {
            this.__manageStyle('block');
            return this;
        }

        hide() {
            this.__manageStyle('none');
            return this;
        }

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

                if(typeof callback == "function") {
                    callback();
                }
            }
        }

    }

    if (!window.rb) {
        window.rb = function (ref) {
            if (!ref)
                error('ReferenceError', 'Reference not provided');
            return new RB(ref);
        }
    }

})();


// Scroll Event For Percentage
// Optimize Scroll performace
let ticking = false;
let lastScrollPosition = 0;

rb(window).on("scroll", function (e) {
    if (window.innerWidth && innerWidth > 450) {
        lastScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                scrolling(lastScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    }
});

function scrolling(lastScrollPosition) {
    if (lastScrollPosition > 100) {
        rb('header.menu').removeClass('static').addClass('fixed');
    } else {
        rb('header.menu').removeClass('fixed').addClass('static');
    }

    // let activePageHeight = parseInt(window.scrollHeight - window.clientHeight),
    //     totalProcess = Math.round(((window.scrollTop / activePageHeight ) * 100));
    //     console.log(totalProcess);

    // rb('.progress-bar').addClass('page-process');
    // rb('.progress-bar').element.style.width = totalProcess+"%";
}

// Top Nav bar
rb('nav.top ul li > a').on('click', function (e) {
    let id = rb(this).attr('href');
    let found = rb(id).length;

    if (window.scroll && id.indexOf("#") !== -1 && found) {
        e.preventDefault();

        let top = rb(id).element.offsetTop - 50;

        // Response Width
        if (window.innerWidth && innerWidth < 650) {
            top = rb(id).element.offsetTop + 360;
        }

        window.location.hash = id;
        window.scroll({
            top,
            left: 0,
            behavior: 'smooth'
        });
    }
});

// Menu Toggle
rb('.toggle-menu').on('click', function (e) {

    if(rb(this).attr('data-toggled') === "on") {
        rb(this).removeClass('active');
        rb('nav.top').slide('left');
        rb('nav.top').hide();
        rb(this).removeAttr('data-toggled');
        return;
    }

    rb(this).addClass('active');
    rb(this).attr('data-toggled','on');
    rb('nav.top').slide('center');
});