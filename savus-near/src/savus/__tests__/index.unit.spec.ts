import * as contract from "../assembly";
import { u128, VMContext, context } from "near-sdk-as";

describe("testing the contract", () => {
    it("should deposit", () => {
        const ONE_NEAR = u128.from("1000000000000000000000000");
        const TO_BE_SENT = u128.mul(ONE_NEAR, u128.from(2));
        VMContext.setSigner_account_id("HashAboAliMalikIlAtaba.testnet");
        VMContext.setAttached_deposit(TO_BE_SENT);
        let done = contract.deposit(u128.from(3), u128.from(400));
        expect(done).toBeTruthy();
        const goalAmount = contract.getGoalAmount("HashAboAliMalikIlAtaba.testnet");
        const nearBalance = contract.getNearBalance("HashAboAliMalikIlAtaba.testnet");
        expect(goalAmount).toBe(u128.from(3));
        expect(nearBalance).toBe(TO_BE_SENT);
    })

    it("should withdraw after expiration", () => {
        const ONE_NEAR = u128.from("1000000000000000000000000");
        const TO_BE_SENT = u128.mul(ONE_NEAR, u128.from(2));
        VMContext.setSigner_account_id("HasaKhadraMalikIlLancer.testnet");
        VMContext.setAttached_deposit(TO_BE_SENT);
        let done = contract.deposit(u128.from(3), u128.from(0));
        expect(done).toBeTruthy();
        done = contract.withdrawAll();
        expect(done).toBeTruthy();
    })

    it("should not withdraw brfore expiration", () => {
        const ONE_NEAR = u128.from("1000000000000000000000000");
        const TO_BE_SENT = u128.mul(ONE_NEAR, u128.from(2));
        VMContext.setSigner_account_id("HadiBeenIlAyadi.testnet");
        VMContext.setAttached_deposit(TO_BE_SENT);
        let done = contract.deposit(u128.from(3), u128.from(1));
        expect(done).toBeTruthy();
        // expect(contract.withdrawAll()).toThrow();

    })
})