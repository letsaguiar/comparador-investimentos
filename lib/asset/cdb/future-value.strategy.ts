import type {IFutureValueStrategy} from "../../interfaces/Strategy.ts";
import {Money} from "../../money/money.ts";

export const PreFixedCdbFutureValueStrategy: IFutureValueStrategy = (params) => {
    const { asset, factor } = params;
    const futureValue = new Money(asset.presentValue).multiply(factor);

    return (futureValue.toNumber());
};