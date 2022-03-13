import { storage, context, u128, PersistentMap, ContractPromiseBatch } from "near-sdk-as";

export const nearBalances = new PersistentMap<string, u128>("nb");
export const goalAmounts = new PersistentMap<string, u128>("ga");
export const expirations = new PersistentMap<string, u128>("e");

export function deposit(_goalAmount: u128, duration: u128): boolean {
    assert(!goalAmounts.get(context.sender));
    assert(_goalAmount > u128.from(0));
    goalAmounts.set(context.sender, _goalAmount);
    nearBalances.set(context.sender, context.attachedDeposit);
    expirations.set(context.sender, u128.add(u128.from(context.blockTimestamp), duration));
    return true;
}

export function withdrawAll(): boolean {
    assert(u128.from(context.blockTimestamp) >= expirations.getSome(context.sender));
    assert(goalAmounts.getSome(context.sender) > u128.from(0));
    assert(nearBalances.getSome(context.sender) > goalAmounts.getSome(context.sender));
    let balance = nearBalances.getSome(context.sender);
    nearBalances.set(context.sender, u128.from(0));
    goalAmounts.set(context.sender, u128.from(0));
    const to_beneficiary = ContractPromiseBatch.create(context.sender);
    to_beneficiary.transfer(balance);
    return true;
}

export function getNearBalance(account: string): u128 {
    return nearBalances.getSome(account);
}

export function getGoalAmount(account: string): u128 {
    return goalAmounts.getSome(account);
}

export function getExpiration(account: string): u128 {
    return expirations.getSome(account);
}

