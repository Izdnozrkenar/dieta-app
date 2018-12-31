'use strict';
const randomNumber = require('./randomNumberGenerator');

exports.getPossbieMovesForFlags = function (solution, flagset, dishSet, flaggedDishlists, prefs) {

    var possibleMoves = []

    if (flagset.needsMoreEnergy) {

        for(var i = 0; i < flaggedDishlists['richInEnergy'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInEnergy'].includes(solution[j][0])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInEnergy'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInEnergy'].includes(solution[j][1])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInEnergy'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInEnergy'].includes(solution[j][2])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInEnergy'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInEnergy'].includes(solution[j][3])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInEnergy'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInEnergy'].includes(solution[j][4])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInEnergy'][i],j,4])
                    }
                    break;
                }
            }
        }
    }
    /*
    if (flagset.needsLessEnergy) {

        for(var i = 0; i < flaggedDishlists['notRichInEnergy'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInEnergy'].includes(solution[j][0]) && solution[j][0]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInEnergy'].includes(solution[j][1]) && solution[j][1]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInEnergy'].includes(solution[j][2]) && solution[j][2]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInEnergy'].includes(solution[j][3]) && solution[j][3]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInEnergy'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInEnergy'].includes(solution[j][4]) && solution[j][4]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInEnergy'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreProtein) {

        for(var i = 0; i < flaggedDishlists['richInProtein'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInProtein'].includes(solution[j][0])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInProtein'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInProtein'].includes(solution[j][1])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInProtein'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInProtein'].includes(solution[j][2])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInProtein'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInProtein'].includes(solution[j][3])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInProtein'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInProtein'].includes(solution[j][4])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInProtein'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsLessProtein) {

        for(var i = 0; i < flaggedDishlists['notRichInProtein'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInProtein'].includes(solution[j][0]) && solution[j][0]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInProtein'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInProtein'].includes(solution[j][1]) && solution[j][1]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInProtein'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInProtein'].includes(solution[j][2]) && solution[j][2]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInProtein'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInProtein'].includes(solution[j][3]) && solution[j][3]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInProtein'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInProtein'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInProtein'].includes(solution[j][4]) && solution[j][4]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInProtein'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreFat) {

        for(var i = 0; i < flaggedDishlists['richInFat'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFat'].includes(solution[j][0])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFat'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFat'].includes(solution[j][1])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFat'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFat'].includes(solution[j][2])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFat'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFat'].includes(solution[j][3])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFat'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFat'].includes(solution[j][4])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFat'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsLessFat) {

        for(var i = 0; i < flaggedDishlists['notRichInFat'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFat'].includes(solution[j][0]) && solution[j][0]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFat'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFat'].includes(solution[j][1]) && solution[j][1]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFat'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFat'].includes(solution[j][2]) && solution[j][2]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFat'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFat'].includes(solution[j][3]) && solution[j][3]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFat'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInFat'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFat'].includes(solution[j][4]) && solution[j][4]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFat'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreCarbohydrates) {

        for(var i = 0; i < flaggedDishlists['richInCarbohydrates'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInCarbohydrates'].includes(solution[j][0])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInCarbohydrates'].includes(solution[j][1])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInCarbohydrates'].includes(solution[j][2])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInCarbohydrates'].includes(solution[j][3])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInCarbohydrates'].includes(solution[j][4])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInCarbohydrates'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsLessCarbohydrates) {

        for(var i = 0; i < flaggedDishlists['notRichInCarbohydrates'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInCarbohydrates'].includes(solution[j][0]) && solution[j][0]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInCarbohydrates'].includes(solution[j][1]) && solution[j][1]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInCarbohydrates'].includes(solution[j][2]) && solution[j][2]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInCarbohydrates'].includes(solution[j][3]) && solution[j][3]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInCarbohydrates'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInCarbohydrates'].includes(solution[j][4]) && solution[j][4]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInCarbohydrates'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsMoreFiber) {

        for(var i = 0; i < flaggedDishlists['richInFiber'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['richInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFiber'].includes(solution[j][0])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFiber'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['richInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFiber'].includes(solution[j][1])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFiber'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['richInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFiber'].includes(solution[j][2])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFiber'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['richInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFiber'].includes(solution[j][3])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFiber'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['richInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['richInFiber'].includes(solution[j][4])){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['richInFiber'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if (flagset.needsLessFiber) {

        for(var i = 0; i < flaggedDishlists['notRichInFiber'].length; i++){
            switch (true) {
                case dishSet['breakfasts'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFiber'].includes(solution[j][0]) && solution[j][0]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFiber'][i],j,2])
                    }
                    break;
                }
                case dishSet['secondBreakfasts'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFiber'].includes(solution[j][1]) && solution[j][1]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFiber'][i],j,2])
                    }
                    break;
                }
                case dishSet['lunches'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFiber'].includes(solution[j][2]) && solution[j][2]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFiber'][i],j,2])
                    }
                    break;
                }
                case dishSet['meriendas'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFiber'].includes(solution[j][3]) && solution[j][3]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFiber'][i],j,3])
                    }
                    break;
                }
                case dishSet['dinners'].includes(flaggedDishlists['notRichInFiber'][i]): {
                    var j = 0;
                    while(j<=solution.length && !flaggedDishlists['notRichInFiber'].includes(solution[j][4]) && solution[j][4]){
                        j++;
                    }
                    if(j!=solution.length){
                        possibleMoves.push([flaggedDishlists['notRichInFiber'][i],j,4])
                    }
                    break;
                }
            }
        }
    }

    if(flagset.hasNonPrefferedDishes){
        for(var p = 0; p < solution.length ; p++){
            for(var q = 0; q < solution[p].length; q++){
                if(prefs[solution[p][q]]==-1){
                    switch(true){
                        case p==0:{
                            do{
                                var acceptableDishID = randomNumber.getRandomNumber(0, dishSet['breakfasts'].length - 1); 
                            }while (prefs[acceptableDishID]!=-1)
                            possibleMoves.push([acceptableDishID,p,q])
                        }
                        case p==1:{
                            do{
                                var acceptableDishID = randomNumber.getRandomNumber(0, dishSet['secondBreakfasts'].length - 1); 
                            }while (prefs[acceptableDishID]!=-1)
                            possibleMoves.push([acceptableDishID,p,q])
                        }
                        case p==2:{
                            do{
                                var acceptableDishID = randomNumber.getRandomNumber(0, dishSet['lunches'].length - 1); 
                            }while (prefs[acceptableDishID]!=-1)
                            possibleMoves.push([acceptableDishID,p,q])
                        }
                        case p==3:{
                            do{
                                var acceptableDishID = randomNumber.getRandomNumber(0, dishSet['meriendas'].length - 1); 
                            }while (prefs[acceptableDishID]!=-1)
                            possibleMoves.push([acceptableDishID,p,q])
                        }
                        case p==4:{
                            do{
                                var acceptableDishID = randomNumber.getRandomNumber(0, dishSet['dinners'].length - 1); 
                            }while (prefs[acceptableDishID]!=-1)
                            possibleMoves.push([acceptableDishID,p,q])
                        }
                    }
                }
            }
        }
    }
    */
    return possibleMoves;
}