'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('./eval_functions/eval_solution_sync');
var evalPartial = require('./eval_functions/eval_solution_partial_sync')

var pflaggedTabuEventEmitter = new events.EventEmitter();

exports.generateStrategicOscilationSolution = function (pool, reqs, allrgs, prefs, dishlist, iterations, period) {

    var solutionsTabuList = {};
    var atributesTabuList = {};

    var dishSet = {
        breakfasts: [],
        secondBreakfasts: [],
        lunches: [],
        meriendas: [],
        dinners: []
    };

    var flaggedDishesSet = {
        richInEnergy: [],
        notRichInEnergy: [],
        richInProtein: [],
        notRichInProtein: [],
        richInFat: [],
        notRichInFat: [],
        richInCarbohydrates: [],
        notRichInCarbohydrates: [],
        richInFiber: [],
        notRichInFiber: []
    }

    getDishesByType(pool);

    pflaggedTabuEventEmitter.on('dishesID_received', () => {

        var bestSolution = [];
        var bestSolutionValue = 0;
        var bestSolutionPeriod = 0;

        var solution = [];
        var risingEdge = true;
        var fallingEdge = false;
        var periodCount = 0;
        getRow(0);


        function getRow(rowsCount) {

            var moveValues = {};

            var row = [];

            for (var i = 0; i < 20; i++) {
                do {
                    var tempBreakfastId = randomNumber.getRandomNumber(0, dishSet['breakfasts'].length - 1);
                } while (atributesTabuList.hasOwnProperty(tempBreakfastId))

                do {
                    var tempSecondBreakfastId = randomNumber.getRandomNumber(0, dishSet['secondBreakfasts'].length - 1);
                } while (atributesTabuList.hasOwnProperty(tempSecondBreakfastId))

                do {
                    var tempLunchId = randomNumber.getRandomNumber(0, dishSet['lunches'].length - 1);
                } while (atributesTabuList.hasOwnProperty(tempLunchId))

                do {
                    var tempMeriendaId = randomNumber.getRandomNumber(0, dishSet['meriendas'].length - 1);
                } while (atributesTabuList.hasOwnProperty(tempMeriendaId))

                do {
                    var tempDinnerId = randomNumber.getRandomNumber(0, dishSet['dinners'].length - 1);
                } while (atributesTabuList.hasOwnProperty(tempDinnerId))

                row.push([dishSet['breakfasts'][tempBreakfastId], dishSet['secondBreakfasts'][tempSecondBreakfastId], dishSet['lunches'][tempLunchId], dishSet['meriendas'][tempMeriendaId], dishSet['dinners'][tempDinnerId]]);

            }

            for (var index = 0; index < row.length; index++) {
                moveValues[index] = evalPartial.evaluatePartialSolution(row[index], reqs, prefs, dishlist);
            }

            var currentSolutionValue = moveValues[0];
            var moveSolutionKey = 0;

            for (var key in Object.keys(moveValues)) {
                if (currentSolutionValue >= moveValues[key]) {
                    if (checkRowCredibility(row[key])) {
                        currentSolutionValue = moveValues[key];
                        moveSolutionKey = key
                    }
                }
            }

            for (var tabu in atributesTabuList) {
                if (atributesTabuList[tabu]) {
                    atributesTabuList[tabu] -= 1;
                    if (atributesTabuList[tabu] == 0) {
                        delete atributesTabuList[tabu];
                    }
                }
            }

            for (var index = 0; index < row[moveSolutionKey].length; index++) {
                atributesTabuList[row[moveSolutionKey][index]] = 3;
            }

            solution.push(row[moveSolutionKey]);

            if (rowsCount == 14) {

                risingEdge = true;
                fallingEdge = false;
                optimizeSolutionBlock(0, false);

            } else if (rowsCount == 29) {

                optimizeSolutionBlock(0, true);

            } else if (rowsCount == 44) {

                risingEdge = false;
                fallingEdge = true;
                optimizeSolutionBlock(0, false);

            } else {

                getRow(++rowsCount)

            }
        };

        function removeRow(rowsCount) {
            
            var moveValues = {};

            var removeRowMoves = [];

            for (var i = 0; i < solution.length; i++) {

                var tempSolution = JSON.parse(JSON.stringify(solution));
                tempSolution.splice(i, 1)

                removeRowMoves.push(tempSolution);
            }

            for (var index = 0; index < removeRowMoves.length; index++) {
                moveValues[index] = evaluate.evaluateSolution(removeRowMoves[index], reqs, prefs, dishlist);
            }

            var currentSolutionValue = moveValues[0];
            var moveSolutionKey = 0;

            for (var key in Object.keys(moveValues)) {
                if (currentSolutionValue >= moveValues[key]) {
                    if (checkRowCredibility(removeRowMoves[key])) {
                        currentSolutionValue = moveValues[key];
                        moveSolutionKey = key;
                    }
                }
            }

            var currentSolutionHash = crypto.createHash('md5').update(solution.join()).digest('hex');

            solutionsTabuList[currentSolutionHash] = 50;

            for (var tabu in solutionsTabuList) {
                if (solutionsTabuList[tabu]) {
                    solutionsTabuList[tabu] -= 1;
                    if (solutionsTabuList[tabu] == 0) {
                        delete solutionsTabuList[tabu];
                    }
                }
            }

            solution.splice(moveSolutionKey,1);

            if (rowsCount == 16) {

                periodCount++;
                risingEdge = true;
                fallingEdge = false;
                optimizeSolutionBlock(0, false);

            } else if (rowsCount == 31) {

                optimizeSolutionBlock(0, true);

            } else {

                removeRow(--rowsCount)

            }
        };

        function optimizeSolutionBlock(blockIterationsCount, allowSwaps) {

            if(periodCount==0 && allowSwaps){
                bestSolution=JSON.parse(JSON.stringify(solution))
                bestSolutionValue=evaluate.evaluateSolution(bestSolution, reqs, prefs, dishlist);
                bestSolutionPeriod=periodCount;
            }

            var neighbourhood = [];
            var currentSolutionValue = evaluate.evaluateSolution(solution, reqs, prefs, dishlist);

            for (var i = 0; i < 20; i++) {

                var tempSolution = JSON.parse(JSON.stringify(solution));

                /* generating random choice */

                for (var j = 0; j < 2; j++) {

                    var addDropChangeIndex = [randomNumber.getRandomNumber(0, solution.length - 1), randomNumber.getRandomNumber(0, 4)];

                    switch (true) {
                        case addDropChangeIndex[1] == 0: {
                            var randomBreakfastId = randomNumber.getRandomNumber(0, (dishSet['breakfasts'].length - 1));
                            tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = dishSet['breakfasts'][randomBreakfastId];
                            break;
                        }
                        case addDropChangeIndex[1] == 1: {
                            var randomSecondBreakfastId = randomNumber.getRandomNumber(0, (dishSet['secondBreakfasts'].length - 1));
                            tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = dishSet['secondBreakfasts'][randomSecondBreakfastId];
                            break;
                        }
                        case addDropChangeIndex[1] == 2: {
                            var randomLunchId = randomNumber.getRandomNumber(0, (dishSet['lunches'].length - 1));
                            tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = dishSet['lunches'][randomLunchId];
                            break;
                        }
                        case addDropChangeIndex[1] == 3: {
                            var randomMeriendaId = randomNumber.getRandomNumber(0, (dishSet['meriendas'].length - 1));
                            tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = dishSet['meriendas'][randomMeriendaId];
                            break;
                        }
                        case addDropChangeIndex[1] == 4: {
                            var randomDinnerId = randomNumber.getRandomNumber(0, (dishSet['dinners'].length - 1));
                            tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = dishSet['dinners'][randomDinnerId];
                            break;
                        }
                    }
                }
                neighbourhood.push(tempSolution);
            }

            for (var i = 0; i < 15 * (allowSwaps); i++) {

                var tempSolution = JSON.parse(JSON.stringify(solution));

                var swapChangeIndexFrom = [];
                var swapChangeIndexTo = [];

                for (var q = 0; q < 2; q++) {

                    do {
                        swapChangeIndexFrom[q] = [randomNumber.getRandomNumber(0, tempSolution.length - 1), randomNumber.getRandomNumber(0, 4)];
                    } while (!tempSolution[swapChangeIndexFrom[q][0]][swapChangeIndexFrom[q][1]])

                    do {
                        swapChangeIndexTo[q] = [randomNumber.getRandomNumber(0, tempSolution.length - 1), swapChangeIndexFrom[q][1]];
                    } while (!tempSolution[swapChangeIndexTo[q][0]][swapChangeIndexTo[q][1]])
                }



                for (var k = 0; k < swapChangeIndexFrom.length; k++) {
                    var swappedDish = tempSolution[swapChangeIndexFrom[k][0]][swapChangeIndexFrom[k][1]];
                    tempSolution[swapChangeIndexFrom[k][0]][swapChangeIndexFrom[k][1]] = tempSolution[swapChangeIndexTo[k][0]][swapChangeIndexTo[k][1]];
                    tempSolution[swapChangeIndexTo[k][0]][swapChangeIndexTo[k][1]] = swappedDish;
                }

                neighbourhood.push(tempSolution);
            }

            var moveValues = {};

            for (var tabu in atributesTabuList) {
                if (atributesTabuList[tabu]) {
                    delete atributesTabuList[tabu];
                }
            }

            for (var index = 0; index < neighbourhood.length; index++) {
                moveValues[index] = evaluate.evaluateSolution(neighbourhood[index], reqs, prefs, dishlist);
            }

            var moveSolutionKey = 0

            for (var key in Object.keys(moveValues)) {
                if (currentSolutionValue >= moveValues[key]) {
                    if (checkSolutionCredibility(neighbourhood[key])) {
                        currentSolutionValue = moveValues[key];
                        moveSolutionKey = key
                        solution = neighbourhood[key]
                    }
                }
                if (bestSolutionValue > currentSolutionValue && allowSwaps) {
                    bestSolutionValue = currentSolutionValue;
                    bestSolutionPeriod = periodCount;
                    bestSolution = JSON.parse(JSON.stringify(neighbourhood[key]))
                }
            }

            var currentSolutionHash = crypto.createHash('md5').update(solution.join()).digest('hex');

            solutionsTabuList[currentSolutionHash] = 50;

            for (var tabu in solutionsTabuList) {
                if (solutionsTabuList[tabu]) {
                    solutionsTabuList[tabu] -= 1;
                    if (solutionsTabuList[tabu] == 0) {
                        delete solutionsTabuList[tabu];
                    }
                }
            }

            if (periodCount == period) {

                console.log(evaluate.evaluateSolution(bestSolution, reqs, prefs, dishlist))
                console.log('w okresie ' + bestSolutionPeriod)

            } else if (blockIterationsCount === iterations && risingEdge) {

                getRow(solution.length);

            } else if (blockIterationsCount === iterations && fallingEdge) {

                removeRow(solution.length);

            } else {

                setTimeout(() => {
                    optimizeSolutionBlock(blockIterationsCount + 1, false);
                }, 1);
            }
        }
    });





    function checkSolutionCredibility(solution) {

        if (solutionsTabuList.hasOwnProperty(crypto.createHash('md5').update(solution.join()).digest('hex'))) {
            return false;
        }
        for (var i = 0; i < solution.length; i++) {
            for (var j = 0; j < solution[i].length; j++) {
                if (atributesTabuList.hasOwnProperty(solution[i][j])) {
                    return false;
                }
            }
        }
        return true;
    }

    function checkRowCredibility(row) {
        for (var i = 0; i < row.length; i++) {
            if (atributesTabuList.hasOwnProperty(row[i])) {
                return false;
            }
        }
        return true;
    }


    function getDishesByType(pool) {
        pool.query('SELECT dshID FROM dishes WHERE dshType >= 10000')
            .then(res => {
                res.forEach(element => {
                    dishSet['breakfasts'].push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1))')
            .then(res => {
                res.forEach(element => {
                    dishSet['secondBreakfasts'].push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1))')
            .then(res => {
                res.forEach(element => {
                    dishSet['lunches'].push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1))')
            .then(res => {
                res.forEach(element => {
                    dishSet['meriendas'].push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1))')
            .then(res => {
                res.forEach(element => {
                    dishSet['dinners'].push(element.dshID);
                });
                pflaggedTabuEventEmitter.emit('dishesTypes_sorted');
            })
    }

    pflaggedTabuEventEmitter.on('dishesTypes_sorted', () => {

        pool.query('SELECT dishes.dshID, allergens.alrID FROM dishes JOIN products_dishes_xref,products,products_allergens_xref, allergens WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID AND products.prdID = products_allergens_xref.prdID  AND allergens.alrID = products_allergens_xref.alrID ')
            .then(res => {
                res.forEach(allergen => {
                    if (allrgs.includes(allergen.alrID) && !atributesTabuList.hasOwnProperty(allergen.alrID)) {
                        atributesTabuList[allergen.dshID] = null;
                    }
                });
                pflaggedTabuEventEmitter.emit('dishesID_received');
            })
    })
}
