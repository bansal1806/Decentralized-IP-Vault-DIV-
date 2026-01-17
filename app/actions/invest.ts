"use server";

import { RegistrationState } from "./register";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function investInAsset(assetId: string, amount: number): Promise<RegistrationState> {
    await delay(800);

    if (amount < 10) {
        return {
            success: false,
            message: "Minimum investment is $10",
        };
    }

    // Simulate success
    return {
        success: true,
        message: `Successfully invested $${amount} in asset ${assetId}. Transaction Hash: 0x...mock${Date.now()}`,
    };
}
