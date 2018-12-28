'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
var evaluate = require('./eval_solution_sync');

var randomTabuEventEmitter = new events.EventEmitter();

exports.generateRandomSolution = function (pool, conn, reqs, allrgs, prefs, dishlist) {

   var solutionsTabuList = {};
   var atributesTabuList = {};

   var breakfastIdlist = [];
   var secondBreakfastIdlist = [];
   var lunchIdlist = [];
   var meriendaIdlist = [];
   var dinnerIdlist = [];

   var bestSolution = [];
   var bestSolutionValue = [];
   var bestSolutionIteration = 0;

   var searchIterations = 0;

   getDishesByType(pool);

   randomTabuEventEmitter.on('dishesID_received', () => {

      pool.query('SELECT dishes.dshID, allergens.alrID FROM dishes JOIN products_dishes_xref,products,products_allergens_xref, allergens WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID AND products.prdID = products_allergens_xref.prdID  AND allergens.alrID = products_allergens_xref.alrID ')
         .then(res => {
            res.forEach(allergen => {
               if (allrgs.includes(allergen.alrID) && !atributesTabuList.hasOwnProperty(allergen.alrID)) {
                  atributesTabuList[allergen.dshID] = null;
               }
            });
            randomTabuEventEmitter.emit('allergens_received');
         })
   })

   randomTabuEventEmitter.on('allergens_received', () => {

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
      bestSolution = firstSolution.slice();
      randomTabuSearch(firstSolution);

   });
   function randomTabuSearch(solution) {

      var neighbourhood = [];
      var moveValues = {};

      var currentSolutionValue;

      var jsonSolution = JSON.stringify(solution);

      for (var i = 0; i < 20; i++) {

         var tempSolution = JSON.parse(jsonSolution);

         for (var j = 0; j < 3; j++) {

            var changeIndex = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];

            switch (true) {
               case changeIndex[1] == 0: {
                  var randomBreakfastId = randomNumber.getRandomNumber(0, breakfastIdlist.length - 1);
                  tempSolution[changeIndex[0]][changeIndex[1]] = breakfastIdlist[randomBreakfastId];
               }
               case changeIndex[1] == 1: {
                  var randomSecondBreakfastId = randomNumber.getRandomNumber(0, secondBreakfastIdlist.length - 1);
                  tempSolution[changeIndex[0]][changeIndex[1]] = secondBreakfastIdlist[randomSecondBreakfastId];
               }
               case changeIndex[1] == 2: {
                  var randomLunchId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);
                  tempSolution[changeIndex[0]][changeIndex[1]] = lunchIdlist[randomLunchId];
               }
               case changeIndex[1] == 3: {
                  var randomMeriendaId = randomNumber.getRandomNumber(0, meriendaIdlist.length - 1);
                  tempSolution[changeIndex[0]][changeIndex[1]] = meriendaIdlist[randomMeriendaId];
               }
               case changeIndex[1] == 4: {
                  var randomDinnerId = randomNumber.getRandomNumber(0, dinnerIdlist.length - 1);
                  tempSolution[changeIndex[0]][changeIndex[1]] = dinnerIdlist[randomDinnerId];
               }
            }


         }

         neighbourhood[i] = tempSolution;
      }

      neighbourhood.push(solution);
      neighbourhood.push(bestSolution);
      // (function next(p) {
      //    if (neighbourhood.length === p) {
      //       bestSolutionValue = moveValues[p - 2];
      //       currentSolutionValue = moveValues[p - 1];
      //       moveOperation();
      //       return
      //    }

      //    evaluate(neighbourhood[p], pool, reqs, (val) => {
      //       moveValues[p] = val;
      //       next(p + 1);
      //    })
      // })(0);

      evaluate.evaluateSolution(solution,reqs,dishlist);

      for(var index = 0; index < neighbourhood.length; index++){

      }

      function moveOperation() {

         var moveSolutionKey = 21;
         console.log('iteracja = ' + searchIterations);

         for (var key in Object.keys(moveValues)) {
            if (currentSolutionValue > moveValues[key]) {
               currentSolutionValue = moveValues[key];
               moveSolutionKey = key;

            }
            if (bestSolutionValue > currentSolutionValue) {
               bestSolutionValue = currentSolutionValue
               bestSolutionIteration = i;
            }
         }
         if (searchIterations === 100) {
            console.log('wartosc najlepszego rozwiazania = ' + bestSolutionValue);
            process.exit();
         } else {
            searchIterations++;
            randomTabuSearch(neighbourhood[moveSolutionKey]);
         }
      }
   }

   function checkSolutionCredibility(solution) {

      var credibility = true;

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
            randomTabuEventEmitter.emit('dishesID_received');
         })
   }

}
