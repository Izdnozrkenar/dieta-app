'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./random_TS_functions/randomTS.js');
const randomTSinfluence = require('./random_TS_functions/randomTSinfluence');
const flaggedTS = require('./flagged_TS_functions/flaggedTS');
const partialRandomTS = require('./random_TS_functions/partial_randomTS')
const partialflaggedTS = require('./flagged_TS_functions/partial_flaggedTS')
const strategicOscilationTS = require('./strategic_oscilation/strategic_oscilationTS')
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_functions/eval_condidtions')
var express = require('express')


var dishList = {};

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();
dbUpdate.updateDishesDatabase(pool, conn);

var preferences = {}

var requirements = evaluator.calculateRequirements(1, 25, 1.8, 70);

var app = express();
var port = process.env.PORT || 3000;

app.listen(port);


var done = false;
var diet = [];

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

app.route('/dania').get(async function (req, res) {
    var generation = await getQuery((val) => {
        res.json(val)
    })
})

async function getQuery(resolve) {
    var prndTS = await partialRandomTS.generatePartialRandomSolution(pool, requirements, [0], preferences, 10, function (bsol) {
        diet = JSON.parse(JSON.stringify(bsol));
        resolve(diet);
    })
}