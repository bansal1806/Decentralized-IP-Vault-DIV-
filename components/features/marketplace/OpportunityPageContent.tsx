"use client";

import Link from "next/link";
import Image from "next/image";
import { CreativeAsset } from "@/lib/mock-db";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedInvestModal } from "@/components/features/invest/EnhancedInvestModal";
import { OpportunityOverview } from "@/components/features/marketplace/OpportunityOverview";
import { OpportunityFinancials } from "@/components/features/marketplace/OpportunityFinancials";
import { ChevronLeft, Share2, Globe, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface OpportunityPageContentProps {
  asset: CreativeAsset;
}

export function OpportunityPageContent({ asset }: OpportunityPageContentProps) {
  return (
    <div className="min-h-screen pb-20">
      {/* Header / Hero */}
      <div className="relative h-[400px] w-full bg-muted/20">
        <Image
          src={asset.imageUrl}
          alt={asset.title}
          fill
          className="object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="container relative z-10 h-full flex flex-col justify-end pb-8 max-w-screen-xl mx-auto">
          <Link href="/marketplace" className="absolute top-8 left-4 md:left-8 inline-flex items-center text-sm hover:text-primary transition-colors mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Marketplace
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl border border-white/10 hidden md:block shrink-0">
              <Image src={asset.imageUrl} alt={asset.title} fill className="object-cover" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">{asset.type}</Badge>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> SEC Reg A+ Qualified
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{asset.title}</h1>
              <p className="text-xl text-gray-300 font-medium">by {asset.creator}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {asset.rightsType.map(r => (
                  <Badge key={r} variant="outline" className="border-white/20 text-gray-300">{r}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pb-2 w-full md:w-auto">
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="legal">Rights & Legal</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert max-w-none"
              >
                <h3 className="text-xl font-semibold mb-2">About this Asset</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {asset.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The DIV Protocol allows you to participate in the success of {asset.title}.
                  By owning rights, you are directly supporting {asset.creator} and sharing in the revenue generated from strictly defined exploitation channels.
                </p>
              </motion.div>

              <OpportunityOverview asset={asset} />
            </TabsContent>

            <TabsContent value="financials" className="mt-6">
              <OpportunityFinancials asset={asset} />
            </TabsContent>

            <TabsContent value="legal" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Rights Structure</h3>
                  <ul className="space-y-3">
                    {asset.rightsType.map((right, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-semibold block">{right}</span>
                          <span className="text-sm text-muted-foreground">Perpetual revenue share from global exploitation.</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar / Investment Action */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="border-primary/20 bg-card/80 backdrop-blur-md shadow-2xl">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Valuation</p>
                  <p className="text-3xl font-bold">${asset.totalValuation.toLocaleString()}</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${100 - asset.availableEquity}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{(100 - asset.availableEquity)}% Funded</span>
                    <span>{asset.availableEquity}% Remaining</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum</span>
                    <span className="font-medium">${asset.minInvestment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rights Type</span>
                    <span className="font-medium">{asset.type}</span>
                  </div>
                </div>

                <EnhancedInvestModal asset={asset} />

                <p className="text-xs text-center text-muted-foreground">
                  Secure transaction powered by DIV Protocol.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
