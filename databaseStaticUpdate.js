'use strict';
const events = require('events');

exports.updateDishesDatabase = function (pool, conn) {

    var eventEmitterUpdate = new events.EventEmitter();
    eventEmitterUpdate.addListener('dishes_received', updateNutrientsInDatabase);
    eventEmitterUpdate.addListener('dishes_nutrient_values_updated', updateDishesStaticFlags);

    var dishList = [];

    pool.query('SELECT dshName, (SUM(products_dishes_xref.prdAmount*products.prdEnergy)) AS \'totalEnergyAmount\', (SUM(products_dishes_xref.prdAmount*products.prdProtein)) AS \'totalProteinAmount\', (SUM(products_dishes_xref.prdAmount*products.prdFat)) AS \'totalFatAmount\', (SUM(products_dishes_xref.prdAmount*products.prdCarbohydrates)) AS \'totalCarbohydratesAmount\', (SUM(products_dishes_xref.prdAmount*products.prdFiber)) AS \'totalFiberAmount\' FROM dishes JOIN products_dishes_xref, products WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID GROUP BY dishes.dshName')
        .then(res => {
            res.forEach(dish => {
                dishList.push(dish)
            });
            eventEmitterUpdate.emit('dishes_received');
        });

    function updateNutrientsInDatabase() {
        dishList.forEach(dish => {
            pool.query('UPDATE dishes SET dshEnergy=' + dish.totalEnergyAmount + ', dshProtein=' + dish.totalProteinAmount + ', dshFat=' + dish.totalFatAmount + ', dshCarbohydrates=' + dish.totalCarbohydratesAmount + ', dshFiber=' + dish.totalFiberAmount + ' WHERE dshName= \'' + dish.dshName + '\'')
                .then();
        })
        eventEmitterUpdate.emit('dishes_nutrient_values_updated');
    };

    function updateDishesStaticFlags() {
        pool.query('SELECT dshID FROM dishes ORDER BY dshEnergy DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsRichInEnergy= TRUE WHERE dshID= ' + dish.dshID);
                })
            })

        pool.query('SELECT dshID FROM dishes ORDER BY dshEnergy ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsNotRichInEnergy= TRUE WHERE dshID= ' + dish.dshID);
                })
            })

        pool.query('SELECT dshID FROM dishes ORDER BY dshProtein DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsRichInProtein= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshProtein ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsNotRichInProtein= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFat DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsRichInFat= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
        pool.query('SELECT dshID FROM dishes ORDER BY dshFat ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsNotRichInFat= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
            pool.query('SELECT dshID FROM dishes ORDER BY dshCarbohydrates DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsRichInCarbohydrates= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
            pool.query('SELECT dshID FROM dishes ORDER BY dshCarbohydrates ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsNotRichInCarbohydrates= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
            pool.query('SELECT dshID FROM dishes ORDER BY dshFiber DESC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsRichInFiber= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
            pool.query('SELECT dshID FROM dishes ORDER BY dshFiber ASC LIMIT 10')
            .then(res => {
                res.forEach(dish => {
                    conn.query('UPDATE dishes SET dshIsNotRichInFiber= TRUE WHERE dshID= ' + dish.dshID);
                })
            })
    }
}