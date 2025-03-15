"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Microscope, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    id: "all",
    name: "All Markets",
    icon: null,
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "pandemic",
    name: "Pandemic Risks",
    icon: Microscope,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "ai",
    name: "AI Safety",
    icon: Brain,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "cyber",
    name: "Cyber Threats",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "misinfo",
    name: "Misinformation",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
  },
];

const MOCK_MARKETS = [
  {
    id: 1,
    category: "pandemic",
    question: "Will a new COVID variant cause >100k daily cases in any country by 2025?",
    outcomes: ["Yes", "No"],
    odds: { yes: 35, no: 65 },
    resolutionTime: "2025-12-31",
    totalBets: "2,345 ZETA",
    source: "WHO + Wastewater Data",
    status: "active",
  },
  {
    id: 2,
    category: "pandemic",
    question: "Air quality index to exceed 300 in Delhi for >30 days in 2024?",
    outcomes: ["Yes", "No"],
    odds: { yes: 75, no: 25 },
    resolutionTime: "2024-12-31",
    totalBets: "1,890 ZETA",
    source: "Air Quality Network",
    status: "active",
  },
  {
    id: 3,
    category: "ai",
    question: "Will AGI achieve human-level performance on mathematical reasoning by 2026?",
    outcomes: ["Yes", "No"],
    odds: { yes: 40, no: 60 },
    resolutionTime: "2026-12-31",
    totalBets: "5,678 ZETA",
    source: "Research Publications",
    status: "active",
  },
  {
    id: 4,
    category: "ai",
    question: "Major AI lab to demonstrate AGI capabilities meeting NIST criteria in 2024?",
    outcomes: ["Yes", "No"],
    odds: { yes: 25, no: 75 },
    resolutionTime: "2024-12-31",
    totalBets: "3,456 ZETA",
    source: "NIST Standards",
    status: "active",
  },
  {
    id: 5,
    category: "cyber",
    question: "Critical infrastructure cyber attack causing >24hr outage in 2024?",
    outcomes: ["Yes", "No"],
    odds: { yes: 60, no: 40 },
    resolutionTime: "2024-12-31",
    totalBets: "4,567 ZETA",
    source: "CISA Reports",
    status: "active",
  },
  {
    id: 6,
    category: "cyber",
    question: "Quantum computer to break current RSA-2048 encryption by 2025?",
    outcomes: ["Yes", "No"],
    odds: { yes: 15, no: 85 },
    resolutionTime: "2025-12-31",
    totalBets: "6,789 ZETA",
    source: "Academic Papers",
    status: "active",
  },
  {
    id: 7,
    category: "misinfo",
    question: "AI-generated deepfake to cause major stock market movement in 2024?",
    outcomes: ["Yes", "No"],
    odds: { yes: 70, no: 30 },
    resolutionTime: "2024-12-31",
    totalBets: "3,234 ZETA",
    source: "Financial Records",
    status: "active",
  },
  {
    id: 8,
    category: "misinfo",
    question: "Social platform to implement blockchain-based content verification in 2024?",
    outcomes: ["Yes", "No"],
    odds: { yes: 45, no: 55 },
    resolutionTime: "2024-12-31",
    totalBets: "2,345 ZETA",
    source: "Platform Announcements",
    status: "active",
  },
];

export function MarketsList() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMarkets = MOCK_MARKETS.filter(
    (market) => selectedCategory === "all" || market.category === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Active Markets</h2>
          <p className="text-muted-foreground">
            Predict global risks and earn rewards
          </p>
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1">
          {filteredMarkets.length} Markets
        </Badge>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
              selectedCategory === category.id
                ? "bg-gradient-to-r text-white shadow-md " + category.color
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category.icon && <category.icon className="h-4 w-4" />}
            <span className="whitespace-nowrap">{category.name}</span>
          </motion.button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40%]">Prediction Market</TableHead>
              <TableHead>Current Odds</TableHead>
              <TableHead>Resolution Date</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMarkets.map((market) => (
              <motion.tr
                key={market.id}
                variants={itemVariants}
                className="group hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{market.question}</div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "bg-gradient-to-r bg-clip-text text-transparent",
                        CATEGORIES.find((c) => c.id === market.category)?.color
                      )}
                    >
                      {CATEGORIES.find((c) => c.id === market.category)?.name}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${market.odds.yes}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Yes {market.odds.yes}%</span>
                      <span>No {market.odds.no}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{market.resolutionTime}</TableCell>
                <TableCell>{market.totalBets}</TableCell>
                <TableCell className="text-muted-foreground">
                  {market.source}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="capitalize bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    {market.status}
                  </Badge>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}