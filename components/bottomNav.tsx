"use client";

import { Wallet, Send, TrendingUp, TrendingDown } from "lucide-react";

interface BottomNavProps {
  active: string; // the current active tab (e.g. "home")
  onNavigate: (tab: "home" | "transfers" | "invest" | "analytics") => void; // callback to change tab
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const tabs = [
    { key: "home", label: "Home", icon: Wallet },
    { key: "transfers", label: "Transfers", icon: Send },
    { key: "invest", label: "Invest", icon: TrendingUp },
    { key: "analytics", label: "Analytics", icon: TrendingDown },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-[100] border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-around">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key as "home")}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
              active === key
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
