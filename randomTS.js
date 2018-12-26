'use strict';
const events = require('events');

var randomTabuEventEmitter = new events.EventEmitter();

exports.generateRandomSolution = function (pool, conn) {

   var dishIdlist = [];

   randomTabuEventEmitter.addListener('dishesID_received', readIDs)

   pool.query('SELECT dshID,dshType FROM dishes ORDER BY dshID')
      .then(res => {
         res.forEach(element => {
            dishIdlist.push([element.dshID,element.dshType]);
         });
         randomTabuEventEmitter.emit('dishesID_received');
      })

   function readIDs() {
      console.log(dishIdlist);
      process.exit();
   }
}