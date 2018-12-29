'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_condidtions')

var dishList = {};

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();

var preferences = {}

var requirements = evaluator.calculateRequirements(1, 33, 1.1, 60);


pool.query('SELECT dshID, dshEnergy, dshProtein, dshFat, dshCarbohydrates, dshFiber FROM dishes')
    .then(res => {

        res.forEach(values => {
            dishList[values.dshID]=values;
            preferences[values.dshID] = 0;
        })

        var rndTS = randomTS.generateRandomSolution(pool, conn, requirements, [], preferences, dishList,1000,30,10);
    })
    

dbUpdate.updateDishesDatabase(pool, conn);