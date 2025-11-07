"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, ArrowLeft, LogOut, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface InvestPageProps {
  onLogout: () => void;
  onNavigate: (page: "home" | "transfers" | "invest" | "analytics") => void;
}

const portfolioData = [
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 10500 },
  { month: "Mar", value: 11200 },
  { month: "Apr", value: 11800 },
  { month: "May", value: 12100 },
  { month: "Jun", value: 13200 },
  { month: "Jul", value: 13900 },
  { month: "Aug", value: 14500 },
  { month: "Sep", value: 15150 },
  { month: "Oct", value: 16000 },
  { month: "Nov", value: 16750 },
  { month: "Dec", value: 17500 },
];

const investments = [
  {
    id: 1,
    name: "Tech Growth Fund",
    symbol: "TGF",
    shares: 50,
    pricePerShare: 152.4,
    percentage: 30,
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Index 500",
    symbol: "IDX",
    shares: 80,
    pricePerShare: 145.8,
    percentage: 25,
    color: "#10b981",
  },
  {
    id: 3,
    name: "Global Dividend",
    symbol: "GDV",
    shares: 120,
    pricePerShare: 68.2,
    percentage: 20,
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "Bond Portfolio",
    symbol: "BND",
    shares: 200,
    pricePerShare: 34.5,
    percentage: 10,
    color: "#8b5cf6",
  },
  {
    id: 5,
    name: "Real Estate Trust",
    symbol: "RET",
    shares: 30,
    pricePerShare: 210.5,
    percentage: 10,
    color: "#ec4899",
  },
  {
    id: 6,
    name: "Emerging Markets Fund",
    symbol: "EMF",
    shares: 60,
    pricePerShare: 95.3,
    percentage: 5,
    color: "#f87171",
  },
];

export default function InvestPage({ onLogout, onNavigate }: InvestPageProps) {
  const [amount, setAmount] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState<
    (typeof investments)[0] | null
  >(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInvest = () => {
    if (amount && selectedInvestment) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setAmount("");
      setSelectedInvestment(null);
    }
  };

  const totalPortfolioValue = investments.reduce(
    (sum, inv) => sum + inv.shares * inv.pricePerShare,
    0
  );
  const gainAmount = 3250;
  const gainPercentage = 32.5;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Investments</h1>
              <p className="text-xs text-muted-foreground">
                Manage your portfolio
              </p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="h-10 text-sm bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900 text-sm">
                  Investment Added Successfully
                </p>
                <p className="text-xs text-green-800">
                  ${amount} invested in {selectedInvestment?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Portfolio Value
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${(50000 + totalPortfolioValue).toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">
                  +${gainAmount.toFixed(2)} ({gainPercentage}% gain)
                </span>
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portfolioData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-accent)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Allocation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm text-foreground">
                    {investment.name}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {investment.percentage}%
                  </p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${investment.percentage}%`,
                      backgroundColor: investment.color,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {investment.shares} shares @ $
                  {investment.pricePerShare.toFixed(2)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add Investment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Investment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Investment Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-foreground font-semibold">
                  $
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 h-12 text-lg font-semibold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Fund</Label>
              <div className="grid grid-cols-1 gap-3">
                {investments.map((investment) => (
                  <button
                    key={investment.id}
                    onClick={() => setSelectedInvestment(investment)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedInvestment?.id === investment.id
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: investment.color }}
                      >
                        {investment.symbol.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {investment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {investment.symbol}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleInvest}
              disabled={!amount || !selectedInvestment}
              className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Add Investment
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-around">
          <button
            onClick={() => onNavigate("home")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
              />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => onNavigate("transfers")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="text-xs font-medium">Transfers</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-accent">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Invest</span>
          </button>
          <button
            onClick={() => onNavigate("analytics")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7H5v12h8V7zM13 3h6v4h-6V3z"
              />
            </svg>
            <span className="text-xs font-medium">Analytics</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
