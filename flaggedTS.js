'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('./eval_solution_sync');
var evaluateFlags = require('./eval_flags');

var flaggedTabuEventEmitter = new events.EventEmitter();

exports.generateFlaggedSolution = function (pool, reqs, allrgs, prefs, dishlist, maxIterations, pmaxAddDropMoves, pmaxSwapMoves) {

    var solutionsTabuList = {};
    var atributesTabuList = {};

    var breakfastIdlist = [];
    var secondBreakfastIdlist = [];
    var lunchIdlist = [];
    var meriendaIdlist = [];
    var dinnerIdlist = [];


    var dishesRichinEnergy = [];
    var dishesNotRichinEnergy = [];
    var dishesRichinProtein = [];
    var dishesNotRichinProtein = [];
    var dishesRichinFat = [];
    var dishesNotRichinFat = [];
    var dishesRichinCarbohydrates = [];
    var dishesNotRichinCarbohydrates = [];
    var dishesRichinFiber = [];
    var dishesNotRichinFiber = [];

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
                var tempBreakfastId = randomNumber.getRandomNumber(0, breakfastIdlist.length - 1);
            } while (atributesTabuList.hasOwnProperty(tempBreakfastId))

            do {
                var tempLunchId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);
            } while (atributesTabuList.hasOwnProperty(tempLunchId))

            do {
                var tempDinnerId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);
            } while (atributesTabuList.hasOwnProperty(tempDinnerId))

            firstSolution.push([breakfastIdlist[tempBreakfastId], null, lunchIdlist[tempLunchId], null, dinnerIdlist[tempDinnerId]]);
        }
        var firstHash = crypto.createHash('md5').update(firstSolution.join()).digest('hex');

        solutionsTabuList[firstHash] = 10;

        bestSolution = JSON.parse(JSON.stringify(firstSolution));
        bestSolutionValue = evaluate.evaluateSolution(bestSolution, reqs, prefs, dishlist);

        return flaggedTabuSearch(firstSolution, pmaxAddDropMoves, pmaxSwapMoves);

    });

    function flaggedTabuSearch(solution, maxAddDropMoves, maxSwapMoves) {

        var neighbourhood = [];
        var moveValues = {};

        var currentSolutionValue = evaluate.evaluateSolution(solution, reqs, prefs, dishlist);

        var jsonSolution = JSON.stringify(solution);

        /* generating neighbourhood of drop/add moves  */

        for (var i = 0; i < maxAddDropMoves; i++) {

            var tempSolution = JSON.parse(jsonSolution);

            /* generating random choice */

            var flagSet = evaluateFlags.getFlagsForSoltuion(neighbourhood[moveSolutionKey],reqs,prefs,dishlist);

            


            for (var j = 0; j < 3; j++) {

                var addDropChangeIndex = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];

                switch (true) {
                    case addDropChangeIndex[1] == 0: {
                        var randomBreakfastId = randomNumber.getRandomNumber(0, breakfastIdlist.length - 1);
                        tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = breakfastIdlist[randomBreakfastId];
                    }
                    case addDropChangeIndex[1] == 1: {
                        var randomSecondBreakfastId = randomNumber.getRandomNumber(0, secondBreakfastIdlist.length - 1);
                        tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = secondBreakfastIdlist[randomSecondBreakfastId];
                    }
                    case addDropChangeIndex[1] == 2: {
                        var randomLunchId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);
                        tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = lunchIdlist[randomLunchId];
                    }
                    case addDropChangeIndex[1] == 3: {
                        var randomMeriendaId = randomNumber.getRandomNumber(0, meriendaIdlist.length - 1);
                        tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = meriendaIdlist[randomMeriendaId];
                    }
                    case addDropChangeIndex[1] == 4: {
                        var randomDinnerId = randomNumber.getRandomNumber(0, dinnerIdlist.length - 1);
                        tempSolution[addDropChangeIndex[0]][addDropChangeIndex[1]] = dinnerIdlist[randomDinnerId];
                    }
                }
            }
            neighbourhood[i] = tempSolution;
        }

        /* generating neighbourhood of swap moves  */

        for (var i = maxAddDropMoves; i < (maxAddDropMoves + maxSwapMoves); i++) {

            var tempSolution = JSON.parse(jsonSolution);

            var swapChangeIndexFrom = [];
            var swapChangeIndexTo = [];

            for (var q = 0; q < 3; q++) {

                swapChangeIndexFrom[q] = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];

                swapChangeIndexTo[q] = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];
            }

            for (var k = 0; k < swapChangeIndexFrom.length; k++) {
                var swappedDish = tempSolution[swapChangeIndexFrom[k][0]][swapChangeIndexFrom[k][1]];
                tempSolution[swapChangeIndexFrom[k][0]][swapChangeIndexFrom[k][1]] = tempSolution[swapChangeIndexTo[k][0]][swapChangeIndexTo[k][1]];
                tempSolution[swapChangeIndexTo[k][0]][swapChangeIndexTo[k][1]] = swappedDish;
            }

            neighbourhood[i] = tempSolution;
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

            console.log('wartosc najlepszego rozwiazania = ' + bestSolutionValue);
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

            (moveSolutionKey > maxAddDropMoves && moveSolutionKey != (maxAddDropMoves + maxSwapMoves + 1)) ? totalSwapActionCount++ : totalAddDropActionCount++;
            searchIterations++;
            return flaggedTabuSearch(neighbourhood[moveSolutionKey], pmaxAddDropMoves, pmaxSwapMoves);

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
        pool.query('SELECT dshID,dshType FROM dishes WHERE dshType >= 10000')
            .then(res => {
                res.forEach(element => {
                    breakfastIdlist.push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/1000)>=1 AND (FLOOR((dshType/1000))%2=1))')
            .then(res => {
                res.forEach(element => {
                    secondBreakfastIdlist.push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/100)>=1 AND (FLOOR((dshType/100))%2=1))')
            .then(res => {
                res.forEach(element => {
                    lunchIdlist.push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/10)>=1 AND (FLOOR((dshType/10))%2=1))')
            .then(res => {
                res.forEach(element => {
                    meriendaIdlist.push(element.dshID);
                });
            })

        pool.query('SELECT dshID FROM dishes WHERE ((dshType/1)>=1 AND (FLOOR((dshType))%2=1))')
            .then(res => {
                res.forEach(element => {
                    dinnerIdlist.push(element.dshID);
                });
                flaggedTabuEventEmitter.emit('dishesID_received');
            })
    }

    flaggedTabuEventEmitter.on('dishesID_received', () => {

        pool.query('SELECT dishes.dshID, allergens.alrID FROM dishes JOIN products_dishes_xref,products,products_allergens_xref, allergens WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID AND products.prdID = products_allergens_xref.prdID  AND allergens.alrID = products_allergens_xref.alrID ')
            .then(res => {
                res.forEach(allergen => {
                    if (allrgs.includes(allergen.alrID) && !atributesTabuList.hasOwnProperty(allergen.alrID)) {
                        atributesTabuList[allergen.dshID] = null;
                    }
                });
                flaggedTabuEventEmitter.emit('allergens_received');
            })
    })

    flaggedTabuEventEmitter.on('allergens_received', () => {

        pool.query('SELECT dishes.dshID, allergens.alrID FROM dishes JOIN products_dishes_xref,products,products_allergens_xref, allergens WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID AND products.prdID = products_allergens_xref.prdID  AND allergens.alrID = products_allergens_xref.alrID ')
            .then(res => {
                res.forEach(allergen => {
                    if (allrgs.includes(allergen.alrID) && !atributesTabuList.hasOwnProperty(allergen.alrID)) {
                        atributesTabuList[allergen.dshID] = null;
                    }
                });
                flaggedTabuEventEmitter.emit('dishes_sorted_by_flag');
            })
    })

    flaggedTabuEventEmitter.on('dishesID_received', () => {

        pool.query('SELECT dshID FROM dishes ORDER BY dshEnergy DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesRichinEnergy.push(dish);
                })
            })

        pool.query('SELECT dshID FROM dishes ORDER BY dshEnergy ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesNotRichinEnergy.push(dish);
                })
            })

        pool.query('SELECT dshID FROM dishes ORDER BY dshProtein DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesRichinProtein.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshProtein ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesNotRichinProtein.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFat DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesRichinFat.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFat ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesNotRichinFat.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshCarbohydrates DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesRichinCarbohydrates.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshCarbohydrates ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesNotRichinCarbohydrates.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFiber DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesRichinFiber.push(dish);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFiber ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    dishesNotRichinFiber.push(dish);
                })
                flaggedTabuEventEmitter.emit('dish_sorting_complete')
            })
    })

}
