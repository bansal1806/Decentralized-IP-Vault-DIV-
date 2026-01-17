"use server";

import { UserHolding, MOCK_USER_HOLDINGS } from "@/lib/mock-db";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUserHoldings(walletAddress?: string): Promise<UserHolding[]> {
    await delay(400);

    // In a real app, query by walletAddress
    if (!walletAddress) return [];

    return MOCK_USER_HOLDINGS;
}
