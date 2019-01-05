'use strict';

function requriments(en, pr, ft, crbh, fib) {
    this.energy = en;
    this.protein = pr;
    this.fat = ft;
    this.carbohydrates = crbh;
    this.fiber = fib;
}

exports.calculateRequirements = function (sex, age, pal, weigth) {


    if (sex == 1) {
        switch (true) {
            case age < 4: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1000, 14, 31, 130, 10);
                        
                    case pal < 2.2:
                        return new requriments(1000, 14, 47, 130, 10);
                        
                    case pal < 2.5:
                        return new requriments(1000, 14, 54, 130, 10);
                        
                }
            }
            case age < 7: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1400, 21, 47, 130, 14);
                        
                    case pal < 2.2:
                        return new requriments(1400, 21, 47, 130, 14);
                        
                    case pal < 2.5:
                        return new requriments(1400, 21, 47, 130, 14);
                        
                }
            }
            case age < 10: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1500, 30, 34, 130, 16);
                        
                    case pal < 2.2:
                        return new requriments(1800, 30, 52, 130, 16);
                        
                    case pal < 2.5:
                        return new requriments(2100, 30, 47, 130, 16);
                        
                }
            }
            case age < 13: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(2050, 42, 68, 130, 19);
                        
                    case pal < 2.2:
                        return new requriments(2350, 42, 78, 130, 19);
                        
                    case pal < 2.5:
                        return new requriments(2700, 42, 90, 130, 19);
                        
                }
            }
            case age < 16: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(2600, 59, 87, 130, 19);
                        
                    case pal < 2.2:
                        return new requriments(3000, 59, 100, 130, 19);
                        
                    case pal < 2.5:
                        return new requriments(3450, 59, 115, 130, 19);
                        
                }
            }
            case age < 19: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(3000, 64, 100, 130, 21);
                        
                    case pal < 2.2:
                        return new requriments(3400, 64, 113, 130, 21);
                        
                    case pal < 2.5:
                        return new requriments(4000, 64, 133, 130, 21);
                        
                }
            }
            case age < 31: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2350, 0.9 * weigth, 78, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 25);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2650, 0.9 * weigth, 88, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2900, 0.9 * weigth, 97, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3150, 0.9 * weigth, 105, 130, 25);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2650, 0.9 * weigth, 88, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2900, 0.9 * weigth, 97, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3200, 0.9 * weigth, 107, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3450, 0.9 * weigth, 115, 130, 25);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3050, 0.9 * weigth, 102, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3350, 0.9 * weigth, 112, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3650, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3950, 0.9 * weigth, 132, 130, 25);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3350, 0.9 * weigth, 112, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3650, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(4000, 0.9 * weigth, 133, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(4350, 0.9 * weigth, 145, 130, 25);
                                
                        }
                    }
                    case pal < 2.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3650, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(4000, 0.9 * weigth, 133, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(4450, 0.9 * weigth, 145, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(4750, 0.9 * weigth, 158, 130, 25);
                                
                        }
                    }
                }

            }
            case age < 51: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 25);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2600, 0.9 * weigth, 88, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2750, 0.9 * weigth, 97, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(2950, 0.9 * weigth, 105, 130, 25);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2600, 0.9 * weigth, 88, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2850, 0.9 * weigth, 97, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3000, 0.9 * weigth, 107, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3250, 0.9 * weigth, 115, 130, 25);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3000, 0.9 * weigth, 102, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3250, 0.9 * weigth, 112, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3450, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3700, 0.9 * weigth, 132, 130, 25);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3300, 0.9 * weigth, 112, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3350, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3800, 0.9 * weigth, 133, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(4050, 0.9 * weigth, 145, 130, 25);
                                
                        }
                    }
                    case pal < 2.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3600, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3900, 0.9 * weigth, 133, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(4150, 0.9 * weigth, 145, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(4450, 0.9 * weigth, 158, 130, 25);
                                
                        }
                    };
                }
            }
            case age < 66: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(1950, 0.9 * weigth, 65, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 25);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2200, 0.9 * weigth, 73, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(2800, 0.9 * weigth, 93, 130, 25);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2650, 0.9 * weigth, 88, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2850, 0.9 * weigth, 95, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3050, 0.9 * weigth, 102, 130, 25);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2800, 0.9 * weigth, 93, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3000, 0.9 * weigth, 100, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3250, 0.9 * weigth, 108, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3500, 0.9 * weigth, 117, 130, 25);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3050, 0.9 * weigth, 102, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3350, 0.9 * weigth, 112, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3600, 0.9 * weigth, 120, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(3850, 0.9 * weigth, 128, 130, 25);
                                
                        }
                    }
                    case pal < 2.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(3360, 0.9 * weigth, 112, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3650, 0.9 * weigth, 122, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3900, 0.9 * weigth, 130, 130, 25);
                                
                            case weigth <= 85:
                                return new requriments(4200, 0.9 * weigth, 140, 130, 25);
                                
                        }
                    };
                }
            }
            case age < 76: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(1700, 0.9 * weigth, 57, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(1900, 0.9 * weigth, 63, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(2200, 0.9 * weigth, 73, 130, 20);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(1950, 0.9 * weigth, 65, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2150, 0.9 * weigth, 72, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2350, 0.9 * weigth, 78, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(2500, 0.9 * weigth, 83, 130, 20);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2150, 0.9 * weigth, 72, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2350, 0.9 * weigth, 78, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 20);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2700, 0.9 * weigth, 90, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2950, 0.9 * weigth, 98, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(3150, 0.9 * weigth, 105, 130, 20);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2700, 0.9 * weigth, 90, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2950, 0.9 * weigth, 98, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(3250, 0.9 * weigth, 108, 130, 20);
                            case weigth <= 85:
                                return new requriments(3500, 0.9 * weigth, 117, 130, 20);
                                
                        }
                    };
                }
            }
            case age > 75: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(1600, 0.9 * weigth, 53, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(1800, 0.9 * weigth, 60, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(1950, 0.9 * weigth, 65, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 20);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(1850, 0.9 * weigth, 62, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 20);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(2650, 0.9 * weigth, 88, 130, 20);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2800, 0.9 * weigth, 93, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(3000, 0.9 * weigth, 100, 130, 20);
                                
                        }
                    };
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2800, 0.9 * weigth, 93, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(3100, 0.9 * weigth, 103, 130, 20);
                                
                            case weigth <= 85:
                                return new requriments(3350, 0.9 * weigth, 112, 130, 20);
                                
                        }
                    };
                }
            }
        };
    } else {
        switch (true) {
            case age < 4: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1000, 14, 47, 130, 10);
                        
                    case pal < 2.2:
                        return new requriments(1000, 14, 47, 130, 10);
                        
                    case pal < 2.5:
                        return new requriments(1000, 14, 47, 130, 10);
                        
                }
            }
            case age < 7: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1400, 21, 47, 130, 14);
                        
                    case pal < 2.2:
                        return new requriments(1400, 21, 47, 130, 14);
                        
                    case pal < 2.5:
                        return new requriments(1400, 21, 47, 130, 14);
                        
                }
            }
            case age < 10: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1500, 30, 52, 130, 16);
                        
                    case pal < 2.2:
                        return new requriments(1800, 30, 60, 130, 16);
                        
                    case pal < 2.5:
                        return new requriments(2100, 30, 70, 130, 16);
                        
                }
            }
            case age < 13: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(1800, 42, 60, 130, 19);
                        
                    case pal < 2.2:
                        return new requriments(2100, 42, 70, 130, 19);
                        
                    case pal < 2.5:
                        return new requriments(2450, 42, 82, 130, 19);
                        
                }
            }
            case age < 16: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(2100, 56, 70, 130, 19);
                        
                    case pal < 2.2:
                        return new requriments(2450, 56, 82, 130, 19);
                        
                    case pal < 2.5:
                        return new requriments(2800, 56, 93, 130, 19);
                        
                }
            }
            case age < 19: {
                switch (true) {
                    case pal < 1.75:
                        return new requriments(2150, 53, 72, 130, 21);
                        
                    case pal < 2.2:
                        return new requriments(2500, 53, 83, 130, 21);
                        
                    case pal < 2.5:
                        return new requriments(2850, 53, 95, 130, 21);
                        
                }
            }
            case age < 31: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1600, 0.9 * weigth, 53, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(1800, 0.9 * weigth, 60, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 25);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1850, 0.9 * weigth, 62, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 25);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2000, 0.9 * weigth, 67, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2800, 0.9 * weigth, 93, 130, 25);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2900, 0.9 * weigth, 97, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3200, 0.9 * weigth, 107, 130, 25);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2850, 0.9 * weigth, 95, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3200, 0.9 * weigth, 107, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3500, 0.9 * weigth, 117, 130, 25);
                                
                        }
                    }
                    case pal < 2.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(3100, 0.9 * weigth, 103, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3500, 0.9 * weigth, 117, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3850, 0.9 * weigth, 128, 130, 25);
                                
                        }
                    }
                }

            }
            case age < 51: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1700, 0.9 * weigth, 57, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(1800, 0.9 * weigth, 60, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(1900, 0.9 * weigth, 63, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 25);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1950, 0.9 * weigth, 65, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2200, 0.9 * weigth, 73, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2350, 0.9 * weigth, 78, 130, 25);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 25);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2900, 0.9 * weigth, 97, 130, 25);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 55:
                                return new requriments(2650, 0.9 * weigth, 88, 130, 25);
                                
                            case weigth <= 45:
                                return new requriments(2850, 0.9 * weigth, 95, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(3000, 0.9 * weigth, 100, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3200, 0.9 * weigth, 107, 130, 25);
                                
                        }
                    }
                    case pal < 2.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2900, 0.9 * weigth, 97, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(3100, 0.9 * weigth, 103, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3300, 0.9 * weigth, 110, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3500, 0.9 * weigth, 117, 130, 25);
                                
                        }
                    };
                }
            }
            case age < 66: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1610, 0.9 * weigth, 54, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(1750, 0.9 * weigth, 58, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(1800, 0.9 * weigth, 60, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(1950, 0.9 * weigth, 65, 130, 25);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1850, 0.9 * weigth, 62, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2000, 0.9 * weigth, 67, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 25);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2000, 0.9 * weigth, 67, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2200, 0.9 * weigth, 73, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 25);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2500, 0.9 * weigth, 83, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(2800, 0.9 * weigth, 93, 130, 25);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(2850, 0.9 * weigth, 95, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3100, 0.9 * weigth, 103, 130, 25);
                                
                        }
                    }
                    case pal < 2.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 25);
                                
                            case weigth <= 55:
                                return new requriments(3000, 0.9 * weigth, 100, 130, 25);
                                
                            case weigth <= 65:
                                return new requriments(3100, 0.9 * weigth, 103, 130, 25);
                                
                            case weigth <= 75:
                                return new requriments(3350, 0.9 * weigth, 112, 130, 25);
                                
                        }
                    };
                }
            }
            case age < 76: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1500, 0.9 * weigth, 50, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(1600, 0.9 * weigth, 53, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(1750, 0.9 * weigth, 58, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(1900, 0.9 * weigth, 63, 130, 20);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1700, 0.9 * weigth, 57, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(1850, 0.9 * weigth, 62, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2000, 0.9 * weigth, 67, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2150, 0.9 * weigth, 72, 130, 20);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1850, 0.9 * weigth, 62, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2200, 0.9 * weigth, 73, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2350, 0.9 * weigth, 78, 130, 20);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2150, 0.9 * weigth, 72, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(2300, 0.9 * weigth, 77, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2500, 0.9 * weigth, 83, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2700, 0.9 * weigth, 90, 130, 20);
                                
                        }
                    }
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2350, 0.9 * weigth, 78, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(2550, 0.9 * weigth, 85, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2750, 0.9 * weigth, 92, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2950, 0.9 * weigth, 98, 130, 20);
                                
                        }
                    };
                }
            }
            case age > 75: {
                switch (true) {
                    case pal < 1.41: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1450, 0.9 * weigth, 48, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(1550, 0.9 * weigth, 52, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(1700, 0.9 * weigth, 57, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(1850, 0.9 * weigth, 62, 130, 20);
                                
                        }
                    }
                    case pal < 1.61: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1600, 0.9 * weigth, 53, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(1750, 0.9 * weigth, 58, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(1900, 0.9 * weigth, 63, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 20);
                                
                        }
                    }
                    case pal < 1.76: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(1750, 0.9 * weigth, 58, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(1950, 0.9 * weigth, 65, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2100, 0.9 * weigth, 70, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 20);
                                
                        }
                    }
                    case pal < 2.01: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2050, 0.9 * weigth, 68, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(2200, 0.9 * weigth, 73, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2400, 0.9 * weigth, 80, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2600, 0.9 * weigth, 87, 130, 20);
                                
                        }
                    };
                    case pal < 2.21: {
                        switch (true) {
                            case weigth <= 45:
                                return new requriments(2250, 0.9 * weigth, 75, 130, 20);
                                
                            case weigth <= 55:
                                return new requriments(2450, 0.9 * weigth, 82, 130, 20);
                                
                            case weigth <= 65:
                                return new requriments(2650, 0.9 * weigth, 88, 130, 20);
                                
                            case weigth <= 75:
                                return new requriments(2850, 0.9 * weigth, 95, 130, 20);
                                
                        }
                    };
                }
            }
        };
    }

} 
