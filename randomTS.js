'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');
const evalualte = require('./eval_solution');

var randomTabuEventEmitter = new events.EventEmitter();

var breakfastIdlist = [];
var secondBreakfastIdlist = [];
var lunchIdlist = [];
var meriendaIdlist = [];
var dinnerIdlist = [];

var solutionsTabuList = {};

var bestSolution = [];

exports.generateRandomSolution = function (pool, conn, reqs) {

   randomTabuEventEmitter.once('dishesID_received', () => {

      var firstSolution = [];

      for (var i = 0; i < 30; i++) {
         var tempBreakfastId = randomNumber.getRandomNumber(0, breakfastIdlist.length - 1);
         var tempLunchId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);
         var tempDinnerId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);

         firstSolution.push([breakfastIdlist[tempBreakfastId], null, lunchIdlist[tempLunchId], null, dinnerIdlist[tempDinnerId]]);
      }
      var firstHash = crypto.createHash('md5').update(firstSolution.join()).digest('hex');

      solutionsTabuList[firstHash] = 10;
      bestSolution = firstSolution.slice();
      randomTabuSearch(firstSolution);

   });
   function randomTabuSearch(solution) {

      for (var i = 0; i < 1; i++) {

         var changeIndex1 = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];
         var changeIndex2 = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];
         var changeIndex3 = [randomNumber.getRandomNumber(0, 29), randomNumber.getRandomNumber(0, 4)];

         var tempSolution1 = solution.slice();
         tempSolution1[changeIndex1[0]][changeIndex1[1]] = 1000000;
         tempSolution1[changeIndex2[0]][changeIndex2[1]] = 1000000;
         tempSolution1[changeIndex3[0]][changeIndex3[1]] = 1000000;

         var cos = evalualte.evaluateSolution(tempSolution1, pool, reqs);

      }
   }
   getDishesByType(pool);
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
