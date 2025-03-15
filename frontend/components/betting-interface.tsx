"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Brain, Shield, Microscope, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_MARKETS = {
  pandemic: [
    {
      id: 1,
      question: "Will India face a new pandemic wave in 2025?",
      outcomes: ["Yes", "No"],
      odds: { yes: 30, no: 70 },
      source: "WHO + Wastewater Monitoring Data",
    },
    {
      id: 2,
      question: "Air quality index to exceed 300 in Delhi for >30 days in 2024?",
      outcomes: ["Yes", "No"],
      odds: { yes: 65, no: 35 },
      source: "Air Quality Sensors Network",
    },
  ],
  ai: [
    {
      id: 3,
      question: "AGI breakthrough by leading lab before 2026?",
      outcomes: ["Yes", "No"],
      odds: { yes: 40, no: 60 },
      source: "Published Research + Expert Panel",
    },
    {
      id: 4,
      question: "AI system to pass medical licensing exam by 2025?",
      outcomes: ["Yes", "No"],
      odds: { yes: 75, no: 25 },
      source: "Medical Board Results",
    },
  ],
  cyber: [
    {
      id: 5,
      question: "Major cloud provider outage (>24hrs) in 2024?",
      outcomes: ["Yes", "No"],
      odds: { yes: 45, no: 55 },
      source: "Status Pages + Downdetector",
    },
    {
      id: 6,
      question: "Cryptocurrency exchange hack exceeding $100M in 2024?",
      outcomes: ["Yes", "No"],
      odds: { yes: 80, no: 20 },
      source: "Blockchain Analysis",
    },
  ],
  misinfo: [
    {
      id: 7,
      question: "Deepfake video to influence major election in 2024?",
      outcomes: ["Yes", "No"],
      odds: { yes: 70, no: 30 },
      source: "Fact-Checking Organizations",
    },
    {
      id: 8,
      question: "Social platform to face fine for misinfo spread in 2024?",
      outcomes: ["Yes", "No"],
      odds: { yes: 85, no: 15 },
      source: "Regulatory Bodies",
    },
  ],
};

const CATEGORIES = [
  { 
    id: "pandemic",
    name: "Pandemic Risks",
    icon: Microscope,
    color: "from-emerald-500 to-teal-500",
    description: "Early detection based on wastewater monitoring and air quality sensors"
  },
  { 
    id: "ai",
    name: "AI Safety",
    icon: Brain,
    color: "from-blue-500 to-indigo-500",
    description: "Time to AGI and likelihood of AI disempowerment scenarios"
  },
  { 
    id: "cyber",
    name: "Cyber Threats",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    description: "Probability of major outages and large-scale hacks"
  },
  { 
    id: "misinfo",
    name: "Misinformation",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
    description: "Evaluating claims and tracking information integrity"
  },
];

export function BettingInterface() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [amount, setAmount] = useState("");

  const handlePlaceBet = () => {
    console.log("Placing bet:", { selectedMarket, selectedOutcome, amount });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`cursor-pointer`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <Card className={`p-4 ${selectedCategory === category.id ? 'ring-2 ring-primary' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Betting Interface */}
      {selectedCategory && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Select Market</Label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a market" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_MARKETS[selectedCategory].map((market) => (
                    <SelectItem key={market.id} value={market.id.toString()}>
                      {market.question}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMarket && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label>Select Outcome</Label>
                  <Select
                    value={selectedOutcome}
                    onValueChange={setSelectedOutcome}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_MARKETS[selectedCategory]
                        .find(m => m.id.toString() === selectedMarket)
                        ?.outcomes.map((outcome) => (
                          <SelectItem key={outcome} value={outcome}>
                            {outcome} ({outcome === "Yes" ? 
                              MOCK_MARKETS[selectedCategory].find(m => m.id.toString() === selectedMarket)?.odds.yes :
                              MOCK_MARKETS[selectedCategory].find(m => m.id.toString() === selectedMarket)?.odds.no}%)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bet Amount (ZETA)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Source: {MOCK_MARKETS[selectedCategory].find(m => m.id.toString() === selectedMarket)?.source}
                  </p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  onClick={handlePlaceBet}
                  disabled={!selectedOutcome || !amount}
                >
                  Place Bet
                </Button>
              </motion.div>
            )}
          </div>
        </Card>
      )}
    </motion.div>
  );
}