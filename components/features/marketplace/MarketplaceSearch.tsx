"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreativeAsset } from "@/lib/mock-db";

interface MarketplaceSearchProps {
  assets: CreativeAsset[];
  onFilteredAssetsChange: (assets: CreativeAsset[]) => void;
}

export function MarketplaceSearch({ assets, onFilteredAssetsChange }: MarketplaceSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const prevResultRef = useRef<string>("");

  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) {
      return assets;
    }

    const query = searchQuery.toLowerCase();
    return assets.filter(
      (asset) =>
        asset.title.toLowerCase().includes(query) ||
        asset.creator.toLowerCase().includes(query) ||
        asset.type.toLowerCase().includes(query) ||
        asset.description.toLowerCase().includes(query) ||
        asset.rightsType.some((right) => right.toLowerCase().includes(query))
    );
  }, [assets, searchQuery]);

  // Only update parent when result actually changes
  useEffect(() => {
    const resultKey = filteredAssets.map(a => a.id).join(",");
    if (resultKey !== prevResultRef.current) {
      prevResultRef.current = resultKey;
      onFilteredAssetsChange(filteredAssets);
    }
  }, [filteredAssets, onFilteredAssetsChange]);

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search assets, creators, or rights types..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-10 h-12 text-base"
      />
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSearchQuery("")}
            className="h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
      {searchQuery && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground mt-2"
        >
          Found {filteredAssets.length} {filteredAssets.length === 1 ? "asset" : "assets"}
        </motion.p>
      )}
    </div>
  );
}
