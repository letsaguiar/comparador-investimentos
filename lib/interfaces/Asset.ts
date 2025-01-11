export enum AssetType {
    CDB,
}

export enum AssetRateReference {
    CDI,
    IPCA,
    SELIC,
}

export interface IAsset {
    type: AssetType,
    rate: {
        reference: AssetRateReference,
        nominalValue: number,
    },
    presentValue: number,
    futureValue: number,
    transactionDate: number,
    maturityDate: number,
}