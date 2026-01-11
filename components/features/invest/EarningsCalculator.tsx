"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface EarningsCalculatorProps {
    investmentAmount: number;
    availableEquity: number; // e.g. 15 for 15%
    totalValuation: number;
}

export function EarningsCalculator({ investmentAmount, totalValuation }: EarningsCalculatorProps) {
    // Scenario: Asset revenue multiplier
    const [revenueScenario, setRevenueScenario] = useState<number>(1.5); // 1.5x valuation

    // Calculate ownership percentage based on investment
    // If Total Valuation is 2.5M and I invest 1000.
    // My Share = 1000 / 2,500,000 = 0.0004
    const ownershipShare = investmentAmount / totalValuation;

    // Projected Revenue = Valuation * Scenario (simplification for prototype)
    const projectedRevenue = totalValuation * revenueScenario;

    // Your Payout
    const yourPayout = projectedRevenue * ownershipShare;

    // ROI
    const roi = ((yourPayout - investmentAmount) / investmentAmount) * 100;

    return (
        <Card className="bg-muted/50 border-none shadow-inner">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Potential Earnings Simulator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2 text-sm">
                        <span>Projected Asset Revenue</span>
                        <span className="font-bold text-foreground">
                            ${(projectedRevenue / 1000000).toFixed(2)}M
                        </span>
                    </div>
                    <Slider
                        value={[revenueScenario]}
                        min={0.5}
                        max={5}
                        step={0.1}
                        onValueChange={(vals) => setRevenueScenario(vals[0])}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Conservative (0.5x)</span>
                        <span>Break-even (1.0x)</span>
                        <span>Hit (5.0x)</span>
                    </div>
                </div>

                <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Your Investment</p>
                            <p className="kfont-medium">${investmentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Ownership Share</p>
                            <p className="font-medium">{(ownershipShare * 100).toFixed(4)}%</p>
                        </div>
                        <div className="col-span-2 pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">Estimated Payout</p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-green-500 flex items-center">
                                    <DollarSign className="w-5 h-5 mr-1" />
                                    {yourPayout.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                                <span className={`text-sm font-medium ${roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {roi >= 0 ? '+' : ''}{roi.toFixed(1)}% ROI
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-[10px] text-muted-foreground text-center">
                    *Estimates for demonstration purposes only. Past performance does not guarantee future results.
                </p>
            </CardContent>
        </Card>
    );
}
