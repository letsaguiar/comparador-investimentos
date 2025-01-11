import { describe, test, expect } from "bun:test";
import {Money} from "./money.ts";

describe("Money", () => {
   describe("constructor", () => {
        test("should save the amount as cents", () => {
            for (let i = -1_000_000; i <= 1_000_000; i += 0.1) {
                const money = new Money(i);
                expect(money['amount']).toBeCloseTo(i * 100);
            }
        });
   });

   describe("toNumber", () => {
       test("should properly convert the amount to float", () => {
           for (let i = -1_000_000; i <= 1_000_000; i += 0.1) {
                const money = new Money(i);
                expect(money.toNumber()).toBeCloseTo(i);
           }
       });
   });

   describe("toString", () => {
       test("should properly convert the amount to string", () => {
           for (let i = -1_000_000; i <= 1_000_000; i += 0.1) {
               const money = new Money(i);
               expect(money.toString()).toBe(i.toFixed(2));
           }
       });
   });
});