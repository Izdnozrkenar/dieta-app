'use strict';
const events = require('events');
const mariadb = require('mariadb');
const mariadbcallback = require('mariadb/callback');
const dbConnector = require('./poolmodule');
const randomTS = require('./randomTS.js');
const dbUpdate = require('./databaseStaticUpdate');


var dishList = [];

const pool = dbConnector.setConnectionToDatabase();
const conn = dbConnector.setCallbackConnectionToDatabase();

dbUpdate.updateDishesDatabase(pool,conn);
