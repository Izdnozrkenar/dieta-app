'use strict';
const events = require('events');
const randomNumber = require('./randomNumberGenerator');
const crypto = require('crypto');

var randomTabuEventEmitter = new events.EventEmitter();

var breakfastIdlist = [];
var secondBreakfastIdlist = [];
var lunchIdlist = [];
var meriendaIdlist = [];
var dinnerIdlist = [];

var solutionsTabuList = {};

var currentSolution = [];
var bestSolution = [];

exports.generateRandomSolution = function (pool) {

   randomTabuEventEmitter.once('dishesID_received', generateFirstSolution)

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

function generateFirstSolution() {
   for (var i = 0; i < 30; i++) {
      var tempBreakfastId = randomNumber.getRandomNumber(0, breakfastIdlist.length - 1);
      var tempLunchId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);
      var tempDinnerId = randomNumber.getRandomNumber(0, lunchIdlist.length - 1);

      currentSolution.push([tempBreakfastId, null, tempLunchId, null, tempDinnerId]);
   }
   var firstHash = crypto.createHash('md5').update(currentSolution.join()).digest('hex');

   solutionsTabuList[firstHash] = 10;
   randomTabuSearch(currentSolution);
}

function randomTabuSearch(solution) {
   for (var i = 0; i < 1; i++) {

      var temp1 = [randomNumber.getRandomNumber(0, 4), randomNumber.getRandomNumber(0, 29)];
      var temp2 = [randomNumber.getRandomNumber(0, 4), randomNumber.getRandomNumber(0, 29)];
      var temp3 = [randomNumber.getRandomNumber(0, 4), randomNumber.getRandomNumber(0, 29)];

      console.log(temp1);
      console.log(temp2);

   }
}