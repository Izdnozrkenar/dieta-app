'use strict';
const events = require('events');
const randomNumber = require('../randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('../eval_functions/eval_solution_sync');
var evalPartial = require('../eval_functions/eval_solution_partial_sync')

var pflaggedTabuEventEmitter = new events.EventEmitter();

exports.generatePartialRandomSolution = async function (pool, reqs, allrgs, prefs, iterations,callback) {return new Promise(resolve => {

    var solutionsTabuList = {};
    var atributesTabuList = {};

    var dishSet = {
        breakfasts: [],
        secondBreakfasts: [],
        lunches: [],
        meriendas: [],
        dinners: []
    };

    var dishListSet = {}
    

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

    var searchIterations = 0;


    getDishesByType(pool);

    pflaggedTabuEventEmitter.once('dishlist_received', () => {

        var solution = [];
        var blocksCount = 0;
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
                moveValues[index] = evalPartial.evaluatePartialSolution(row[index], reqs, prefs, dishListSet);
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

            if (rowsCount == 5) {
                optimizeSolutionBlock(0, false)
            } else {
                solution.push(row[moveSolutionKey]);
                getRow(++rowsCount)
            }
        };

        function optimizeSolutionBlock(blockIterationsCount, allowSwaps) {

            var neighbourhood = [];
            var currentSolutionValue = evaluate.evaluateSolution(solution, reqs, prefs, dishListSet);

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
                        swapChangeIndexFrom[q] = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];
                    } while (!tempSolution[swapChangeIndexFrom[q][0]][swapChangeIndexFrom[q][1]])

                    do {
                        swapChangeIndexTo[q] = [randomNumber.getRandomNumber(0, 29), swapChangeIndexFrom[q][1]];
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
                moveValues[index] = evaluate.evaluateSolution(neighbourhood[index], reqs, prefs, dishListSet);
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
            if (blockIterationsCount == (iterations + 50)) {

                for(var i = 0; i< solution.length; i++){
                    for(var j=0; j< solution[i].length;j++){
                        solution[i][j]=dishListSet[solution[i][j]]['dshName']
                    }
                }
                
                callback(solution);
                return;

            } else if (blocksCount == 5) {

                optimizeSolutionBlock(blockIterationsCount + 1, true);

            } else if (blockIterationsCount === iterations) {

                blocksCount++;
                getRow(0)

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

    pflaggedTabuEventEmitter.once('dishesTypes_sorted', () => {

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

    pflaggedTabuEventEmitter.once('dishesID_received', () => {

        pool.query('SELECT dshID, dshName, dshEnergy, dshProtein, dshFat, dshCarbohydrates, dshFiber FROM dishes')
        .then(async res => {
            res.forEach(values => {
                dishListSet[values.dshID] = values;
            })
            pflaggedTabuEventEmitter.emit('dishlist_received');
        })
    })
})}
