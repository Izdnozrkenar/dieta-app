'use strict';

module.exports = exports = function (solution, pool, reqs, callback) {

    var goalValue = 0;

    var w1 = function (val) {
        return (Math.pow((10 * val), 2) * 100);
    }
    var w2 = function (val) {
        return 5 * val;
    }

    var monotonnyScore = 0;

    var solEnergy = 0;
    var solProtein = 0;
    var solFat = 0;
    var solCarbohydrates = 0;
    var solFiber = 0;

    var nutrientsQueryFlag = 0;

    solution.forEach(dishRow => {
        dishRow.forEach(dish => {
            pool.query('SELECT dshEnergy, dshProtein, dshFat, dshCarbohydrates, dshFiber FROM dishes WHERE dshID=' + dish)
                .then(res => {
                    nutrientsQueryFlag++;
                    res.forEach(values => {
                        solEnergy += values.dshEnergy;
                        solProtein += values.dshProtein;
                        solFat += values.dshFat;
                        solCarbohydrates += values.dshCarbohydrates;
                        solFiber += values.dshFiber;
                        if (nutrientsQueryFlag == 150) {
                            calculateNutrients();
                        }
                    })
                })
        })
    });

    var calculateNutrients = function () {
        var energyDemand = Math.abs(((reqs.energy * solution.length) - solEnergy) / (reqs.energy * solution.length));
        var proteinDemand = Math.abs(((reqs.protein * solution.length) - solProtein) / (reqs.protein * solution.length));
        var fatDemand = Math.abs(((reqs.fat * solution.length) - solFat) / (reqs.fat * solution.length));
        var carbohydratesDemand = Math.abs(((reqs.carbohydrates * solution.length) - solCarbohydrates) / (reqs.carbohydrates * solution.length));
        var fiberDemand = Math.abs(((reqs.fiber * solution.length) - solFiber) / (reqs.fiber * solution.length));

        //console.log('zapotrzebowanie na energie = ' + energyDemand + '\nzapotrzebowanie na bialko = ' + proteinDemand + '\nzapotrzebowanie na tłuszcz = ' + fatDemand + '\nzapotrzebowanie na węglowodany = ' + carbohydratesDemand + '\nzapotrzebowanie na blonnik = ' + fiberDemand);

        goalValue += w1(energyDemand) + w1(proteinDemand) + w1(fatDemand) + w1(carbohydratesDemand) + w1(fiberDemand);
        evaluateMonnotony();
    }

    var evaluateMonnotony = function () {

        for (var i = 0; i < solution.length; i++) {
            solution[i].forEach(dish => {
                for (var j = i + 1; j < (i + 4) && j < solution.length; j++) {
                    if (solution[j].includes(dish) && dish!==null) {
                        monotonnyScore++;
                        break;
                    }
                }
            })
        }

        goalValue += w2(monotonnyScore);
        callback(goalValue);
    }
}