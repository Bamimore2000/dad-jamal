// ============================================
// FILE: TransactionDetailDrawer.tsx
// ============================================
"use client";

import { X } from "lucide-react";
import { useEffect, ReactNode } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useAnimate,
} from "framer-motion";

interface TransactionDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function TransactionDetailDrawer({
  isOpen,
  onClose,
  children,
  title = "Transaction Details",
}: TransactionDetailDrawerProps) {
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);

  const handleClose = async () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    // Animate backdrop fadeout
    animate(scope.current, {
      opacity: [1, 0],
    });

    // Animate drawer sliding down
    await animate("#drawer", {
      y: [yStart, 500],
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-[1000000000]">
      {/* Backdrop */}
      <motion.div
        ref={scope}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleClose}
        className="h-screen relative w-screen bg-black/40 md:grid md:place-items-center"
      >
        {/* Mobile Drawer */}
        <motion.div
          id="drawer"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            ease: "easeInOut",
          }}
          onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
          dragListener={false}
          dragConstraints={{
            top: 0,
            bottom: 0,
          }}
          style={{ y, maxHeight: "90vh" }}
          dragElastic={{
            top: 0,
            bottom: 0.5,
          }}
          onDragEnd={() => {
            if (y.get() >= 100) {
              handleClose();
            }
          }}
          drag="y"
          dragControls={controls}
          className="w-screen bg-card absolute left-0 bottom-0 rounded-t-2xl md:hidden flex flex-col"
        >
          {/* Drag Handle */}
          <motion.div
            onPointerDown={(e: any) => {
              controls.start(e);
            }}
            className="grid place-items-center w-full h-6 cursor-grab flex-shrink-0 rounded-t-2xl bg-card touch-none active:cursor-grabbing z-10"
          >
            <div className="h-[6px] bg-border w-12 rounded-full"></div>
          </motion.div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 pt-2 pb-6">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-6">{children}</div>
          </div>
        </motion.div>

        {/* Desktop Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="hidden rounded-xl md:block bg-card max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
        >
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-xl">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="px-6 py-8">{children}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// FILE: TransactionItem.tsx
// ============================================

import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  merchant: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(transaction.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const transactionStatus = "Completed";
  const statusColor = "text-green-600";

  return (
    <div className="space-y-8">
      {/* Amount Section */}
      <div className="text-center space-y-3">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
            transaction.type === "income" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <span
            className={`text-2xl font-bold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
          </span>
        </div>
        <p
          className={`text-4xl font-bold ${
            transaction.type === "income" ? "text-green-600" : "text-foreground"
          }`}
        >
          ${Math.abs(transaction.amount).toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          {transaction.description}
        </p>
      </div>

      {/* Status */}
      <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Status</span>
        <span className={`text-sm font-semibold ${statusColor}`}>
          {transactionStatus}
        </span>
      </div>

      {/* Transaction Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Transaction Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Merchant
            </p>
            <p className="text-sm font-semibold text-foreground">
              {transaction.merchant}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Category
            </p>
            <p className="text-sm font-semibold text-foreground">
              {transaction.type === "income" ? "Deposits" : "Purchases"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Date
            </p>
            <p className="text-sm font-semibold text-foreground">
              {formattedDate}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Time
            </p>
            <p className="text-sm font-semibold text-foreground">
              {formattedTime}
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">
            Transaction ID
          </p>
          <p className="text-sm font-semibold text-foreground font-mono">
            TXN#{String(transaction.id).padStart(8, "0")}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">
            Account
          </p>
          <p className="text-sm font-semibold text-foreground">
            Checking • ••••8742
          </p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Additional Details
        </h3>

        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Exchange Rate</span>
            <span className="text-sm font-semibold text-foreground">
              1.00 USD
            </span>
          </div>
          <div className="border-t border-border my-2" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Fee</span>
            <span className="text-sm font-semibold text-foreground">$0.00</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <Button
          variant="outline"
          className="h-11 gap-2 rounded-lg bg-transparent"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </Button>
        <Button
          variant="outline"
          className="h-11 gap-2 rounded-lg bg-transparent"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}

// ============================================
// FILE: TransactionHistory.tsx
// ============================================

import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionHistoryProps {
  transactions: Transaction[];
  onTransactionClick?: (transaction: Transaction) => void;
}

export function TransactionHistory({
  transactions,
  onTransactionClick,
}: TransactionHistoryProps) {
  return (
    <div className="space-y-1">
      {transactions.map((transaction) => (
        <button
          key={transaction.id}
          onClick={() => onTransactionClick?.(transaction)}
          className="w-full flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                transaction.type === "income" ? "bg-green-100" : "bg-muted"
              }`}
            >
              {transaction.type === "income" ? (
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-medium text-foreground text-sm">
                {transaction.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.merchant}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-semibold text-sm ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-foreground"
              }`}
            >
              {transaction.type === "income" ? "+" : ""}$
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============================================
// USAGE EXAMPLE in DashboardPage.tsx
// ============================================
/*
import TransactionDetailDrawer from "./TransactionDetailDrawer"
import { TransactionItem } from "./TransactionItem"
import { TransactionHistory } from "./TransactionHistory"

// In your component:
const [selectedTransaction, setSelectedTransaction] = useState(null)
const [isDrawerOpen, setIsDrawerOpen] = useState(false)
const [showAllTransactions, setShowAllTransactions] = useState(false)

// For single transaction:
const handleTransactionClick = (transaction) => {
  setSelectedTransaction(transaction)
  setShowAllTransactions(false)
  setIsDrawerOpen(true)
}

// For view all:
const handleViewAll = () => {
  setSelectedTransaction(null)
  setShowAllTransactions(true)
  setIsDrawerOpen(true)
}

// Render:
<TransactionDetailDrawer
  isOpen={isDrawerOpen}
  onClose={() => {
    setIsDrawerOpen(false)
    setSelectedTransaction(null)
    setShowAllTransactions(false)
  }}
  title={showAllTransactions ? "All Transactions" : "Transaction Details"}
>
  {showAllTransactions ? (
    <TransactionHistory 
      transactions={mockTransactions}
      onTransactionClick={handleTransactionClick}
    />
  ) : selectedTransaction ? (
    <TransactionItem transaction={selectedTransaction} />
  ) : null}
</TransactionDetailDrawer>
*/
