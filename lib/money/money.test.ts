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

   describe("add", () => {
       test("should properly sum two numbers", () => {
           expect(
               new Money(1)
                .add(new Money(2))
                .toString()
           ).toEqual("3.00");
       });
   });

   describe("subtract", () => {
       test("should properly subtract two numbers", () => {
           expect(
               new Money(1)
                .subtract(new Money(2))
                .toString()
           ).toEqual("-1.00");
       });
   });

   describe("multiply", () => {
       test("should properly multiply two numbers", () => {
           expect(
               new Money(1)
                .multiply(2)
                .toString()
           ).toEqual("2.00");
       });
   });

   describe("divide", () => {
       test("should properly divide two numbers", () => {
           expect(
               new Money(1)
                .divide(2)
                .toString()
           ).toEqual("0.50");
       });
   });
});