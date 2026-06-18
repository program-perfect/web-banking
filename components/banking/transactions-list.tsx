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
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">Transactions</h2>
        <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-col">
        {visible.map((t) => {
          const incoming = t.amount > 0
          return (
            <li
              key={t.id}
              className="flex items-center gap-3 border-b border-border py-3 last:border-0"
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
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
