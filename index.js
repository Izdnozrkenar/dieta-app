'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_condidtions')

var dishList = [];

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();

var reqForUser = evaluator.calculateRequirements(2,78,1.9,63);
console.log(evaluator.reqs);

var rndTS = randomTS.generateRandomSolution(pool,conn);

dbUpdate.updateDishesDatabase(pool,conn);
