import type {IDailyNominalRateStrategy} from "../../interfaces/Strategy.ts";

export const PreFixedCdbDailyNominalRateStrategy: IDailyNominalRateStrategy = (params) => {
    return (params.rate.nominalValue / (100 * 365));
}