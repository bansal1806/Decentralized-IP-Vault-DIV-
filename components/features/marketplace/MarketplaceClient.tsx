"use client";

import { AnimatedIPCard } from "@/components/features/marketplace/AnimatedIPCard";
import { MarketplaceSearch } from "@/components/features/marketplace/MarketplaceSearch";
import { MarketplaceFilters } from "@/components/features/marketplace/MarketplaceFilters";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CreativeAsset } from "@/lib/mock-db";

interface MarketplaceClientProps {
    initialAssets: CreativeAsset[];
}

export function MarketplaceClient({ initialAssets }: MarketplaceClientProps) {
    const [searchFilteredAssets, setSearchFilteredAssets] = useState<CreativeAsset[]>(initialAssets);
    const [displayedAssets, setDisplayedAssets] = useState<CreativeAsset[]>(initialAssets);

    // Memoize callbacks to prevent infinite loops
    const handleSearchChange = useCallback((assets: CreativeAsset[]) => {
        setSearchFilteredAssets(assets);
        setDisplayedAssets(assets);
    }, []);

    const handleFilterChange = useCallback((assets: CreativeAsset[]) => {
        setDisplayedAssets(assets);
    }, []);

    return (
        <div className="container py-8 max-w-screen-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Rights Marketplace</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Discover and invest in fractional ownership rights of premium creative assets.
                        Verified royalties, legal compliance, and transparent payouts.
                    </p>
                </div>
            </motion.div>

            <MarketplaceSearch assets={initialAssets} onFilteredAssetsChange={handleSearchChange} />
            <MarketplaceFilters assets={searchFilteredAssets} onFilteredAssetsChange={handleFilterChange} />

            {displayedAssets.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-muted-foreground text-lg">No assets found matching your criteria.</p>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {displayedAssets.map((asset, index) => (
                        <AnimatedIPCard key={asset.id} asset={asset} index={index} />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
