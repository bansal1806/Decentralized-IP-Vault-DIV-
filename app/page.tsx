"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Coins, Play } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedStats } from "@/components/features/home/AnimatedStats";
import { TrustIndicators } from "@/components/features/home/TrustIndicators";
import { LiveActivity } from "@/components/features/home/LiveActivity";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background/90 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container relative z-10 max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="flex h-2 w-2 rounded-full bg-primary mr-2"
              ></motion.span>
              The Financial Backbone for Culture
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
            >
              Own the Rights to <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-primary"
              >
                Music, Film & Art.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              DIV Protocol transforms creative assets into liquid financial instruments.
              Invest in the next blockbuster or hit song and earn verified royalties.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex gap-4 pt-4 justify-center"
            >
              <Button size="lg" className="h-12 px-8 text-lg group" asChild>
                <Link href="/marketplace">
                  Start Investing{" "}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg" asChild>
                <Link href="/marketplace">For Creators</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:block opacity-50 pointer-events-none">
          <div className="relative w-full h-full">
            <Image src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2670&auto=format&fit=crop" alt="Abstract Art" fill className="object-cover mask-image-gradient" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why DIV Protocol?</h2>
            <p className="text-muted-foreground">
              We are building the standard system for owning, valuing, and monetizing creative rights, just like stock exchanges did for companies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Legal Compliance", desc: "Every asset is a Reg A+ or Reg CF qualified offering. Real legal rights, not just metadata." },
              { icon: Globe, title: "Global Distribution", desc: "Royalties collected from 150+ territories and distributed automatically via smart contracts." },
              { icon: Coins, title: "Instant Liquidity", desc: "Trade your royalty rights on the secondary market. Exit when you want." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <AnimatedStats />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Live Activity Preview */}
      <section className="py-24 bg-background">
        <div className="container max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Real-Time Transparency
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                See investments, payouts, and new assets as they happen. Every transaction is transparent and verifiable on the DIV Protocol ledger.
              </p>
              <ul className="space-y-3">
                {["Live investment tracking", "Real-time payout notifications", "Transparent asset listings", "Verified ownership records"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LiveActivity />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container max-w-screen-xl mx-auto relative z-10 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to shape culture?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors, creators, and fans building the future of creative ownership.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 group" asChild>
              <Link href="/marketplace">
                Explore Assets{" "}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
