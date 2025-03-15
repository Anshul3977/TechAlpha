"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnect } from "@/components/wallet-connect";
import { ThemeToggle } from "@/components/theme-toggle";
import { LandingHero } from "@/components/landing-hero";
import { MarketsList } from "@/components/markets-list";
import { BettingInterface } from "@/components/betting-interface";
import { Dashboard } from "@/components/dashboard";
import { motion } from "framer-motion";

export default function Home() {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.header 
        className="border-b"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            PredictX
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnect connected={connected} setConnected={setConnected} />
          </div>
        </div>
      </motion.header>

      <main>
        {!connected ? (
          <LandingHero onConnect={handleConnect} />
        ) : (
          <motion.div 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="markets" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="markets">Active Markets</TabsTrigger>
                <TabsTrigger value="bet">Place Bet</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>
              <TabsContent value="markets" className="space-y-4">
                <MarketsList />
              </TabsContent>
              <TabsContent value="bet" className="space-y-4">
                <BettingInterface />
              </TabsContent>
              <TabsContent value="portfolio" className="space-y-4">
                <Dashboard />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </main>
    </div>
  );
}