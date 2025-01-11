import type {IDiscountIOFStrategy} from "../../interfaces/Strategy.ts";
import {differenceInDays} from "../../date/difference-in-days.ts";
import {Money} from "../../money/money.ts";

export const CdbDiscountIofStrategy: IDiscountIOFStrategy = (params) => {
    const { asset, value } = params;

    const table = [
        96, 93, 90, 86, 83, 80, 76, 73, 70, 66, 63, 60, 56, 53, 50, 46, 43, 40, 36, 33,
        30, 26, 23, 20, 16, 13, 10, 6, 3, 0,
    ];
    const days = differenceInDays(asset.transactionDate, asset.maturityDate);

    if (days > 30)
        return (value);

    const discount = new Money(value)
        .subtract(new Money(asset.presentValue))
        .multiply(table[days - 1] / 100);

    return (new Money(value).subtract(discount).toNumber());
}