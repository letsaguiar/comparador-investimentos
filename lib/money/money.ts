import type {IMoney} from "../interfaces/Money.ts";

export class Money implements IMoney {
    private readonly amount: number;

    public constructor(amount: number) {
        this.amount = amount * 100;
    }

    public toNumber(): number {
        return (Number.parseFloat(this.toString()));
    }

    public toString(): string {
        return ((this.amount / 100).toFixed(2));
    }

    public add(money: IMoney): IMoney {
        const amount = (this.amount + (money.toNumber() * 100)) / 100;
        return (new Money(amount));
    }

    public subtract(money: IMoney): IMoney {
        const amount = (this.amount - (money.toNumber() * 100)) / 100;
        return (new Money(amount));
    }

    public multiply(rate: number): IMoney {
        const amount = this.amount * rate / 100;
        return (new Money(amount));
    }

    public divide(rate: number): IMoney {
        const amount = this.amount / rate / 100;
        return (new Money(amount));
    }
}