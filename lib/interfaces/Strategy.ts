import type {IAsset} from "./Asset";
import type {Result} from "./Result";

export type IStrategy<P, Q> = (params: P) => Result<Q, Error>;

export type IDailyNominalRateStrategy = IStrategy<IAsset, number>