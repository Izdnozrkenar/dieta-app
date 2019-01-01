'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('./eval_solution_sync');
var evalPartial = require('./eval_solution_partial_sync')

var pflaggedTabuEventEmitter = new events.EventEmitter();

exports.generatePartialRandomSolution = function (pool, reqs, allrgs, prefs, dishlist, maxIterations, pmaxAddDropMoves, pmaxSwapMoves) {

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

    var searchIterations = 0;


    getDishesByType(pool);

    pflaggedTabuEventEmitter.on('dish_sorting_complete', () => {

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

            if (rowsCount == 6) {
                optimizeSolutionBlock(0)
            } else {
                solution.push(row[moveSolutionKey]);
                getRow(++rowsCount)
            }
        };

        function optimizeSolutionBlock(blockIterationsCount) {

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

            if (blocksCount == 5) {

                console.log('wartosc najlepszego rozwiazania to = ' + evaluate.evaluateSolution(solution, reqs, prefs, dishlist));

            } else if (blockIterationsCount === 500) {

                blocksCount++;
                getRow(0)                

            } else {
                optimizeSolutionBlock(blockIterationsCount+1);
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

    pflaggedTabuEventEmitter.on('dishesID_received', () => {

        pool.query('SELECT dshID FROM dishes ORDER BY dshEnergy DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInEnergy'].push(dish.dshID);
                })
            })


        pool.query('SELECT dshID FROM dishes ORDER BY dshEnergy ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInEnergy'].push(dish.dshID);
                })
            })

        pool.query('SELECT dshID FROM dishes ORDER BY dshProtein DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInProtein'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshProtein ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInProtein'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFat DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInFat'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFat ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInFat'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshCarbohydrates DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInCarbohydrates'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshCarbohydrates ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInCarbohydrates'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFiber DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInFiber'].push(dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFiber ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInFiber'].push(dish.dshID);
                })
                pflaggedTabuEventEmitter.emit('dish_sorting_complete')
            })
    })

}
