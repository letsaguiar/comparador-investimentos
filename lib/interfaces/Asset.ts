export enum AssetType {
    CDB,
}

export enum AssetRateType {
    PreFixed,
}

export interface AssetRate {
    type: AssetRateType,
    nominalValue: number,
}

export interface IAsset {
    type: AssetType,
    rate: AssetRate,
    presentValue: number,
    futureValue: number,
    transactionDate: Date,
    maturityDate: Date,
}