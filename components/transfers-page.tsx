"use client";

import { SetStateAction, useState } from "react";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Send,
  ArrowLeft,
  LogOut,
  Clock,
  Wallet,
  Building2,
  User,
  X,
  AlertTriangle,
  Smartphone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "./bottomNav";

const initialRecipients = [
  {
    id: 1,
    name: "Sarah Martinez",
    account: "•••• 4821",
    initials: "SM",
    bankAccountName: "Sarah Martinez",
    bankName: "Wells Fargo",
    routingNumber: "121000248",
    accountNumber: "9876543210",
  },
  {
    id: 2,
    name: "James Chen",
    account: "•••• 3142",
    initials: "JC",
    bankAccountName: "James Chen",
    bankName: "Chase Bank",
    routingNumber: "322271627",
    accountNumber: "8765432109",
  },
  {
    id: 3,
    name: "David Rodriguez",
    account: "•••• 7654",
    initials: "DR",
    bankAccountName: "David Rodriguez",
    bankName: "Bank of America",
    routingNumber: "026009593",
    accountNumber: "7654321098",
  },
  {
    id: 4,
    name: "Emily Johnson",
    account: "•••• 2198",
    initials: "EJ",
    bankAccountName: "Emily Johnson",
    bankName: "Citibank",
    routingNumber: "021000089",
    accountNumber: "6543210987",
  },
];

const recentTransactions = [
  {
    id: 1,
    recipient: "Olivia Parker",
    amount: 2500,
    date: "Today, 2:30 PM",
    status: "completed",
    type: "ACH Transfer",
  },
  {
    id: 2,
    recipient: "Liam Thompson",
    amount: 5000,
    date: "Yesterday, 4:15 PM",
    status: "completed",
    type: "Wire Transfer",
  },
  {
    id: 3,
    recipient: "Sophia Martinez",
    amount: 3000,
    date: "Nov 7, 11:20 AM",
    status: "pending",
    type: "ACH Transfer",
  },
  {
    id: 4,
    recipient: "Noah Wilson",
    amount: 4500,
    date: "Nov 6, 9:00 AM",
    status: "completed",
    type: "Internal Transfer",
  },
  {
    id: 5,
    recipient: "Emma Johnson",
    amount: 2800,
    date: "Nov 5, 1:45 PM",
    status: "completed",
    type: "ACH Transfer",
  },
];

