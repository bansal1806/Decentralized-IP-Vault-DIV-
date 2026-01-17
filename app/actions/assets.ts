"use server";

import { CreativeAsset, MOCK_ASSETS } from "@/lib/mock-db";

// Simulate database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAssets(): Promise<CreativeAsset[]> {
    await delay(500); // Simulate network latency
    // In a real app, this would fetch from a database or smart contract
    return MOCK_ASSETS;
}

export async function getAssetById(id: string): Promise<CreativeAsset | undefined> {
    await delay(300);
    return MOCK_ASSETS.find((asset) => asset.id === id);
}
