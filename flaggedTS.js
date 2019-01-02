'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('./eval_functions/eval_solution_sync');
var evaluateFlags = require('./eval_functions/eval_flags');
var possibleMovesByFlagsRand = require('./flaggedTS_possible_moves_random')

var flaggedTabuEventEmitter = new events.EventEmitter();

exports.generateFlaggedSolution = function (pool, reqs, allrgs, prefs, dishlist, maxIterations, pmaxAddDropMoves, pmaxSwapMoves) {

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

    var bestSolution = [];
    var bestSolutionValue = 0;
    var bestSolutionIteration = 0;

    var searchIterations = 0;

    var totalSwapActionCount = 0;
    var totalAddDropActionCount = 0;

    getDishesByType(pool);

    flaggedTabuEventEmitter.on('dish_sorting_complete', function getFirstSolution() {

        var firstSolution = [];

        for (var i = 0; i < 30; i++) {
            do {
                var tempBreakfastId = randomNumber.getRandomNumber(0, dishSet['breakfasts'].length - 1);
            } while (atributesTabuList.hasOwnProperty(tempBreakfastId))

            do {
                var tempSecondBreakfastId = randomNumber.getRandomNumber(0, dishSet['secondBreakfasts'].length - 1);
            } while (atributesTabuList.hasOwnProperty(tempSecondBreakfastId))

            do {
                var tempLunchId = randomNumber.getRandomNumber(0,  dishSet['lunches'].length - 1);
            } while (atributesTabuList.hasOwnProperty(tempLunchId))

            do {
                var tempMeriendaId = randomNumber.getRandomNumber(0, dishSet['meriendas'].length - 1);
            } while (atributesTabuList.hasOwnProperty(tempMeriendaId))

            do {
                var tempDinnerId = randomNumber.getRandomNumber(0, dishSet['dinners'].length - 1);
            } while (atributesTabuList.hasOwnProperty(tempDinnerId))

            firstSolution.push([dishSet['breakfasts'][tempBreakfastId], dishSet['secondBreakfasts'][tempSecondBreakfastId], dishSet['lunches'][tempLunchId], dishSet['meriendas'][tempMeriendaId], dishSet['dinners'][tempDinnerId]]);
        }
        var firstHash = crypto.createHash('md5').update(firstSolution.join()).digest('hex');

        solutionsTabuList[firstHash] = 10;

        bestSolution = JSON.parse(JSON.stringify(firstSolution));
        bestSolutionValue = evaluate.evaluateSolution(bestSolution, reqs, prefs, dishlist);

        return flaggedTabuSearch(firstSolution);

    });

    function flaggedTabuSearch(solution) {

        var neighbourhood = [];
        var moveValues = {};

        var currentSolutionValue = evaluate.evaluateSolution(solution, reqs, prefs, dishlist);
        var flagset = evaluateFlags.getFlagsForSoltuion(solution, reqs, prefs, dishlist);
        var possibleMovesRand = possibleMovesByFlagsRand.getPossbieMovesForFlagsRandomly(solution, flagset, dishSet, flaggedDishesSet, prefs)
        var jsonSolution = JSON.stringify(solution);

        /* prepare movement */

        for (var p = 0; p < possibleMovesRand.length; p++) {

            var tempSolution = JSON.parse(JSON.stringify(solution));
            tempSolution[possibleMovesRand[p][1]][possibleMovesRand[p][2]] = possibleMovesRand[p][0]
            if (checkSolutionCredibility(tempSolution)) {
                neighbourhood.push(tempSolution);
            }
        }

        for (var i = 0; i < 10 * (flagset.isMonotonous); i++) {

            var tempSolution = JSON.parse(jsonSolution);

            var swapChangeIndexFrom = [];
            var swapChangeIndexTo = [];

            for (var q = 0; q < 5; q++) {

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

        /* evaluate neighbourhood */

        for (var index = 0; index < neighbourhood.length; index++) {
            moveValues[index] = evaluate.evaluateSolution(neighbourhood[index], reqs, prefs, dishlist);
        }

        /* adding  current colution to neighbourhood */

        neighbourhood.push(solution);

        var moveSolutionKey = 0;

        /* choose best move */
        for (var key in Object.keys(moveValues)) {
            if (currentSolutionValue >= moveValues[key]) {
                if (checkSolutionCredibility(neighbourhood[key])) {
                    currentSolutionValue = moveValues[key];
                    moveSolutionKey = key
                }
            }
            if (bestSolutionValue > currentSolutionValue) {
                bestSolutionValue = currentSolutionValue;
                bestSolutionIteration = searchIterations;
                bestSolution = JSON.parse(JSON.stringify(neighbourhood[key]))
            }
        }

        /* update tabu */

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

        /* commence move */

        if (searchIterations === maxIterations) {

            console.log('wartosc najlepszego rozwiazania flagged = ' + bestSolutionValue);
            console.log(bestSolutionIteration);
            console.log(totalSwapActionCount + ' operacji swapow');
            console.log(totalAddDropActionCount + ' operacji add/drop');

        } else if (searchIterations % 1000 == 0) {

            /* clear stack */

            searchIterations++;
            setTimeout(() => {
                return flaggedTabuSearch(neighbourhood[moveSolutionKey], pmaxAddDropMoves, pmaxSwapMoves);
            }, 1);

        } else {

            moveSolutionKey > possibleMovesRand.length ? totalSwapActionCount++ : totalAddDropActionCount++;
            searchIterations++;
            return flaggedTabuSearch(neighbourhood[moveSolutionKey]);

        }
    }

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
                flaggedTabuEventEmitter.emit('dishesTypes_sorted');
            })
    }

    flaggedTabuEventEmitter.on('dishesTypes_sorted', () => {

        pool.query('SELECT dishes.dshID, allergens.alrID FROM dishes JOIN products_dishes_xref,products,products_allergens_xref, allergens WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID AND products.prdID = products_allergens_xref.prdID  AND allergens.alrID = products_allergens_xref.alrID ')
            .then(res => {
                res.forEach(allergen => {
                    if (allrgs.includes(allergen.alrID) && !atributesTabuList.hasOwnProperty(allergen.alrID)) {
                        atributesTabuList[allergen.dshID] = null;
                    }
                });
                flaggedTabuEventEmitter.emit('dishesID_received');
            })
    })

    flaggedTabuEventEmitter.on('dishesID_received', () => {

        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshEnergy DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshEnergy DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshEnergy DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshEnergy DESC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInEnergy'].push(dish.dshID);
                })
            })


        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshEnergy ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshEnergy ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshEnergy ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshEnergy ASC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInEnergy'].push(dish.dshID);
                })
            })

        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshProtein DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshProtein DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshProtein DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshProtein DESC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInProtein'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshProtein ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshProtein ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshProtein ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshProtein ASC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInProtein'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshFat DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshFat DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshFat DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshFat DESC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInFat'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshFat ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshFat ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshFat ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshFat ASC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInFat'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshCarbohydrates DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshCarbohydrates DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshCarbohydrates DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshCarbohydrates DESC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInCarbohydrates'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshCarbohydrates ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshCarbohydrates ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshCarbohydrates ASC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshCarbohydrates ASC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInCarbohydrates'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshFiber DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshFiber DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshFiber DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshFiber DESC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['richInFiber'].push(dish.dshID);
                })
            })
        pool.query('(SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1)) ORDER BY dshFiber DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1)) ORDER BY dshFiber DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1)) ORDER BY dshFiber DESC LIMIT 5) UNION (SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1)) ORDER BY dshFiber DESC LIMIT 5)')
            .then(res => {
                res.forEach(dish => {
                    flaggedDishesSet['notRichInFiber'].push(dish.dshID);
                })
                flaggedTabuEventEmitter.emit('dish_sorting_complete')
            })
    })

}
