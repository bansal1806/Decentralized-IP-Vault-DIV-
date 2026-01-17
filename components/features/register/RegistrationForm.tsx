"use client";

import { useActionState } from "react";
import { registerIP, RegistrationState } from "@/app/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";

const initialState: RegistrationState = {
    message: "",
    errors: {},
};

export function RegistrationForm() {
    const [state, formAction, isPending] = useActionState(registerIP, initialState);

    if (state.success) {
        return (
            <Card className="w-full max-w-lg mx-auto border-green-500/50 bg-green-500/10">
                <CardContent className="pt-6 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                    <h3 className="text-2xl font-bold text-green-500">Registration Complete</h3>
                    <p className="text-muted-foreground">{state.message}</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>Register Another</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Register New IP</CardTitle>
                <CardDescription>Create an on-chain record for your creative asset.</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="e.g. My Next Masterpiece" required />
                        {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Asset Type</Label>
                        <div className="relative">
                            <select
                                id="type"
                                name="type"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                defaultValue="music"
                            >
                                <option value="music" className="bg-background text-foreground">Music</option>
                                <option value="film" className="bg-background text-foreground">Film</option>
                                <option value="literature" className="bg-background text-foreground">Literature</option>
                                <option value="art" className="bg-background text-foreground">Visual Art</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea id="description" name="description" placeholder="Short description of the asset..." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Registering on Registry...
                            </>
                        ) : (
                            "Mint IP Asset"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
