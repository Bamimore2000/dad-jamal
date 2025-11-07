"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send, ArrowLeft, LogOut, CheckCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TransfersPageProps {
  onLogout: () => void;
  onNavigate: (page: "home" | "transfers" | "invest" | "analytics") => void;
}

const recentRecipients = [
  { id: 1, name: "Olivia Parker", account: "•••• 4821", initials: "OP" },
  { id: 2, name: "Liam Thompson", account: "•••• 5739", initials: "LT" },
  { id: 3, name: "Sophia Martinez", account: "•••• 3045", initials: "SM" },
  { id: 4, name: "Noah Wilson", account: "•••• 7213", initials: "NW" },
];

const transferHistory = [
  {
    id: 1,
    recipient: "Olivia Parker",
    amount: 2500,
    date: "2025-06-05",
    status: "completed",
    account: "•••• 4821",
  },
  {
    id: 2,
    recipient: "Liam Thompson",
    amount: 50000,
    date: "2025-07-01",
    status: "completed",
    account: "•••• 5739",
  },
  {
    id: 3,
    recipient: "Sophia Martinez",
    amount: 575000,
    date: "2025-07-01",
    status: "completed",
    account: "•••• 3045",
  },
  {
    id: 4,
    recipient: "Noah Wilson",
    amount: 875,
    date: "2025-07-03",
    status: "pending",
    account: "•••• 7213",
  },
  {
    id: 5,
    recipient: "Emma Johnson",
    amount: 4999,
    date: "2025-07-12",
    status: "completed",
    account: "•••• 4821",
  },
  {
    id: 6,
    recipient: "Aiden Brown",
    amount: 185000,
    date: "2025-07-30",
    status: "completed",
    account: "•••• 5739",
  },
  {
    id: 7,
    recipient: "Mia Davis",
    amount: 260000,
    date: "2025-08-05",
    status: "completed",
    account: "•••• 3045",
  },
  {
    id: 8,
    recipient: "James Miller",
    amount: 575000,
    date: "2025-08-30",
    status: "completed",
    account: "•••• 7213",
  },
  {
    id: 9,
    recipient: "Charlotte Wilson",
    amount: 45000,
    date: "2025-09-03",
    status: "completed",
    account: "•••• 4821",
  },
  {
    id: 10,
    recipient: "Elijah Anderson",
    amount: 10233,
    date: "2025-09-07",
    status: "completed",
    account: "•••• 5739",
  },
  {
    id: 11,
    recipient: "Amelia Thompson",
    amount: 580000,
    date: "2025-09-30",
    status: "completed",
    account: "•••• 3045",
  },
  {
    id: 12,
    recipient: "Lucas Taylor",
    amount: 2210,
    date: "2025-10-04",
    status: "completed",
    account: "•••• 7213",
  },
  {
    id: 13,
    recipient: "Harper Martinez",
    amount: 145000,
    date: "2025-10-18",
    status: "completed",
    account: "•••• 4821",
  },
  {
    id: 14,
    recipient: "Ethan Clark",
    amount: 580000,
    date: "2025-10-31",
    status: "completed",
    account: "•••• 5739",
  },
  {
    id: 15,
    recipient: "Avery Lewis",
    amount: 6578,
    date: "2025-11-02",
    status: "pending",
    account: "•••• 3045",
  },
];

export default function TransfersPage({
  onLogout,
  onNavigate,
}: TransfersPageProps) {
  const [amount, setAmount] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<
    (typeof recentRecipients)[0] | null
  >(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");

  const handleTransfer = () => {
    if (amount && selectedRecipient) {
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = () => {
    setShowPinModal(false);
    setPin("");
    toast("Invalid PIN", {
      description: "Please check your PIN and try again.",
    });
  };

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
              <h1 className="text-xl font-bold text-foreground">
                Money Transfer
              </h1>
              <p className="text-xs text-muted-foreground">
                Send money to your contacts
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
                  Transfer Sent Successfully
                </p>
                <p className="text-xs text-green-800">
                  ${amount} sent to {selectedRecipient?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transfer Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Send Money</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount</Label>
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
              <Label className="text-sm font-medium">Select Recipient</Label>
              <div className="grid grid-cols-2 gap-3">
                {recentRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => setSelectedRecipient(recipient)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedRecipient?.id === recipient.id
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white mb-2 ${
                        selectedRecipient?.id === recipient.id
                          ? "bg-accent"
                          : "bg-muted-foreground"
                      }`}
                    >
                      {recipient.initials}
                    </div>
                    <p className="font-semibold text-sm text-foreground">
                      {recipient.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {recipient.account}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={!amount || !selectedRecipient}
              className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Money
            </Button>
          </CardContent>
        </Card>

        {/* Transfer History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transferHistory.map((transfer) => (
                <div
                  key={transfer.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Send className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {transfer.recipient}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {transfer.account}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            transfer.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {transfer.status === "completed" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-foreground">
                    -${transfer.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
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
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-accent">
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Transfers</span>
          </button>
          <button
            onClick={() => onNavigate("invest")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Invest</span>
          </button>
          <button
            onClick={() => onNavigate("analytics")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Analytics</span>
          </button>
        </div>
      </nav>

      {/* PIN Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Enter Transaction PIN
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <InputOTP maxLength={4} value={pin} onChange={(val) => setPin(val)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <Button
              onClick={handlePinSubmit}
              className="w-full bg-accent hover:bg-accent/90"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
