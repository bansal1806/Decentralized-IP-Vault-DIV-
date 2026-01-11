"use client";

import { ShieldCheck, Lock, FileCheck, Globe, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "SEC Compliant",
    description: "Reg A+ & Reg CF qualified offerings. Full regulatory compliance.",
    badge: "Legal",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Multi-signature wallets, encrypted storage, and audit trails.",
    badge: "Secure",
  },
  {
    icon: FileCheck,
    title: "Transparent Contracts",
    description: "All rights and payouts verified on-chain. No hidden terms.",
    badge: "Verified",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Royalties collected from 150+ territories automatically.",
    badge: "Worldwide",
  },
  {
    icon: Award,
    title: "Industry Standard",
    description: "Built to become the financial backbone for culture.",
    badge: "Trusted",
  },
  {
    icon: CheckCircle2,
    title: "Real Rights",
    description: "Actual legal ownership, not just metadata or speculation.",
    badge: "Authentic",
  },
];

export function TrustIndicators() {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container max-w-screen-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Trust & Compliance First
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built for Long-Term Trust
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            DIV Protocol isn't speculation—it's financial infrastructure. Every feature is designed for transparency, compliance, and lasting value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {feature.badge}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
