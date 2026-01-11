"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreativeAsset } from "@/lib/mock-db";
import { EarningsCalculator } from "./EarningsCalculator";
import { CheckCircle2, Loader2, FileText, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InvestModalProps {
    asset: CreativeAsset;
}

type Step = 'amount' | 'legal' | 'processing' | 'success';

export function InvestModal({ asset }: InvestModalProps) {
    const [step, setStep] = useState<Step>('amount');
    const [amount, setAmount] = useState<number>(asset.minInvestment);

    const handleInvest = () => {
        setStep('legal');
    };

    const handleLegalAccept = () => {
        setStep('processing');
        // Simulate API call
        setTimeout(() => {
            setStep('success');
        }, 3000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full text-lg font-bold shadow-lg shadow-primary/20">
                    Invest Now
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
                {step === 'amount' && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Invest in {asset.title}</DialogTitle>
                            <DialogDescription>
                                Configure your investment. Minimum ${asset.minInvestment}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="amount">Investment Amount (USD)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="pl-7 text-lg font-semibold"
                                        min={asset.minInvestment}
                                    />
                                </div>
                            </div>

                            <EarningsCalculator
                                investmentAmount={amount}
                                totalValuation={asset.totalValuation}
                                availableEquity={asset.availableEquity}
                            />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleInvest} className="w-full">
                                Continue to Legal Review
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === 'legal' && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Legal Review</DialogTitle>
                            <DialogDescription>
                                Please review the Rights Assignment Agreement.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 border rounded-md bg-muted/20">
                            <ScrollArea className="h-[300px] w-full p-4 text-sm text-muted-foreground leading-relaxed">
                                <h4 className="font-bold text-foreground mb-2">MASTER RIGHTS PARTICIPATION AGREEMENT</h4>
                                <p className="mb-4">
                                    This Agreement is entered into by and between the Investor ("You") and {asset.creator} ("Creator") regarding the asset "{asset.title}".
                                </p>
                                <p className="mb-4">
                                    1. <strong>Grant of Economic Rights</strong>: The Creator grants the Investor a right to future revenue generated from: {asset.rightsType.join(", ")}.
                                </p>
                                <p className="mb-4">
                                    2. <strong>No IP Transfer</strong>: This agreement conveys economic interest only. The Investor does not obtain creative control or copyright ownership.
                                </p>
                                <p className="mb-4">
                                    3. <strong>Risk Disclosure</strong>: Investments in creative assets are speculative and illiquid. You may lose your entire investment.
                                </p>
                                <p className="mb-4">
                                    4. <strong>Governance</strong>: This digital agreement is recorded on the DIV Protocol Ledger and is legally binding in the jurisdiction of Delaware.
                                </p>
                                <p className="mb-4">
                                    [... Full Legal Text Redacted for Prototype ...]
                                </p>
                            </ScrollArea>
                        </div>
                        <div className="flex items-center space-x-2 py-4">
                            <div className="h-4 w-4 rounded border-primary border flex items-center justify-center bg-primary text-primary-foreground">
                                <CheckCircle2 className="h-3 w-3" />
                            </div>
                            <span className="text-sm">I have read and agree to the terms.</span>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleLegalAccept} className="w-full relative overflow-hidden group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4" /> Sign & Pay ${amount}
                                </span>
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <div className="text-center space-y-1">
                            <h3 className="font-semibold text-lg">Processing Transaction</h3>
                            <p className="text-muted-foreground">Securing rights on-chain...</p>
                        </div>
                        <div className="w-full max-w-xs space-y-2 pt-4">
                            <div className="text-xs flex justify-between text-muted-foreground">
                                <span>Payment Verified</span>
                                <span className="text-green-500">Done</span>
                            </div>
                            <div className="text-xs flex justify-between text-muted-foreground">
                                <span>Contract Minting</span>
                                <span className="animate-pulse text-primary">In Progress...</span>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
                        <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-2xl">Investment Confirmed!</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                You are now a fractional owner of <strong>{asset.title}</strong>. Your Rights Certificate has been deposited to your portfolio.
                            </p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg w-full max-w-sm flex items-start gap-3 text-left">
                            <FileText className="w-8 h-8 text-primary mt-1" />
                            <div>
                                <p className="font-bold text-sm">Certificate #{Math.floor(Math.random() * 10000)}</p>
                                <p className="text-xs text-muted-foreground">Recorded on DIV Protocol Ledger</p>
                            </div>
                        </div>

                        <DialogFooter className="w-full pt-4">
                            <Button className="w-full" asChild>
                                <a href="/dashboard">View in Portfolio</a>
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
