"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CreativeAsset } from "@/lib/mock-db";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ShieldCheck } from "lucide-react";

interface AnimatedIPCardProps {
    asset: CreativeAsset;
    index: number;
}

export function AnimatedIPCard({ asset, index }: AnimatedIPCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 group h-full flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={asset.imageUrl}
                        alt={asset.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Badge variant="secondary" className="backdrop-blur-md bg-background/50 border-white/10">
                                {asset.type}
                            </Badge>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="font-bold text-xl leading-tight text-white mb-1"
                        >
                            {asset.title}
                        </motion.h3>
                        <p className="text-sm text-gray-300 mb-2">{asset.creator}</p>
                        <div className="flex flex-wrap gap-1">
                            {asset.rightsType.slice(0, 2).map((right) => (
                                <Badge
                                    key={right}
                                    variant="outline"
                                    className="text-[10px] h-5 border-white/20 text-gray-200"
                                >
                                    {right}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <CardContent className="p-4 grid grid-cols-2 gap-4 flex-1">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            Yield (APY)
                        </p>
                        <div className="flex items-center text-green-500 font-bold">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {asset.apy}%
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            Valuation
                        </p>
                        <p className="font-medium">${(asset.totalValuation / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            Equity Avail
                        </p>
                        <p className="font-medium">{asset.availableEquity}%</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            Status
                        </p>
                        <div className="flex items-center text-blue-400 text-sm">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            {asset.status}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button className="w-full font-semibold group-hover:bg-primary/90 transition-colors" asChild>
                        <Link href={`/marketplace/${asset.id}`}>
                            View Opportunity
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
