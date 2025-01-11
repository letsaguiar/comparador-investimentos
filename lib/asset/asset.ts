import {type AssetRate, AssetRateType, AssetType, type IAsset} from "../interfaces/Asset.ts";
import type {Result} from "../interfaces/Result.ts";
import {Money} from "../money/money.ts";
import {PreFixedCdbDailyNominalRateStrategy} from "./cdb/daily-nominal-rate.strategy.ts";
import type {IDailyNominalRateStrategy} from "../interfaces/Strategy.ts";

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
            throw new Error("Unable to calculate asset future value.");
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
            return (strategy(this));
    }

    private getReturnFactor(step: Result<number, Error>): Result<number, Error> {
        if (step.err)
            return (step);

        const rate = step.ok;
        const days = Math.round((this.maturityDate.getTime() - this.transactionDate.getTime()) / (1000 * 60 * 60 * 24));

        return ({ ok: Math.pow(1 + rate, days) });
    }

    private getFutureValue(step: Result<number, Error>): Result<number, Error> {
        if (step.err)
            return (step);

        const factor = step.ok;
        const futureValue = new Money(this.presentValue).multiply(factor);

        return ({ ok: futureValue.toNumber() });
    }
}