"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Percent, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const performanceData = [
    { month: "Jan", value: 400, invested: 400 },
    { month: "Feb", value: 420, invested: 450 },
    { month: "Mar", value: 480, invested: 500 },
    { month: "Apr", value: 520, invested: 500 },
    { month: "May", value: 600, invested: 500 },
    { month: "Jun", value: 650, invested: 500 },
    { month: "Jul", value: 720, invested: 500 },
];

const assetDistribution = [
    { name: "Music", value: 45, color: "#22c55e" },
    { name: "Film", value: 35, color: "#3b82f6" },
    { name: "Literature", value: 20, color: "#f59e0b" },
];

const roiByAsset = [
    { asset: "Neon Nights", roi: 8.2, invested: 500 },
    { asset: "Echo of Dawn", roi: 12.4, invested: 1000 },
    { asset: "Aether", roi: 15.2, invested: 250 },
];

export function PortfolioAnalytics() {
    const totalROI = ((720 - 500) / 500) * 100;
    const monthlyGrowth = ((720 - 650) / 650) * 100;

    return (
        <div className="space-y-6">
            <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="distribution">Distribution</TabsTrigger>
                    <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                    <Percent className="w-4 h-4" />
                                    <span className="text-xs">Total ROI</span>
                                </div>
                                <p className="text-2xl font-bold text-green-500">+{totalROI.toFixed(1)}%</p>
                                <p className="text-xs text-muted-foreground mt-1">Since first investment</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-xs">Monthly Growth</span>
                                </div>
                                <p className="text-2xl font-bold text-green-500">+{monthlyGrowth.toFixed(1)}%</p>
                                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-xs">Avg. Yield</span>
                                </div>
                                <p className="text-2xl font-bold">12.1%</p>
                                <p className="text-xs text-muted-foreground mt-1">Across all assets</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Portfolio Value Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                                        formatter={(value: number | undefined) => value ? `$${value}` : "$0"}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="invested"
                                        stroke="#3b82f6"
                                        fillOpacity={1}
                                        fill="url(#colorInvested)"
                                        name="Invested"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                        name="Portfolio Value"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="distribution" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Asset Type Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={assetDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {assetDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {assetDistribution.map((item) => (
                                        <div key={item.name} className="text-center">
                                            <div
                                                className="w-full h-2 rounded mb-1"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <p className="text-xs font-medium">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.value}%</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Investment Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { date: "Jan 2025", amount: 400, type: "Music" },
                                        { date: "Mar 2025", amount: 100, type: "Film" },
                                        { date: "May 2025", amount: 250, type: "Literature" },
                                    ].map((investment, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-4 p-3 rounded-lg border"
                                        >
                                            <div className="p-2 rounded bg-primary/10 text-primary">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">${investment.amount}</p>
                                                <p className="text-sm text-muted-foreground">{investment.type}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{investment.date}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="roi" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>ROI by Asset</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={roiByAsset}>
                                    <XAxis dataKey="asset" stroke="#888888" fontSize={12} />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                                        formatter={(value: number | undefined) => value ? `${value}%` : "0%"}
                                    />
                                    <Bar dataKey="roi" radius={[8, 8, 0, 0]} fill="#22c55e" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-3 gap-4">
                        {roiByAsset.map((asset, index) => (
                            <Card key={index}>
                                <CardContent className="pt-6">
                                    <p className="text-sm font-medium mb-2">{asset.asset}</p>
                                    <p className="text-2xl font-bold text-green-500">+{asset.roi}%</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Invested: ${asset.invested}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
