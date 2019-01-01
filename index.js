'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const randomTSinfluence = require('./randomTSinfluence');
const flaggedTS = require('./flaggedTS');
const partialflaggedTS = require('./partial_randomTS')
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
        //var rndTSinflu = randomTSinfluence.generateRandomSolutionWithInfluenceMechanism(pool, requirements, [], preferences, dishList, 500, 20, 10, 1);
        //var rndTS = randomTS.generateRandomSolution(pool, requirements, [], preferences, dishList, 150, 20, 10);
        //var flgTS = flaggedTS.generateFlaggedSolution(pool,requirements,[0],preferences,dishList,500);
        var pflgTS = partialflaggedTS.generatePartialRandomSolution(pool,requirements,[0],preferences,dishList,20)

    })