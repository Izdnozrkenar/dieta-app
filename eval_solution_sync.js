'use strict';

exports.evaluateSolution = function (solution, reqs, dishlist) {

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

    solution.forEach(dishRow => {
        dishRow.forEach(dish => {
            if (dish) {
                solEnergy += dishlist[dish].dshEnergy;
                solProtein += dishlist[dish].dshProtein;
                solFat += dishlist[dish].dshFat;
                solCarbohydrates += dishlist[dish].dshCarbohydrates;
                solFiber += dishlist[dish].dshFiber;
            }
        })
    });

    var calculateNutrients= function() {
        var energyDemand = Math.abs(((reqs.energy * 30) - solEnergy) / (reqs.energy * 30));
        var proteinDemand = Math.abs(((reqs.protein * 30) - solProtein) / (reqs.protein * 30));
        var fatDemand = Math.abs(((reqs.fat * 30) - solFat) / (reqs.fat * 30));
        var carbohydratesDemand = Math.abs(((reqs.carbohydrates * 30) - solCarbohydrates) / (reqs.carbohydrates * 30));
        var fiberDemand = Math.abs(((reqs.fiber * 30) - solFiber) / (reqs.fiber * 30));

        //console.log('zapotrzebowanie na energie = ' + energyDemand + '\nzapotrzebowanie na bialko = ' + proteinDemand + '\nzapotrzebowanie na tłuszcz = ' + fatDemand + '\nzapotrzebowanie na węglowodany = ' + carbohydratesDemand + '\nzapotrzebowanie na blonnik = ' + fiberDemand);

        goalValue += w1(energyDemand) + w1(proteinDemand) + w1(fatDemand) + w1(carbohydratesDemand) + w1(fiberDemand);
    }(true);

    var evaluateMonnotony = function () {

        for (var i = 0; i < 30; i++) {
            solution[i].forEach(dish => {
                for (var j = i + 1; j < (i + 4) && j < 30; j++) {
                    if (solution[j].includes(dish) && dish !== null) {
                        monotonnyScore++;
                        break;
                    }
                }
            })
        }

        goalValue += w2(monotonnyScore);
    }(true)

    return goalValue;
}