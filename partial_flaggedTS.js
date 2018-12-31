'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('./eval_solution_sync');
var evalPartial = require('./eval_solution_partial_sync')

var pflaggedTabuEventEmitter = new events.EventEmitter();

exports.generatePartialFlaggedSolution = function (pool, reqs, allrgs, prefs, dishlist, maxIterations, pmaxAddDropMoves, pmaxSwapMoves) {

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

    var solution = [];

    getDishesByType(pool);

    pflaggedTabuEventEmitter.on('dish_sorting_complete', () => {

        getRow(0);

        function getRow(blockCount) {

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
                    if (checkSolutionCredibility(row[key])) {
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

            for(var index = 0; index < row[moveSolutionKey].length; index++){
                atributesTabuList[row[moveSolutionKey][index]] = 3;
            }
    
            console.log(moveSolutionKey);
    
            if (blockCount == 5) {
                
                console.log('koniec');
            } else {
                solution.push(row[moveSolutionKey]);
                getRow(++blockCount)
            }
        };

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