export default function TransfersPage() {
  const [recipients, setRecipients] = useState(initialRecipients);
  const [amount, setAmount] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: number;
    name: string;
    account: string;
    initials: string;
    bankAccountName: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
  }>(
    {} as {
      id: number;
      name: string;
      account: string;
      initials: string;
      bankAccountName: string;
      bankName: string;
      routingNumber: string;
      accountNumber: string;
    }
  );
  const [transferType, setTransferType] = useState("ach");
  const [showPinModal, setShowPinModal] = useState(false);
  const [showAddRecipientModal, setShowAddRecipientModal] = useState(false);
  const [showDeviceErrorModal, setShowDeviceErrorModal] = useState(false);
  const [pin, setPin] = useState("");
  const [note, setNote] = useState("");

  // Recipient fields
  const [recipientName, setRecipientName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  // New recipient form fields
  const [newRecipientName, setNewRecipientName] = useState("");
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [newRecipientPhone, setNewRecipientPhone] = useState("");
  const [newBankAccountName, setNewBankAccountName] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [newRoutingNumber, setNewRoutingNumber] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");

  const handleRecipientSelect = (recipient: {
    id: number;
    name: string;
    account: string;
    initials: string;
    bankAccountName: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
  }) => {
    setSelectedRecipient(recipient);
    setRecipientName(recipient.name);
    setAccountName(recipient.bankAccountName);
    setBankName(recipient.bankName);
    setRoutingNumber(recipient.routingNumber);
    setAccountNumber(recipient.accountNumber);
  };

  const clearRecipientSelection = () => {
    setSelectedRecipient(
      {} as {
        id: number;
        name: string;
        account: string;
        initials: string;
        bankAccountName: string;
        bankName: string;
        routingNumber: string;
        accountNumber: string;
      }
    );
    setRecipientName("");
    setRoutingNumber("");
    setAccountNumber("");
    setAccountName("");
    setBankName("");
  };

  const handleAddRecipient = () => {
    if (!newRecipientName) {
      toast.error("Name Required", {
        description: "Please enter recipient's name",
      });
      return;
    }

    const newRecipient = {
      id: Date.now(),
      name: newRecipientName,
      account: `•••• ${Math.floor(1000 + Math.random() * 9000)}`,
      initials: newRecipientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      email: newRecipientEmail,
      phone: newRecipientPhone,
      bankAccountName: newBankAccountName,
      bankName: newBankName,
      routingNumber: newRoutingNumber,
      accountNumber: newAccountNumber,
    };

    setRecipients([...recipients, newRecipient]);
    setShowAddRecipientModal(false);

    // Clear form
    setNewRecipientName("");
    setNewRecipientEmail("");
    setNewRecipientPhone("");
    setNewBankAccountName("");
    setNewBankName("");
    setNewRoutingNumber("");
    setNewAccountNumber("");

    toast.success("Recipient Added", {
      description: `${newRecipient.name} has been added to your recipients`,
    });
  };

  const handleTransfer = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Invalid Amount", {
        description: "Please enter a valid amount greater than $0.00",
      });
      return;
    }

    if (!recipientName) {
      toast.error("Recipient Name Required", {
        description: "Please enter the recipient's name",
      });
      return;
    }

    if (!routingNumber || !accountNumber || !accountName) {
      toast.error("Missing Bank Information", {
        description: "Please fill in all required bank details",
      });
      return;
    }

    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    if (pin === "9900") {
      // Correct PIN - Show device error
      setShowPinModal(false);
      setPin("");
      setTimeout(() => {
        setShowDeviceErrorModal(true);
      }, 300);
    } else {
      // Incorrect PIN
      setShowPinModal(false);
      setPin("");
      setTimeout(() => {
        toast.error("Incorrect PIN", {
          description: "The PIN you entered is incorrect. Please try again.",
        });
      }, 300);
    }
  };

  const getTransferTypeIcon = (type: string) => {
    switch (type) {
      case "ach":
        return <Building2 className="w-4 h-4" />;
      case "wire":
        return <Send className="w-4 h-4" />;
      case "internal":
        return <Wallet className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTransferTypeName = (type: string) => {
    switch (type) {
      case "ach":
        return "ACH Transfer";
      case "wire":
        return "Wire Transfer";
      case "internal":
        return "Internal Transfer";
      default:
        return "";
    }
  };

  const getTransferTypeDescription = (type: string) => {
    switch (type) {
      case "ach":
        return "1-3 business days • $0 fee";
      case "wire":
        return "Same day • $25 fee";
      case "internal":
        return "Instant • Free";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Money Transfer</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Send money securely
              </p>
            </div>
          </div>
          <Button variant="outline" className="h-10 text-sm">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Available Balance
                  </p>
                  <p className="text-2xl font-bold mt-1">$912,458.37</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Sent This Month
                  </p>
                  <p className="text-2xl font-bold mt-1">$33,250.00</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Pending
                  </p>
                  <p className="text-2xl font-bold mt-1">$3,000.00</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 dark:bg-slate-900/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              New Transfer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Transfer Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl">
                  $
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-14 text-2xl font-bold border-2"
                  step="0.01"
                  min="0"
                />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Minimum: $1.00 • Maximum: $10,000.00
              </p>
            </div>

            {/* Select Recipient */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  Quick Select Recipient (Optional)
                </Label>
                {selectedRecipient && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecipientSelection}
                    className="h-7 text-xs"
                  >
                    <X className="w-3 h-3 mr-1" /> Clear
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {recipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => handleRecipientSelect(recipient)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedRecipient?.id === recipient.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg"
                        : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                        selectedRecipient?.id === recipient.id
                          ? "bg-blue-600"
                          : "bg-slate-600"
                      }`}
                    >
                      {recipient.initials}
                    </div>
                    <p className="font-semibold text-sm truncate">
                      {recipient.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {recipient.account}
                    </p>
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAddRecipientModal(true)}
                className="w-full mt-2"
              >
                <User className="w-4 h-4 mr-2" /> Add New Recipient
              </Button>
            </div>

            {/* Transfer Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Transfer Type</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["ach", "wire", "internal"].map((type) => (
                  <button
                    key={type}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      transferType === type
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                    }`}
                    onClick={() => setTransferType(type)}
                  >
                    <div
                      className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        transferType === type
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {getTransferTypeIcon(type)}
                    </div>
                    <p className="text-sm font-semibold">
                      {getTransferTypeName(type)}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {getTransferTypeDescription(type)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Name Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Recipient Name *
              </Label>
              <Input
                type="text"
                placeholder="Enter recipient's full name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="border-2"
                disabled={!!selectedRecipient}
              />
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      Bank Account Details
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Enter recipient's bank account information
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Holder Name *</Label>
                  <Input
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="John Doe"
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bank Name *</Label>
                  <Input
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Bank of America"
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Routing Number *</Label>
                  <Input
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    placeholder="123456789"
                    maxLength={9}
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number *</Label>
                  <Input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="1234567890"
                    className="border-2"
                  />
                </div>
              </div>
            </div>

            {/* Note/Memo */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Add Note (Optional)
              </Label>
              <Textarea
                placeholder="What's this transfer for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border-2 resize-none"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleTransfer}
              disabled={
                !amount ||
                !recipientName ||
                !routingNumber ||
                !accountNumber ||
                !accountName
              }
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
            >
              <Send className="w-5 h-5 mr-2" />
              Send ${amount || "0.00"}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{transaction.recipient}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {transaction.date} • {transaction.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">-${transaction.amount.toFixed(2)}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Add Recipient Modal */}
      <Dialog
        open={showAddRecipientModal}
        onOpenChange={setShowAddRecipientModal}
      >
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add New Recipient
            </DialogTitle>
            <DialogDescription>
              Fill in recipient details for bank transfers
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Basic Information</h3>
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                  placeholder="John Doe"
                  className="border-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newRecipientEmail}
                    onChange={(e) => setNewRecipientEmail(e.target.value)}
                    placeholder="john@email.com"
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={newRecipientPhone}
                    onChange={(e) => setNewRecipientPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="border-2"
                  />
                </div>
              </div>
            </div>

            {/* Bank Info */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Bank Account Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Account Holder</Label>
                  <Input
                    value={newBankAccountName}
                    onChange={(e) => setNewBankAccountName(e.target.value)}
                    placeholder="John Doe"
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    placeholder="Chase Bank"
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Routing Number</Label>
                  <Input
                    value={newRoutingNumber}
                    onChange={(e) => setNewRoutingNumber(e.target.value)}
                    placeholder="123456789"
                    maxLength={9}
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    value={newAccountNumber}
                    onChange={(e) => setNewAccountNumber(e.target.value)}
                    placeholder="1234567890"
                    className="border-2"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddRecipientModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddRecipient}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <User className="w-4 h-4 mr-2" />
                Add Recipient
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIN Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              Verify Transaction
            </DialogTitle>
            <DialogDescription className="text-center">
              Enter your 4-digit PIN to authorize this transfer
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sending to
              </p>
              <p className="text-lg font-bold">{recipientName}</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">${amount}</p>
              {note && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                  "{note}"
                </p>
              )}
            </div>
            <InputOTP maxLength={4} value={pin} onChange={(val) => setPin(val)}>
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="w-14 h-14 text-2xl border-2"
                />
                <InputOTPSlot
                  index={1}
                  className="w-14 h-14 text-2xl border-2"
                />
                <InputOTPSlot
                  index={2}
                  className="w-14 h-14 text-2xl border-2"
                />
                <InputOTPSlot
                  index={3}
                  className="w-14 h-14 text-2xl border-2"
                />
              </InputOTPGroup>
            </InputOTP>
            <Button
              onClick={handlePinSubmit}
              disabled={pin.length !== 4}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-semibold text-base"
            >
              Confirm Transfer
            </Button>
            <button
              onClick={() => setShowPinModal(false)}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Device Error Modal */}
      <Dialog
        open={showDeviceErrorModal}
        onOpenChange={setShowDeviceErrorModal}
      >
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Transfer Blocked
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Unable to complete transaction from this device
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            <div className="text-center space-y-3 px-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Security Alert: Unrecognized Device
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                For your security, money transfers can only be initiated from
                your registered device. This helps protect your account from
                unauthorized access.
              </p>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-900 dark:text-amber-100 font-medium mb-2">
                  To complete this transfer:
                </p>
                <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1 text-left">
                  <li>• Log in from your original registered device</li>
                  <li>• Or contact support to add this device</li>
                  <li>• Verify your identity through our security process</li>
                </ul>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                Device ID:{" "}
                {Math.random().toString(36).substring(2, 15).toUpperCase()}
              </p>
            </div>

            <div className="w-full space-y-3">
              <Button
                onClick={() => setShowDeviceErrorModal(false)}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-semibold text-base"
              >
                I Understand
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeviceErrorModal(false);
                  toast.info("Contact Support", {
                    description:
                      "Please call 1-800-BANK-HELP for device registration assistance",
                  });
                }}
                className="w-full h-10 font-medium text-sm"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <BottomNav />
    </div>
  );
}
