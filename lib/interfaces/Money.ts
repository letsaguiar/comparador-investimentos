export interface IMoney {
    toNumber: () => number;
    toString: () => string;
    add: (money: IMoney) => IMoney;
    subtract: (money: IMoney) => IMoney;
    multiply: (rate: number) => IMoney;
    divide: (rate: number) => IMoney;
}