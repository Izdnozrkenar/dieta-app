'use strict';
const dbConnector = require('./poolmodule');
const randomTS = require('./random_TS_functions/randomTS.js');
const randomTSinfluence = require('./random_TS_functions/randomTSinfluence');
const flaggedTS = require('./flagged_TS_functions/flaggedTS');
const partialRandomTS = require('./random_TS_functions/partial_randomTS')
const partialflaggedTS = require('./flagged_TS_functions/partial_flaggedTS')
const strategicOscilationTS = require('./strategic_oscilation/strategic_oscilationTS')
const dbUpdate = require('./databaseStaticUpdate');
const evaluator = require('./eval_functions/eval_condidtions');
const cors = require('cors');
var express = require('express')
const bodyParser = require('body-parser');



var dishList = {};

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();
dbUpdate.updateDishesDatabase(pool, conn);

var preferences = {}

var requirements = {}

var app = express();
var port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0');
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://35.237.252.145'
}

var requirements = {}

app.post('/requriments',cors(corsOptions), async function (req, res) {

    requirements = evaluator.calculateRequirements(req.body.sex, req.body.age, req.body.pa, req.body.weigth);



    var generation = await getQuery(function (val) {
        if (!res.headersSent) {
            res.json(val)
        }
        return;
    });
    return;
})


async function getQuery(resolve) {
    var prndTS = await partialRandomTS.generatePartialRandomSolution(pool, requirements, [0], preferences, 300, function (sol) {
        resolve(sol)
        return;
    })

}