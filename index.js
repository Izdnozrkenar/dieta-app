'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_condidtions')

var dishList = [];

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();

evaluator.calculateRequirements(1,78,1.9,63);
var reqForUser = evaluator.reqs

var rndTS = randomTS.generateRandomSolution(pool,conn,reqForUser,[],[]);

dbUpdate.updateDishesDatabase(pool,conn);
