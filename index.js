'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const randomTSinfluence = require('./randomTSinfluence');
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_condidtions')

var dishList = {};

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();
dbUpdate.updateDishesDatabase(pool, conn);

var preferences = {}

var requirements = evaluator.calculateRequirements(1, 33, 2.3, 60);


pool.query('SELECT dshID, dshEnergy, dshProtein, dshFat, dshCarbohydrates, dshFiber FROM dishes')
    .then(res => {

        res.forEach(values => {
            dishList[values.dshID]=values;
            preferences[values.dshID] = 0;
        })
        var rndTSinflu = randomTSinfluence.generateRandomSolutionWithInfluenceMechanism(pool, requirements, [10], preferences, dishList, 1000, 20, 10, 3);
        var rndTS = randomTS.generateRandomSolution(pool, conn, requirements, [10], preferences, dishList, 1000, 30, 10);

    })