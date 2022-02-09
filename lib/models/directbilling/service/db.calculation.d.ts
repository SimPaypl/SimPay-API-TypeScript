import { DbProvider } from './db.provider';
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
export {};
