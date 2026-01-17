"use client";

import { MOCK_USER_HOLDINGS, MOCK_ASSETS } from "@/lib/mock-db";
import { PortfolioChart } from "@/components/features/dashboard/PortfolioChart";
import { PortfolioAnalytics } from "@/components/features/dashboard/PortfolioAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { fetchUserHoldings } from "@/app/actions/user";

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const [holdings, setHoldings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function load() {
            if (isConnected && address) {
                setIsLoading(true);
                // Simulate fetch
                const data = await fetchUserHoldings(address);
                setHoldings(data);
                setIsLoading(false);
            } else {
                setHoldings([]);
            }
        }
        load();
    }, [isConnected, address]);

    const totalValue = holdings.reduce((acc, curr) => acc + curr.currentValue, 0);
    const totalInvested = holdings.reduce((acc, curr) => acc + curr.investedAmount, 0);
    const yieldToDate = totalValue - totalInvested;

    if (!isConnected) {
        return (
            <div className="container py-20 max-w-screen-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-bold">Please Connect Your Wallet</h2>
                <p className="text-muted-foreground">You need to connect a wallet to view your portfolio.</p>
            </div>
        );
    }

    return (
        <div className="container py-8 max-w-screen-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Portfolio Overview</h2>
                <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-500 border-green-500/50">
                        Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { icon: DollarSign, title: "Total Balance", value: `$${totalValue.toFixed(2)}`, change: "+20.1% from last month", color: "" },
                    { icon: TrendingUp, title: "Total Yield", value: `+$${yieldToDate.toFixed(2)}`, change: `Across ${holdings.length} assets`, color: "text-green-500" },
                    { icon: Wallet, title: "Active Assets", value: holdings.length.toString(), change: "2 Funding, 1 Active", color: "" },
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <PortfolioChart />

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Payouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Spotify Royalties (Q4)</p>
                                        <p className="text-sm text-muted-foreground">Neon Nights Anthology</p>
                                    </div>
                                    <div className="ml-auto font-medium text-green-500">+$12.40</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced Analytics Section */}
            <PortfolioAnalytics />

            <Card>
                <CardHeader>
                    <CardTitle>Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Asset</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Equity Owned</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holdings.map((holding) => {
                                const asset = MOCK_ASSETS.find(a => a.id === holding.assetId);
                                if (!asset) return null;
                                return (
                                    <TableRow key={holding.assetId}>
                                        <TableCell className="font-medium">{asset.title}</TableCell>
                                        <TableCell>{asset.type}</TableCell>
                                        <TableCell>{holding.equityOwned}%</TableCell>
                                        <TableCell>${holding.currentValue}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{asset.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
