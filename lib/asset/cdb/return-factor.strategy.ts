import type {IReturnFactorStrategy} from "../../interfaces/Strategy";

export const PreFixedCdbReturnFactorStrategy: IReturnFactorStrategy = (params) => {
    const { asset, rate } = params;
    const days = Math.round((asset.maturityDate.getTime() - asset.transactionDate.getTime()) / (1000 * 60 * 60 * 24));

    return (Math.pow(1 + rate, days));
}