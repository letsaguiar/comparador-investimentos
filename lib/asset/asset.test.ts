import { describe, test, expect } from "bun:test";
import {Asset} from "./asset.ts";
import {AssetRateType, AssetType} from "../interfaces/Asset.ts";

describe("Asset", () => {
    describe('PreFixed Assets', () => {
        test("should properly calculate the futureValue in one year", () => {
            const asset = new Asset({
                type: AssetType.CDB,
                rate: {
                    type: AssetRateType.PreFixed,
                    nominalValue: 12
                },
                presentValue: 1000,
                transactionDate: new Date("2025-01-01"),
                maturityDate: new Date("2026-01-01"),
            });

            expect(asset.futureValue).toBe(1127.47);
        });

        test("if the maturity date is in less than 30 days, should discount iof", () => {
            const asset = new Asset({
                type: AssetType.CDB,
                rate: {
                    type: AssetRateType.PreFixed,
                    nominalValue: 12
                },
                presentValue: 1000,
                transactionDate: new Date("2025-01-01"),
                maturityDate: new Date("2025-01-30"),
            });

            expect(asset.futureValue).toBe(1009.29);
        });
    });
});
