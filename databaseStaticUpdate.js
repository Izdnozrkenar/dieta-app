const events = require('events');


exports.updateDishesDatabase = function (pool, conn) {

    var eventEmitterUpdate = new events.EventEmitter();
    eventEmitterUpdate.addListener('dishes_received', updateNutrientsInDatabase);

    var dishList = [];

    function updateNutrientsInDatabase() {
        dishList.forEach(dish => {
            conn.query('UPDATE dishes SET dshEnergy=' + dish.totalEnergyAmount + ', dshProtein=' + dish.totalProteinAmount + ', dshFat=' + dish.totalFatAmount + ', dshCarbohydrates=' + dish.totalCarbohydratesAmount + ', dshFiber=' + dish.totalFiberAmount + ' WHERE dshName= \'' + dish.dshName + '\'');
        })
    };

    pool.query('SELECT dshName, (SUM(products_dishes_xref.prdAmount*products.prdEnergy)) AS \'totalEnergyAmount\', (SUM(products_dishes_xref.prdAmount*products.prdProtein)) AS \'totalProteinAmount\', (SUM(products_dishes_xref.prdAmount*products.prdFat)) AS \'totalFatAmount\', (SUM(products_dishes_xref.prdAmount*products.prdCarbohydrates)) AS \'totalCarbohydratesAmount\', (SUM(products_dishes_xref.prdAmount*products.prdFiber)) AS \'totalFiberAmount\' FROM dishes JOIN products_dishes_xref, products WHERE products_dishes_xref.dshID = dishes.dshID AND products.prdID = products_dishes_xref.prdID GROUP BY dishes.dshName')
        .then(res => {
            res.forEach(dish => {
                dishList.push(dish)
            });
            eventEmitterUpdate.emit('dishes_received');
        });
}