'use strict';

const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: 'localhost', port: '3306', user: 'root', password: '1wax2qsz', connectionLimit: 5 });
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


var productList = [];

pool.query('select * from aplikacja_dieta.products')
    .then(res => {
        res.forEach(element => {
            productList.push(new product(element.prdID, element.prdEnergy, element.prdFat, element.prdCarbohydrates, element.prdFiber, element.prdName));
    });
    console.log(productList);
});

