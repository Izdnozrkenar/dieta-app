'use strict';

exports.getFlagsForSoltuion = function (solution, reqs, preferences, dishlist) {

    var flagset = {

        needsMoreEnergy: 0,
        needsLessEnergy: 0,
        needsMoreProtein: 0,
        needsLessProtein: 0,
        needsMoreFat: 0,
        needsLessFat: 0,
        needsMoreCarbohydrates: 0,
        needsLessCarbohydrates: 0,
        needsMoreFiber: 0,
        needsLessFiber: 0,
        isMonotonous: 0,
        hasNonPrefferedDishes: 0
    }

    var monotonnyScore = 0;
    var prefScore = 0;

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

    var setNutrientsFlags = function () {
        var energyDemand = ((reqs.energy * 30) - solEnergy) / (reqs.energy * 30);
        var proteinDemand = ((reqs.protein * 30) - solProtein) / (reqs.protein * 30);
        var fatDemand = ((reqs.fat * 30) - solFat) / (reqs.fat * 30);
        var carbohydratesDemand = ((reqs.carbohydrates * 30) - solCarbohydrates) / (reqs.carbohydrates * 30);
        var fiberDemand = ((reqs.fiber * 30) - solFiber) / (reqs.fiber * 30);

        if (energyDemand > 0.3) { flagset.needsMoreEnergy = true; }
        if (energyDemand < -0.3) { flagset.needsLessEnergy = true; }
        if (proteinDemand > 0.3) { flagset.needsMoreProtein = true; }
        if (proteinDemand < -0.3) { flagset.needsLessProtein = true; }
        if (fatDemand > 0.3) { flagset.needsMoreFat = true; }
        if (fatDemand < -0.3) { flagset.needsLessFat = true; }
        if (carbohydratesDemand > 0.3) { flagset.needsMoreCarbohydrates = true; }
        if (carbohydratesDemand < -0.3) { flagset.needsLessCarbohydrates = true; }
        if (fatDemand > 0.3) { flagset.needsMoreFiber = true; }
        if (fatDemand < -0.3) { flagset.needsLessFiber = true; }

    }(true);

    var setMonnotonyFlags = function () {

        for (var i = 0; i < solution.length; i++) {
            solution[i].forEach(dish => {
                for (var j = i + 1; j < (i + 4) && j < solution.length; j++) {
                    if (solution[j].includes(dish) && dish !== null) {
                        monotonnyScore++;
                        break;
                    }
                }
            })
        }

        if (monotonnyScore > 3) { flagset.isMonotonous = true };
    }(true)

    var setPreferencesFlags = function () {
        solution.forEach(dishRow => {
            dishRow.forEach(dish => {
                switch (dish) {
                    case preferences[dish] == -1: {
                        prefScore += 5;
                        flagset.hasNonPrefferedDishes = true;
                        break;
                    }
                }
            })
        });
    }(true)

    return flagset;
}