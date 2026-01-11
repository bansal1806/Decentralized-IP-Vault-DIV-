"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "investment" | "payout" | "transfer";
  asset: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  txHash?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    type: "investment",
    asset: "Neon Nights Anthology",
    amount: 500,
    date: "2025-01-15",
    status: "completed",
    txHash: "0x7a3b...9c2d",
  },
  {
    id: "tx-002",
    type: "payout",
    asset: "Neon Nights Anthology",
    amount: 12.40,
    date: "2025-01-10",
    status: "completed",
    txHash: "0x4f2a...8e1b",
  },
  {
    id: "tx-003",
    type: "investment",
    asset: "The Echo of Dawn",
    amount: 1000,
    date: "2025-01-05",
    status: "completed",
    txHash: "0x9c1d...3f4e",
  },
  {
    id: "tx-004",
    type: "payout",
    asset: "Neon Nights Anthology",
    amount: 8.75,
    date: "2024-12-28",
    status: "completed",
    txHash: "0x2b5c...7a9d",
  },
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredTransactions = filter === "all"
    ? mockTransactions
    : mockTransactions.filter(tx => tx.type === filter);

  const totalInvested = mockTransactions
    .filter(tx => tx.type === "investment" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalPayouts = mockTransactions
    .filter(tx => tx.type === "payout" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="container py-8 max-w-screen-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Transaction History</h1>
            <p className="text-muted-foreground">
              View all your investments, payouts, and transfers
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {mockTransactions.filter(tx => tx.type === "investment").length} investments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${totalPayouts.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {mockTransactions.filter(tx => tx.type === "payout").length} payouts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Return</CardTitle>
              <ArrowUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalPayouts > 0 ? "+" : ""}
                {((totalPayouts / totalInvested) * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">Return on investment</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-full"
          >
            All
          </Button>
          <Button
            variant={filter === "investment" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("investment")}
            className="rounded-full"
          >
            Investments
          </Button>
          <Button
            variant={filter === "payout" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("payout")}
            className="rounded-full"
          >
            Payouts
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {tx.type === "investment" ? (
                          <ArrowDown className="w-4 h-4 text-blue-500" />
                        ) : (
                          <ArrowUp className="w-4 h-4 text-green-500" />
                        )}
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{tx.asset}</TableCell>
                    <TableCell>
                      <span className={tx.type === "payout" ? "text-green-500" : ""}>
                        {tx.type === "payout" ? "+" : "-"}${tx.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.status === "completed"
                            ? "default"
                            : tx.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {tx.txHash && (
                        <a
                          href={`#${tx.txHash}`}
                          className="text-primary hover:underline text-sm font-mono"
                        >
                          {tx.txHash.slice(0, 8)}...
                        </a>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
