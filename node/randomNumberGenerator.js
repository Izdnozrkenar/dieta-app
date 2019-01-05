'use strict';

exports.getRandomNumber = function (min, max) {
    var nmin = Math.ceil(min);
    var nmax = Math.floor(max);
    return Math.floor(Math.random() * (nmax - nmin + 1) + nmin);
}