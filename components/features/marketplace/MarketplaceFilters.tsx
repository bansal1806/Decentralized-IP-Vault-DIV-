"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreativeAsset } from "@/lib/mock-db";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketplaceFiltersProps {
  assets: CreativeAsset[];
  onFilteredAssetsChange: (assets: CreativeAsset[]) => void;
}

type SortOption = "apy" | "valuation" | "equity" | "minInvestment";
type SortDirection = "asc" | "desc";

export function MarketplaceFilters({ assets, onFilteredAssetsChange }: MarketplaceFiltersProps) {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("apy");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const prevResultRef = useRef<string>("");

  // Memoize filtered and sorted results
  const filteredAndSorted = useMemo(() => {
    return assets
      .filter((asset) => {
        if (typeFilter !== "all" && asset.type.toLowerCase() !== typeFilter) return false;
        if (statusFilter !== "all" && asset.status.toLowerCase() !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => {
        let aValue: number;
        let bValue: number;

        switch (sortBy) {
          case "apy":
            aValue = a.apy;
            bValue = b.apy;
            break;
          case "valuation":
            aValue = a.totalValuation;
            bValue = b.totalValuation;
            break;
          case "equity":
            aValue = a.availableEquity;
            bValue = b.availableEquity;
            break;
          case "minInvestment":
            aValue = a.minInvestment;
            bValue = b.minInvestment;
            break;
          default:
            return 0;
        }

        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      });
  }, [assets, typeFilter, statusFilter, sortBy, sortDirection]);

  // Only update parent when result actually changes
  useEffect(() => {
    const resultKey = filteredAndSorted.map(a => a.id).join(",");
    if (resultKey !== prevResultRef.current) {
      prevResultRef.current = resultKey;
      onFilteredAssetsChange(filteredAndSorted);
    }
  }, [filteredAndSorted, onFilteredAssetsChange]);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortDirection("desc");
    }
  };

  const SortIcon = sortDirection === "asc" ? TrendingUp : TrendingDown;

  return (
    <div className="space-y-4 mb-6">
      {/* Type Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground self-center">Type:</span>
        {["all", "film", "music", "literature"].map((type) => (
          <motion.div key={type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={typeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(type)}
              className="rounded-full"
            >
              {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground self-center">Status:</span>
        {["all", "funding", "active", "payout"].map((status) => (
          <motion.div key={status} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="rounded-full"
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        {[
          { key: "apy" as SortOption, label: "APY" },
          { key: "valuation" as SortOption, label: "Valuation" },
          { key: "equity" as SortOption, label: "Equity" },
          { key: "minInvestment" as SortOption, label: "Min Investment" },
        ].map((option) => (
          <motion.div key={option.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={sortBy === option.key ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSort(option.key)}
              className="rounded-full gap-1"
            >
              {option.label}
              {sortBy === option.key && <SortIcon className="w-3 h-3" />}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
