import type {IDiscountIOFStrategy} from "../../interfaces/Strategy.ts";

export const CdbDiscountIofStrategy: IDiscountIOFStrategy = (params) => {
    const { value } = params;
    return (value);
}