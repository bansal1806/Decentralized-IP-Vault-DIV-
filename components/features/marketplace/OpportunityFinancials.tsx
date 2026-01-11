"use client";

import { CreativeAsset } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { TrendingUp, DollarSign, PieChart } from "lucide-react";
import { motion } from "framer-motion";

interface OpportunityFinancialsProps {
  asset: CreativeAsset;
}

const revenueProjection = [
  { month: "Month 1", projected: 0, actual: 0 },
  { month: "Month 3", projected: 50000, actual: 0 },
  { month: "Month 6", projected: 120000, actual: 45000 },
  { month: "Month 9", projected: 200000, actual: 0 },
  { month: "Month 12", projected: 350000, actual: 0 },
];

const revenueBreakdown = [
  { source: "Streaming", value: 45, color: "#22c55e" },
  { source: "Licensing", value: 30, color: "#3b82f6" },
  { source: "Distribution", value: 15, color: "#f59e0b" },
  { source: "Merchandising", value: 10, color: "#8b5cf6" },
];

export function OpportunityFinancials({ asset }: OpportunityFinancialsProps) {
  return (
    <div className="space-y-6">
      {/* Revenue Projection Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Revenue Projection (12 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueProjection}>
              <defs>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                formatter={(value: number | undefined) => value ? `$${value.toLocaleString()}` : "$0"}
              />
              <Area
                type="monotone"
                dataKey="projected"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorProjected)"
                name="Projected"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorActual)"
                name="Actual"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Projected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Actual</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Revenue Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueBreakdown}>
              <XAxis dataKey="source" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                formatter={(value: number | undefined) => value ? `${value}%` : "0%"}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {revenueBreakdown.map((item) => (
              <div key={item.source} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.source}</p>
                  <p className="text-xs text-muted-foreground">{item.value}% of revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs">Year 1 Projection</span>
            </div>
            <p className="text-2xl font-bold">$350K</p>
            <p className="text-xs text-muted-foreground mt-1">Based on market analysis</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Expected ROI</span>
            </div>
            <p className="text-2xl font-bold text-green-500">{asset.apy}%</p>
            <p className="text-xs text-muted-foreground mt-1">Annual percentage yield</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs">Break-even Point</span>
            </div>
            <p className="text-2xl font-bold">18 months</p>
            <p className="text-xs text-muted-foreground mt-1">Estimated timeline</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
