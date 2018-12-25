'use strict';
const events = require('events')
const mariadb = require('mariadb');

var eventEmitterMain = new events.EventEmitter();

const pool = mariadb.createPool({ host: 'localhost', port: '3306', user: 'root', password: '1wax2qsz', database: 'aplikacja_dieta' , connectionLimit: 5 });
pool.getConnection()
    .then(conn => {
        console.log("connected ! connection id is " + conn.threadId);
        conn.end(); //release to pool
    })
    .catch(err => {
        console.log("not connected due to error: " + err);
    });


function product(prdId, prdEnergy, prdProtein, prdFat, prdCarbohydrates, prdFiber, prdName) {
    this.prdId = prdId;
    this.prdEnergy = prdEnergy;
    this.prdProtein = prdProtein;
    this.prdFat = prdFat;
    this.prdCarbohydrates = prdCarbohydrates;
    this.prdFiber = prdFiber;
    this.prdName = prdName;

    this.addFnc = function () {
        console.log('jam jest dodatkowa funkcja obiektu ' + this.prdName);
    };

};


var dishList = [];

var updateNutrientsInDatabase = function updateNutrientsInDatabase(){

    console.log('udalo sie! przykladowe danie ' + dishList[4].totalEnergyAmount )
}

eventEmitterMain.addListener('dishes_received',updateNutrientsInDatabase);

pool.query('SELECT dshName, (SUM(products_dishes_xref.prdAmount*products.prdEnergy)) AS \'totalEnergyAmount\', (SUM(products_dishes_xref.prdAmount*products.prdProtein)) AS \'totalProteinAmount\', (SUM(products_dishes_xref.prdAmount*products.prdFat)) AS \'totalFatAmount\', (SUM(products_dishes_xref.prdAmount*products.prdCarbohydrates)) AS \'totalCarbohydratesAmount\', (SUM(products_dishes_xref.prdAmount*products.prdFiber)) AS \'totalFiberAmount\' FROM dishes JOIN products_dishes_xref, products WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID GROUP BY dishes.dshName')
    .then(res => {
        res.forEach(dish => {
            dishList.push(dish)
        });
        eventEmitterMain.emit('dishes_received');
});
