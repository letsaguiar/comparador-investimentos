import {type AssetRate, AssetType, type IAsset} from "../interfaces/Asset.ts";
import type {Result} from "../interfaces/Result.ts";
import {Money} from "../money/money.ts";

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
        let dailyNominalRate = this.getDailyNominalRate();
        let daysUntilMaturity = this.getDaysUntilMaturity();

        if (dailyNominalRate.err || daysUntilMaturity.err)
            throw new Error("Unable to calculate the future value of the asset");

        return (
            new Money(this.presentValue)
                .multiply(Math.pow(1 + dailyNominalRate.ok, daysUntilMaturity.ok))
                .toNumber()
        );
    }

    private getDailyNominalRate(): Result<number, Error> {
        const res = (this.rate.nominalValue / (100 * 365));
        return ({ ok: res });
    }

    private getDaysUntilMaturity(): Result<number, Error> {
        const res = Math.round((this.maturityDate.getTime() - this.transactionDate.getTime()) / (1000 * 60 * 60 * 24));
        console.log(res);
        return ({ ok: res });
    }
}