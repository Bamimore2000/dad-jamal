"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Lock,
  Unlock,
  Plus,
  Eye,
  EyeOff,
  Shield,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: number;
  type: string;
  number: string;
  balance: number;
  status: "active" | "locked";
  gradient?: string;
  chipColor?: string;
}

interface CardsComponentProps {
  cards: CardItem[];
  onAddCard?: () => void;
  onToggleCardStatus?: (cardId: number) => void;
}

const premiumGradients = [
  "from-purple-600 via-pink-500 to-rose-500",
  "from-emerald-500 via-teal-500 to-cyan-600",
  "from-amber-500 via-orange-500 to-red-600",
  "from-indigo-600 via-blue-600 to-cyan-500",
  "from-slate-700 via-zinc-800 to-neutral-900",
];

export default function CardsComponent({
  cards,
  onAddCard,
  onToggleCardStatus,
}: CardsComponentProps) {
  const [showBalance, setShowBalance] = useState<Record<number, boolean>>({});
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleBalance = (cardId: number) => {
    setShowBalance((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleToggleStatus = (card: CardItem) => {
    if (onToggleCardStatus) onToggleCardStatus(card.id);
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 p-2 pb-12 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      {/* Header */}

      {/* Add New Card - Premium */}
      <Card
        onClick={onAddCard}
        className="group relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border-0 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="relative flex items-center justify-center gap-4 py-12">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg transform transition-transform group-hover:rotate-12 group-hover:scale-110">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl">Issue Premium Card</p>
            <p className="text-gray-400 text-sm">
              Black Titanium • Unlimited • 0% FX
            </p>
          </div>
          <Star className="w-6 h-6 text-yellow-400 absolute top-4 right-4 animate-pulse" />
        </CardContent>
      </Card>

      {/* Premium Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cards.map((card, index) => {
          const gradient =
            card.gradient || premiumGradients[index % premiumGradients.length];
          const isBalanceVisible = showBalance[card.id] ?? true;

          return (
            <div
              key={card.id}
              className="group relative transform transition-all duration-500 hover:-translate-y-2"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

              {/* Main Card */}
              <Card
                className={cn(
                  "relative overflow-hidden border-0 shadow-xl text-white h-56 rounded-2xl",
                  "bg-gradient-to-br",
                  gradient
                )}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                </div>

                {/* Chip */}
                <div className="absolute top-4 right-4 w-10 h-8 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg shadow-inner flex items-center justify-center">
                  <div className="w-7 h-5 bg-gradient-to-br from-yellow-300 to-amber-500 rounded" />
                </div>

                <CardHeader className="relative z-10 pb-2 px-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold tracking-wide flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        {card.type}
                      </CardTitle>
                      <p className="text-white/70 text-xs mt-1">
                        •••• {card.number.slice(-4)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleStatus(card)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      {card.status === "active" ? (
                        <Unlock className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 px-4">
                  {/* Card Number */}
                  <div className="mb-4">
                    <p className="font-mono text-lg tracking-widest drop-shadow-md">
                      {card.number.replace(/(\d{4})/g, "$1 ")}
                    </p>
                  </div>

                  {/* Balance Section */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium mb-1">
                        Available Balance
                      </p>
                      <p className="text-2xl font-bold tracking-tight">
                        {isBalanceVisible ? (
                          <span className="drop-shadow-lg">
                            {formatBalance(card.balance)}
                          </span>
                        ) : (
                          <span className="tracking-widest">••••••••</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleBalance(card.id)}
                      className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      {isBalanceVisible ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        card.status === "active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      )}
                    >
                      {card.status === "active" ? "● Active" : "● Locked"}
                    </div>
                    <CreditCard className="w-4 h-4 opacity-60" />
                  </div>
                </CardContent>

                {/* Holographic Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -skew-x-12 translate-x-28 group-hover:translate-x-0 transition-transform duration-1000" />
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Premium Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Card Status Confirmed
            </DialogTitle>
          </DialogHeader>
          <div className="relative z-10 py-8 text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
              {selectedCard?.status === "active" ? (
                <Unlock className="w-10 h-10 text-white" />
              ) : (
                <Lock className="w-10 h-10 text-white" />
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">{selectedCard?.type}</p>
              <p className="text-white/70">
                •••• {selectedCard?.number.slice(-4)}
              </p>
            </div>
            <p className="text-xl">
              Card is now{" "}
              <span
                className={cn(
                  "font-bold",
                  selectedCard?.status === "active"
                    ? "text-green-400"
                    : "text-red-400"
                )}
              >
                {selectedCard?.status === "active" ? "ACTIVE" : "LOCKED"}
              </span>
            </p>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg transform transition-all hover:scale-105"
            >
              Close Vault
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-500">
          Secured by{" "}
          <span className="font-semibold text-gray-700">
            256-bit AES • FDIC Insured • PCI DSS
          </span>
        </p>
      </div>
    </div>
  );
}
