'use strict';

exports.getPossbieMovesForFlags = function (solution, reqs, preferences, dishlist) {

    var flagset = {

        needsMoreEnergy: 0,
        needsLessEnergy: 0,
        needsMoreProtein: 0,
        needsLessProtein: 0,
        needsMoreFat: 0,
        needsLessFat: 0,
        needsMoreCarbohydrates: 0,
        needsLessCarbohydrates: 0,
        needsMoreFiber: 0,
        needsLessFiber: 0,
        isMonotonous: 0,
        hasNonPrefferedDishes: 0
    }
    return flagset;
}