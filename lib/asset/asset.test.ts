import { describe, test, expect } from "bun:test";
import {Asset} from "./asset.ts";
import {AssetRateType, AssetType} from "../interfaces/Asset.ts";

describe("Asset", () => {
    describe('PreFixed Assets', () => {
        test("should properly calculate the futureValue in 30 days", () => {
            const asset = new Asset({
                type: AssetType.CDB,
                rate: {
                    type: AssetRateType.PreFixed,
                    nominalValue: 10
                },
                presentValue: 1000,
                transactionDate: new Date("2025-01-01"),
                maturityDate: new Date("2026-01-01"),
            });

            expect(asset.futureValue).toBe(1105.16);
        })
    });
});
