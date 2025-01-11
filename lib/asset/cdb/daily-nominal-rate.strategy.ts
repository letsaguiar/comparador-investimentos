import type {IDailyNominalRateStrategy} from "../../interfaces/Strategy.ts";
import type {Asset} from "../asset.ts";

export const PreFixedCdbDailyNominalRateStrategy: IDailyNominalRateStrategy = (params) => {
    const rate = (params.rate.nominalValue / (100 * 365));
    return ({ ok: rate });
}