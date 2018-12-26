'use strict';

exports.calculateRequirements = function (sex, age, pal, weigth) {
    var requriments = function (reqEnergy, reqProtein, reqFat, reqCarbohydrates, reqFiber) {
        this.reqEnergy = reqEnergy;
        this.reqProtein = reqProtein;
        this.reqFat = reqFat;
        this.reqCarbohydrates = reqCarbohydrates;
        this.reqFiber = reqFiber;
    };


    var evaluateOnPhisicalFeatures = function () {

        if (sex == 'M') {

            switch (age) {
                case age < 4: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1000,14)
                        case pal < 2.2:
                            return requriments(1000,14)
                        case pal < 2.5:
                            return requriments(1000,14)
                    }
                }
                case age < 7: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1400,21)
                        case pal < 2.2:
                            return requriments(1400,21)
                        case pal < 2.5:
                            return requriments(1400,21)
                    }
                }
                case age < 10: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1500,30,)
                        case pal < 2.2:
                            return requriments(1800,30,)
                        case pal < 2.5:
                            return requriments(2100,30,)
                    }
                }
                case age < 13: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(2050,42,)
                        case pal < 2.2:
                            return requriments(2350,42,)
                        case pal < 2.5:
                            return requriments(2700,42,)
                    }
                }
                case age < 16: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(2600,59,)
                        case pal < 2.2:
                            return requriments(3000,59,)
                        case pal < 2.5:
                            return requriments(3450,59,)
                    }
                }
                case age < 19: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(3000,64,)
                        case pal < 2.2:
                            return requriments(3400,64,)
                        case pal < 2.5:
                            return requriments(4000,64,)
                    }
                }
                case age < 31: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2350,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2750,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2450,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2650,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2900,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3150,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2650,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2900,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3200,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3450,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3050,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3350,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3650,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3950,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3350,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3650,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(4000,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(4350,0.9*weigth,);
                            }
                        }
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3650,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(4000,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(4450,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(4750,0.9*weigth,);
                            }
                        }
                    }

                }
                case age < 51: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2250,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2400,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2600,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2400,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2750,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2950,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2850,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3000,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3250,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3000,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3250,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3450,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3700,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3300,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3350,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3800,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(4050,0.9*weigth,);
                            }
                        }
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3600,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3900,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(4150,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(4450,0.9*weigth,);
                            }
                        };
                    }
                }
                case age < 66: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(1950,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2450,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2200,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2400,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2800,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2450,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2650,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2850,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3050,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2800,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3000,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3250,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3500,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3050,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3350,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3600,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3850,0.9*weigth,);
                            }
                        }
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(3360,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3650,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3900,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(4200,0.9*weigth,);
                            }
                        };
                    }
                }
                case age < 76: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(1700,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1900,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2200,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(1950,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2150,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2350,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2500,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2150,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2350,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2750,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2450,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2700,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2950,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3150,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2700,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(295,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3250,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3500,0.9*weigth,);
                            }
                        };
                    }
                }
                case age > 75: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(1600,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1800,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(1950,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2100,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(1850,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2250,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2400,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2250,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2450,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(2650,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2800,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3000,0.9*weigth,);
                            }
                        };
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2800,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3100,0.9*weigth,);
                                case weigth <= 85:
                                    return requriments(3350,0.9*weigth,);
                            }
                        };
                    }
                }
            };
        } else {
            switch (age) {
                case age < 4: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1000,14,)
                        case pal < 2.2:
                            return requriments(1000,14,)
                        case pal < 2.5:
                            return requriments(1000,14,)
                    }
                }
                case age < 7: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1400,21,)
                        case pal < 2.2:
                            return requriments(1400,21,)
                        case pal < 2.5:
                            return requriments(1400,21,)
                    }
                }
                case age < 10: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1500,30,)
                        case pal < 2.2:
                            return requriments(1800,30,)
                        case pal < 2.5:
                            return requriments(2100,30,)
                    }
                }
                case age < 13: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(1800,42,)
                        case pal < 2.2:
                            return requriments(2100,42,)
                        case pal < 2.5:
                            return requriments(2450,42,)
                    }
                }
                case age < 16: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(2100,56,)
                        case pal < 2.2:
                            return requriments(2450,56,)
                        case pal < 2.5:
                            return requriments(2800,56,)
                    }
                }
                case age < 19: {
                    switch (pal) {
                        case pal < 1.75:
                            return requriments(2150,53,)
                        case pal < 2.2:
                            return requriments(2500,53,)
                        case pal < 2.5:
                            return requriments(2850,53,)
                    }
                }
                case age < 31: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1600,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1800,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2250,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1850,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2550,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2000,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2800,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2900,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3200,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2850,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3200,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3500,0.9*weigth,);
                            }
                        }
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2750,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(3100,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3500,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3850,0.9*weigth,);
                            }
                        }
                    }

                }
                case age < 51: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1700,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1800,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1900,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2050,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1950,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2200,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2350,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2250,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2400,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2550,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2400,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2750,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2900,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 55:
                                    return requriments(2650,0.9*weigth,);
                                case weigth <= 45:
                                    return requriments(2850,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(3000,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3200,0.9*weigth,);
                            }
                        }
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2900,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(3100,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3300,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3500,0.9*weigth,);
                            }
                        };
                    }
                }
                case age < 66: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1610,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1750,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1800,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(1950,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1850,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2000,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2250,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2000,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2200,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2450,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2500,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2600,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2800,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2750,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2850,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3100,0.9*weigth,);
                            }
                        }
                        case pal < 2.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2750,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(3000,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(3100,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(3350,0.9*weigth,);
                            }
                        };
                    }
                }
                case age < 76: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1500,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1600,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1750,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(1900,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1700,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1850,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2000,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2150,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1850,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2200,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2350,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2150,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2300,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2500,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2700,0.9*weigth,);
                            }
                        }
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2350,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2550,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2750,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2950,0.9*weigth,);
                            }
                        };
                    }
                }
                case age > 75: {
                    switch (pal) {
                        case pal < 1.41: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1450,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1550,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1700,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(1850,0.9*weigth,);
                            }
                        }
                        case pal < 1.61: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1600,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1750,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(1900,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2050,0.9*weigth,);
                            }
                        }
                        case pal < 1.76: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(1750,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(1950,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2100,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2250,0.9*weigth,);
                            }
                        }
                        case pal < 2.01: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2050,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2200,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2400,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2600,0.9*weigth,);
                            }
                        };
                        case pal < 2.21: {
                            switch (weigth) {
                                case weigth <= 45:
                                    return requriments(2250,0.9*weigth,);
                                case weigth <= 55:
                                    return requriments(2450,0.9*weigth,);
                                case weigth <= 65:
                                    return requriments(2650,0.9*weigth,);
                                case weigth <= 75:
                                    return requriments(2850,0.9*weigth,);
                            }
                        };
                    }
                }
            };
        }

    };
} 
