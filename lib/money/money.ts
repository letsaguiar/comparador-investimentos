import type {IMoney} from "../interfaces/Money.ts";

export class Money implements IMoney {
    private readonly amount: number;

    public constructor(amount: number) {
        this.amount = amount * 100;
    }

    public toNumber(): number {
        return (this.amount / 100);
    }

    public toString(): string {
        return (this.toNumber().toFixed(2));
    }
}