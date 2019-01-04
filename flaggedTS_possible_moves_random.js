'use strict';
const randomNumber = require('./randomNumberGenerator');

exports.getPossbieMovesForFlagsRandomly = function (solution, flagset, dishSet, flaggedDishlists, prefs) {

    var possibleMoves = []

    if (flagset.needsMoreEnergy) {

        for (var i = 0; i < flaggedDishlists['richInEnergy'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInEnergy'].includes(solution[changeIndex][0]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInEnergy'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInEnergy'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInEnergy'].includes(solution[changeIndex][3] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInEnergy'].includes(solution[changeIndex][4] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i], changeIndex, 2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessEnergy) {

        for (var i = 0; i < flaggedDishlists['notRichInEnergy'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInEnergy'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInEnergy'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInEnergy'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInEnergy'].includes(solution[changeIndex][3] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i], changeIndex, 2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInEnergy'].includes(solution[changeIndex][4] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i], changeIndex, 2])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreProtein) {

        for (var i = 0; i < flaggedDishlists['richInProtein'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInProtein'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i], changeIndex, 2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInProtein'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i], changeIndex, 2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInProtein'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInProtein'].includes(solution[changeIndex][3] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i], changeIndex, 2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInProtein'].includes(solution[changeIndex][4] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i], changeIndex, 2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessProtein) {

        for (var i = 0; i < flaggedDishlists['notRichInProtein'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInProtein'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i], changeIndex, 0, 'lp'])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInProtein'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i], changeIndex, 1, 'lp'])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInProtein'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i], changeIndex, 2, 'lp'])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInProtein'].includes(solution[changeIndex][3] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i], changeIndex, 3, 'lp'])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInProtein'].includes(solution[changeIndex][4] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i], changeIndex, 4, 'lp'])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreFat) {

        for (var i = 0; i < flaggedDishlists['richInFat'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFat'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInFat'][i], changeIndex, 0])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFat'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInFat'][i], changeIndex, 1])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFat'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInFat'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFat'].includes(solution[changeIndex][3]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i], changeIndex, 3])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFat'].includes(solution[changeIndex][4]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i], changeIndex, 4])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessFat) {

        for (var i = 0; i < flaggedDishlists['notRichInFat'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFat'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i], changeIndex, 0])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFat'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i], changeIndex, 1])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFat'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFat'].includes(solution[changeIndex][3]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i], changeIndex, 3])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFat'].includes(solution[changeIndex][4]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i], changeIndex, 4])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreCarbohydrates) {

        for (var i = 0; i < flaggedDishlists['richInCarbohydrates'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInCarbohydrates'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i], changeIndex, 0])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInCarbohydrates'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i], changeIndex, 1])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInCarbohydrates'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInCarbohydrates'].includes(solution[changeIndex][3]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i], changeIndex, 3])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInCarbohydrates'].includes(solution[changeIndex][4]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i], changeIndex, 4])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessCarbohydrates) {

        for (var i = 0; i < flaggedDishlists['notRichInCarbohydrates'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInCarbohydrates'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i], changeIndex, 0])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInCarbohydrates'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i], changeIndex, 1])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInCarbohydrates'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInCarbohydrates'].includes(solution[changeIndex][3]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i], changeIndex, 3])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInCarbohydrates'].includes(solution[changeIndex][4]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i], changeIndex, 4])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreFiber) {

        for (var i = 0; i < flaggedDishlists['richInFiber'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFiber'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i], changeIndex, 2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFiber'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i], changeIndex, 2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFiber'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFiber'].includes(solution[changeIndex][3]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i], changeIndex, 2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['richInFiber'].includes(solution[changeIndex][4]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i], changeIndex, 2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessFiber) {

        for (var i = 0; i < flaggedDishlists['notRichInFiber'].length; i++) {
            var attempts = 0;
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFiber'].includes(solution[changeIndex][0] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i], changeIndex, 0])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFiber'].includes(solution[changeIndex][1] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i], changeIndex, 1])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFiber'].includes(solution[changeIndex][2] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i], changeIndex, 2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFiber'].includes(solution[changeIndex][3] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i], changeIndex, 3])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do {
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length - 1))
                    } while (flaggedDishlists['notRichInFiber'].includes(solution[changeIndex][4] && attempts < 10))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i], changeIndex, 4])
                    break;
                }
            }
        }
    }

    if (flagset.hasNonPrefferedDishes) {
        for (var i = 0; i < solution.length; i++) {
            for (var j = 0; j < solution[i].length; j++) {
                if (prefs[soltion[i][j]] == -1) {
                    var attempts = 0;
                    switch (true) {
                        case j == 0: {
                            do {
                                var changeIndex = randomNumber.getRandomNumber(0, dishSet['breakfasts'].length - 1)
                            } while (prefs[changeIndex] == -1 && attempts < 10)
                            possibleMoves.push([dishSet['breakfasts'][changeIndex], i, j]) 
                        }
                        case j == 1: {
                            do {
                                var changeIndex = randomNumber.getRandomNumber(0, dishSet['secondBreakfasts'].length - 1)
                            } while (prefs[changeIndex] == -1 && attempts < 10)
                            possibleMoves.push([dishSet['secondBreakfasts'][changeIndex], i, j]) 
                        }
                        case j == 2: {
                            do {
                                var changeIndex = randomNumber.getRandomNumber(0, dishSet['lunches'].length - 1)
                            } while (prefs[changeIndex] == -1 && attempts < 10)
                            possibleMoves.push([dishSet['lunches'][changeIndex], i, j]) 
                        }
                        case j == 3: {
                            do {
                                var changeIndex = randomNumber.getRandomNumber(0, dishSet['meriendas'].length - 1)
                            } while (prefs[changeIndex] == -1 && attempts < 10)
                            possibleMoves.push([dishSet['meriendas'][changeIndex], i, j]) 
                        }
                        case j == 4: {
                            do {
                                var changeIndex = randomNumber.getRandomNumber(0, dishSet['dinners'].length - 1)
                            } while (prefs[changeIndex] == -1 && attempts < 10)
                            possibleMoves.push([dishSet['dinners'][changeIndex], i, j]) 
                        }
                    }
                }
            }
        }
    }


    return possibleMoves;
}