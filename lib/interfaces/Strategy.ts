import type {IAsset} from "./Asset.ts";

export type IStrategy<P, Q> = (params: P) => Q;
export type IDailyNominalRateStrategy = IStrategy<IAsset, number>
export type IReturnFactorStrategy = IStrategy<{
    asset: IAsset,
    rate: number
}, number>
export type IFutureValueStrategy = IStrategy<{
    asset: IAsset,
    factor: number
}, number>