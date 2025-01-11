import {type AssetRate, AssetRateType, AssetType, type IAsset} from "../interfaces/Asset.ts";
import type {Result} from "../interfaces/Result.ts";
import {PreFixedCdbDailyNominalRateStrategy} from "./cdb/daily-nominal-rate.strategy.ts";
import type {IDailyNominalRateStrategy, IFutureValueStrategy, IReturnFactorStrategy} from "../interfaces/Strategy.ts";
import {PreFixedCdbReturnFactorStrategy} from "./cdb/return-factor.strategy.ts";
import {PreFixedCdbFutureValueStrategy} from "./cdb/future-value.strategy.ts";

export class Asset implements IAsset {
    public type: AssetType;
    public rate: AssetRate;
    public presentValue: number;
    public transactionDate: Date;
    public maturityDate: Date;

    public constructor(params: Omit<IAsset, 'futureValue'>) {
        this.type = params.type;
        this.rate = params.rate;
        this.presentValue = params.presentValue;
        this.transactionDate = params.transactionDate;
        this.maturityDate = params.maturityDate;
    }

    get futureValue() {
        let step = this.getDailyNominalRate();
        step = this.getReturnFactor(step);
        step = this.getFutureValue(step);

        if (step.err)
            throw step.err;
        else
            return (step.ok);
    }

    private getDailyNominalRate(): Result<number, Error> {
        const strategies: Record<AssetRateType, Record<AssetType, IDailyNominalRateStrategy>> = {
            [AssetRateType.PreFixed]: {
                [AssetType.CDB]: PreFixedCdbDailyNominalRateStrategy,
            }
        }

        const strategy = strategies[this.rate.type][this.type];
        if (!strategy)
            return ({ err: new Error("Unable to get asset's daily nominal rate") });
        else
            return ({ ok: strategy(this) });
    }

    private getReturnFactor(step: Result<number, Error>): Result<number, Error> {
        if (step.err)
            return (step);

        const strategies: Record<AssetRateType, Record<AssetType, IReturnFactorStrategy>> = {
            [AssetRateType.PreFixed]: {
                [AssetType.CDB]: PreFixedCdbReturnFactorStrategy,
            }
        }

        const strategy = strategies[this.rate.type][this.type];
        if (!strategy)
            return ({ err: new Error("Unable to get asset's return factor rate") });
        else
            return ({ ok: strategy({ asset: this, rate: step.ok }) });
    }

    private getFutureValue(step: Result<number, Error>): Result<number, Error> {
        if (step.err)
            return (step);

        const strategies: Record<AssetRateType, Record<AssetType, IFutureValueStrategy>> = {
            [AssetRateType.PreFixed]: {
                [AssetType.CDB]: PreFixedCdbFutureValueStrategy,
            }
        }

        const strategy = strategies[this.rate.type][this.type];
        if (!strategy)
            return ({ err: new Error("Unable to get asset's future value") });
        else
            return ({ ok: strategy({ asset: this, factor: step.ok }) });
    }
}