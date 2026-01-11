"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Music, Film, BookOpen, DollarSign } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  change?: string;
  color: string;
}

const stats: Stat[] = [
  { icon: DollarSign, value: "$12.4M", label: "Total Invested", change: "+24% this month", color: "text-green-500" },
  { icon: Users, value: "2,847", label: "Active Investors", change: "+156 this week", color: "text-blue-500" },
  { icon: Music, value: "48", label: "Music Assets", change: "12 new this month", color: "text-purple-500" },
  { icon: Film, value: "23", label: "Film Projects", change: "5 in production", color: "text-orange-500" },
  { icon: BookOpen, value: "31", label: "Literature Works", change: "8 bestsellers", color: "text-pink-500" },
  { icon: TrendingUp, value: "14.2%", label: "Avg. APY", change: "Across all assets", color: "text-emerald-500" },
];

function AnimatedNumber({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.,]/g, "");

  useEffect(() => {
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = numericValue * easeOutQuart;
      
      if (value.includes("M") && value.includes("$")) {
        setDisplayValue(`$${(current / 1000000).toFixed(1)}M`);
      } else if (value.includes("%")) {
        setDisplayValue(`${current.toFixed(1)}%`);
      } else {
        setDisplayValue(Math.floor(current).toLocaleString() + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    requestAnimationFrame(animate);
  }, [value, numericValue, suffix, duration]);

  return <span>{displayValue}</span>;
}

export function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-screen-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Platform by the Numbers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real ownership. Real returns. Real impact on culture.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className={`inline-flex p-3 rounded-lg bg-primary/10 mb-3 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {isInView ? <AnimatedNumber value={stat.value} /> : "0"}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                {stat.change && (
                  <div className="text-xs text-muted-foreground">{stat.change}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
