"use client"

import { useState } from "react"
import { transactions, formatUsd } from "@/lib/bank-data"
import { cn } from "@/lib/utils"

const filters = ["All", "Income", "Expenses"] as const

export function TransactionsList() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const visible = transactions.filter((t) => {
    if (filter === "Income") return t.amount > 0
    if (filter === "Expenses") return t.amount < 0
    return true
  })

  return (
    <section className="pixel-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">Transactions</h2>
        <div className="flex items-center gap-1 border-2 border-foreground bg-secondary p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === f
                  ? "border-foreground bg-card text-foreground pixel-shadow-sm"
                  : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-col divide-y-2 divide-border border-2 border-foreground bg-card">
        {visible.map((t) => {
          const incoming = t.amount > 0
          return (
            <li key={t.id} className="flex items-center gap-3 p-3">
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground text-xs font-semibold",
                  incoming ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground",
                )}
              >
                {t.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{t.merchant}</p>
                <p className="text-xs text-muted-foreground">
                  {t.category} · {t.date}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    incoming ? "text-success" : "text-foreground",
                  )}
                >
                  {formatUsd(t.amount, { sign: true })}
                </p>
                {t.status === "pending" && (
                  <span className="text-[11px] font-medium text-muted-foreground">Pending</span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
