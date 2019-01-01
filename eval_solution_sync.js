'use strict';

exports.evaluateSolution = function (solution, reqs, preferences, dishlist) {

    var goalValue = 0;

    var w1 = function (val) {
        return (Math.pow((10 * val), 2) * 100);
    }

    var w2 = 100;
    var w3 = 100;

    var monotonnyScore = 0;
    var unbalancedScore = 0;
    var prefScore = 0;

    var solEnergy = 0;
    var solProtein = 0;
    var solFat = 0;
    var solCarbohydrates = 0;
    var solFiber = 0;

    var sLength = solution.length;

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
        var energyDemand = Math.abs(((reqs.energy * sLength) - solEnergy) / (reqs.energy * sLength));
        var proteinDemand = Math.abs(((reqs.protein * sLength) - solProtein) / (reqs.protein * sLength));
        var fatDemand = Math.abs(((reqs.fat * sLength) - solFat) / (reqs.fat * sLength));
        var carbohydratesDemand = Math.abs(((reqs.carbohydrates * sLength) - solCarbohydrates) / (reqs.carbohydrates * sLength));
        var fiberDemand = Math.abs(((reqs.fiber * sLength) - solFiber) / (reqs.fiber * sLength));
        
        goalValue += w1(energyDemand) + w1(proteinDemand) + w1(fatDemand) + w1(carbohydratesDemand) + w1(fiberDemand);
    }(true);

    var evaluateMonnotony = function () {

        for (var i = 0; i < solution.length; i++) {
            solution[i].forEach(dish => {
                for (var j = i + 1; j < (i + 4) && j < sLength; j++) {
                    if (solution[j].includes(dish) && dish !== null) {
                        monotonnyScore++;
                        break;
                    }
                }
            })
        }
        goalValue += w2*(monotonnyScore);
    }(true)

    var evaluatePreferences = function (){
        for (var i = 0; i < solution.length; i++) {
            solution[i].forEach(dish => {
                switch (dish){
                    case preferences[dish] == 1:{
                        prefScore -= 5;
                        break;
                    }
                    case preferences[dish] == -1:{
                        prefScore += 5;
                        break;
                    }
                }
            })
        }
        goalValue += w3*(prefScore);
    }(true)

    return goalValue;
}