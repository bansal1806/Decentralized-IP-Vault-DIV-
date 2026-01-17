"use server";

import { CreativeAsset } from "@/lib/mock-db";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type RegistrationState = {
    success?: boolean;
    message?: string;
    errors?: {
        [key: string]: string[];
    };
};

export async function registerIP(prevState: RegistrationState, formData: FormData): Promise<RegistrationState> {
    await delay(1000); // Simulate blockchain transaction time

    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;

    // Basic validation
    if (!title || title.length < 3) {
        return {
            success: false,
            message: "Validation Error",
            errors: { title: ["Title must be at least 3 characters long"] }
        };
    }

    // Simulate success
    return {
        success: true,
        message: `Successfully registered "${title}" on the Registry! (Asset ID: mock-${Date.now()})`
    };
}
