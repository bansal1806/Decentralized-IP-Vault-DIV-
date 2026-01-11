"use client";

import { CreativeAsset } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Calendar, Target, ShieldCheck, Globe, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface OpportunityOverviewProps {
  asset: CreativeAsset;
}

export function OpportunityOverview({ asset }: OpportunityOverviewProps) {
  const fundingProgress = 100 - asset.availableEquity;
  const totalRaised = (asset.totalValuation * fundingProgress) / 100;
  const remainingToRaise = (asset.totalValuation * asset.availableEquity) / 100;

  const milestones = [
    { label: "Pre-Production", status: "completed", date: "Q1 2025" },
    { label: "Production", status: asset.status === "Active" ? "active" : "upcoming", date: "Q2 2025" },
    { label: "Distribution", status: "upcoming", date: "Q3 2025" },
    { label: "Revenue Generation", status: "upcoming", date: "Q4 2025" },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs">Total Valuation</span>
              </div>
              <p className="text-2xl font-bold">${(asset.totalValuation / 1000000).toFixed(2)}M</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">Projected APY</span>
              </div>
              <p className="text-2xl font-bold text-green-500">{asset.apy}%</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-xs">Investors</span>
              </div>
              <p className="text-2xl font-bold">1,248</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Target className="w-4 h-4" />
                <span className="text-xs">Min Investment</span>
              </div>
              <p className="text-2xl font-bold">${asset.minInvestment}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Funding Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Funding Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Raised</span>
              <span className="font-semibold">${totalRaised.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fundingProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-primary h-3 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{fundingProgress}% Funded</span>
              <span>${remainingToRaise.toLocaleString(undefined, { maximumFractionDigits: 0 })} Remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Average Investment</p>
              <p className="text-lg font-semibold">${(totalRaised / 1248).toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Days Remaining</p>
              <p className="text-lg font-semibold">42</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                  milestone.status === "completed" ? "bg-green-500" :
                  milestone.status === "active" ? "bg-primary animate-pulse" :
                  "bg-muted"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{milestone.label}</span>
                    <span className="text-sm text-muted-foreground">{milestone.date}</span>
                  </div>
                  {milestone.status === "active" && (
                    <Badge variant="secondary" className="mt-1 text-xs">In Progress</Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rights & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Rights & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-semibold">SEC Reg A+ Qualified</p>
              <p className="text-sm text-muted-foreground">Fully compliant offering under Regulation A+</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-semibold">Global Rights</p>
              <p className="text-sm text-muted-foreground">Revenue collection from 150+ territories</p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm font-semibold mb-2">Rights Included:</p>
            <div className="flex flex-wrap gap-2">
              {asset.rightsType.map((right) => (
                <Badge key={right} variant="outline">{right}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
