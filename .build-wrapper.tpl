;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'jquery' ], factory);
    } else if (typeof exports === 'object') { // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(this, function () {
    'use strict';
//WRAPPER
<%= contents %>

//WRAPPER
    return cityselect;
}));