"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, User, Music, Film } from "lucide-react";

interface Activity {
  id: string;
  type: "investment" | "payout" | "asset";
  message: string;
  amount?: string;
  icon: React.ElementType;
  time: string;
}

const mockActivities: Omit<Activity, "id">[] = [
  { type: "investment", message: "invested in", amount: "$2,500", icon: User, time: "2m ago" },
  { type: "payout", message: "received payout from", amount: "$450", icon: TrendingUp, time: "5m ago" },
  { type: "asset", message: "new asset listed:", icon: Music, time: "12m ago" },
  { type: "investment", message: "invested in", amount: "$1,200", icon: User, time: "15m ago" },
  { type: "asset", message: "new asset listed:", icon: Film, time: "22m ago" },
];

export function LiveActivity() {
  const idCounter = useRef(0);
  const [activities, setActivities] = useState<Activity[]>(() => 
    mockActivities.slice(0, 3).map(activity => ({
      ...activity,
      id: `activity-${idCounter.current++}`
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockActivities.length);
      setActivities((prev) => {
        const nextActivityData = mockActivities[currentIndex];
        const newActivity: Activity = {
          ...nextActivityData,
          id: `activity-${idCounter.current++}`
        };
        return [newActivity, ...prev.slice(0, 2)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        <h3 className="text-sm font-semibold">Live Activity</h3>
      </div>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 text-sm"
              >
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground truncate">
                    <span className="font-medium text-foreground">{activity.amount || "New"}</span>{" "}
                    {activity.message}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
