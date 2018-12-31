'use strict';
const randomNumber = require('./randomNumberGenerator');

exports.getPossbieMovesForFlagsRandomly = function (solution, flagset, dishSet, flaggedDishlists, prefs) {
    
    var possibleMoves = []

    if (flagset.needsMoreEnergy) {

        for(var i = 0; i < flaggedDishlists['richInEnergy'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessEnergy) {

        for(var i = 0; i < flaggedDishlists['notRichInEnergy'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreEnergy) {

        for(var i = 0; i < flaggedDishlists['richInEnergy'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInEnergy'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInEnergy'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessEnergy) {

        for(var i = 0; i < flaggedDishlists['notRichInEnergy'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInEnergy'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreProtein) {

        for(var i = 0; i < flaggedDishlists['richInProtein'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInProtein'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInProtein'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInProtein'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInProtein'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInProtein'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInProtein'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessProtein) {

        for(var i = 0; i < flaggedDishlists['notRichInProtein'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInProtein'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInProtein'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInProtein'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInProtein'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInProtein'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInProtein'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreFat) {

        for(var i = 0; i < flaggedDishlists['richInFat'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFat'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFat'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFat'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFat'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFat'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFat'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessFat) {

        for(var i = 0; i < flaggedDishlists['notRichInFat'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFat'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFat'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFat'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFat'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInFat'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFat'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFat'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreCarbohydrates) {

        for(var i = 0; i < flaggedDishlists['richInCarbohydrates'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInCarbohydrates'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInCarbohydrates'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInCarbohydrates'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInCarbohydrates'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInCarbohydrates'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessCarbohydrates) {

        for(var i = 0; i < flaggedDishlists['notRichInCarbohydrates'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInCarbohydrates'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInCarbohydrates'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInCarbohydrates'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInCarbohydrates'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInCarbohydrates'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreFiber) {

        for(var i = 0; i < flaggedDishlists['richInFiber'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFiber'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFiber'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFiber'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFiber'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['richInFiber'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['richInFiber'][i],changeIndex,2])
                    break;
                }
            }
        }
    }

    if (flagset.needsLessFiber) {

        for(var i = 0; i < flaggedDishlists['notRichInFiber'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFiber'].includes(solution[0][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFiber'].includes(solution[1][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFiber'].includes(solution[2][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFiber'].includes(solution[3][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i],changeIndex,2])
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    do{
                        var changeIndex = randomNumber.getRandomNumber(0, (solution.length-1))
                    }while(flaggedDishlists['notRichInFiber'].includes(solution[4][changeIndex]))
                    possibleMoves.push([flaggedDishlists['notRichInFiber'][i],changeIndex,2])
                    break;
                }
            }
        }
    }


    return possibleMoves;
}