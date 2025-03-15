"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Shield, Microscope, AlertTriangle } from "lucide-react";

export function CreateMarket() {
  const [category, setCategory] = useState("");

  const categories = [
    { id: "ai", name: "AI Safety", icon: Brain },
    { id: "cyber", name: "Cyber Threats", icon: Shield },
    { id: "pandemic", name: "Pandemic Risks", icon: Microscope },
    { id: "misinfo", name: "Misinformation", icon: AlertTriangle },
  ];

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create a New Market</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Question</Label>
          <Input placeholder="Will [X event] happen by [date]?" />
          <p className="text-sm text-muted-foreground">
            Make it specific and verifiable
          </p>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  <div className="flex items-center gap-2">
                    <cat.icon className="h-4 w-4" />
                    {cat.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Resolution Criteria</Label>
          <Textarea 
            placeholder="Describe how this market will be resolved (e.g., specific data source, threshold for YES/NO)"
          />
        </div>

        <div className="space-y-2">
          <Label>Resolution Date</Label>
          <Input type="date" />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Market Creation Requirements</h3>
          <p className="text-sm text-muted-foreground">
            You need to stake 100 ZETA to create this market. This stake will be:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>• Returned if the market is approved</li>
            <li>• Slashed if the market is deemed invalid</li>
          </ul>
        </div>

        <Button className="w-full">
          Create Market (Stake 100 ZETA)
        </Button>
      </div>
    </Card>
  );
}