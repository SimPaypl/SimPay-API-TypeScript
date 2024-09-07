import { DbProvider } from '../db.provider.js';

export interface DbCalculation {
    [DbProvider.PLAY]: DbCalculationAmount;
    [DbProvider.PLUS]: DbCalculationAmount;
    [DbProvider.ORANGE]: DbCalculationAmount;
    [DbProvider.T_MOBILE]: DbCalculationAmount;
}

interface DbCalculationAmount {
    net: number;
    gross: number;
}
