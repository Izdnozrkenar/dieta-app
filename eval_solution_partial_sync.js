'use strict';

exports.evaluatePartialSolution = function (solution, reqs, preferences, dishlist) {

    var goalValue = 0;

    var w1 = function (val) {
        return (Math.pow((10 * val), 2) * 100);
    }

    var monotonnyScore = 0;
    var unbalancedScore = 0;
    var prefScore = 0;

    var solEnergy = 0;
    var solProtein = 0;
    var solFat = 0;
    var solCarbohydrates = 0;
    var solFiber = 0;

    solution.forEach(dish => {
        if (dish) {
            solEnergy += dishlist[dish].dshEnergy;
            solProtein += dishlist[dish].dshProtein;
            solFat += dishlist[dish].dshFat;
            solCarbohydrates += dishlist[dish].dshCarbohydrates;
            solFiber += dishlist[dish].dshFiber;
        }
    });

    var calculateNutrients= function() {
        var energyDemand = Math.abs(((reqs.energy * solution.length) - solEnergy) / (reqs.energy * solution.length));
        var proteinDemand = Math.abs(((reqs.protein * solution.length) - solProtein) / (reqs.protein * solution.length));
        var fatDemand = Math.abs(((reqs.fat * solution.length) - solFat) / (reqs.fat * solution.length));
        var carbohydratesDemand = Math.abs(((reqs.carbohydrates * solution.length) - solCarbohydrates) / (reqs.carbohydrates * solution.length));
        var fiberDemand = Math.abs(((reqs.fiber * solution.length) - solFiber) / (reqs.fiber * solution.length));

        //console.log('zapotrzebowanie na energie = ' + energyDemand + '\nzapotrzebowanie na bialko = ' + proteinDemand + '\nzapotrzebowanie na tłuszcz = ' + fatDemand + '\nzapotrzebowanie na węglowodany = ' + carbohydratesDemand + '\nzapotrzebowanie na blonnik = ' + fiberDemand);

        goalValue += w1(energyDemand) + w1(proteinDemand) + w1(fatDemand) + w1(carbohydratesDemand) + w1(fiberDemand);
    }(true);

    return goalValue;
}