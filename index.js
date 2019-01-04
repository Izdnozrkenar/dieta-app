'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const randomTSinfluence = require('./randomTSinfluence');
const flaggedTS = require('./flaggedTS');
const partialRandomTS = require('./partial_randomTS')
const partialflaggedTS = require('./partial_flaggedTS')
const strategicOscilationTS = require('./strategic_oscilationTS')
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_functions/eval_condidtions')


var dishList = {};

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();
dbUpdate.updateDishesDatabase(pool, conn);

var preferences = {
}

var requirements = evaluator.calculateRequirements(1, 25, 1.8, 70);


pool.query('SELECT dshID, dshEnergy, dshProtein, dshFat, dshCarbohydrates, dshFiber FROM dishes')
    .then(res => {

        res.forEach(values => {
            dishList[values.dshID]=values;
            preferences[values.dshID] = 0;
        })
        var rndTSinflu = randomTSinfluence.generateRandomSolutionWithInfluenceMechanism(pool, requirements, [], preferences, dishList, 100, 20, 10, 3);
        var rndTS = randomTS.generateRandomSolution(pool, requirements, [], preferences, dishList, 100, 20, 10);
        var flgTS = flaggedTS.generateFlaggedSolution(pool,requirements,[0],preferences,dishList,100);
        var prndTS = partialRandomTS.generatePartialRandomSolution(pool,requirements,[0],preferences,dishList,100)
        var pflgTS = partialflaggedTS.generatePartialFlaggedSolution(pool,requirements,[0],preferences,dishList,100)
        var soTS = strategicOscilationTS.generateStrategicOscilationSolution(pool,requirements,[0],preferences,dishList,20,5);

    })