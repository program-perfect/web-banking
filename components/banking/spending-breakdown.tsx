"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { spendingByCategory, formatUsd } from "@/lib/bank-data"

export function SpendingBreakdown() {
  const total = spendingByCategory.reduce((sum, category) => sum + category.value, 0)

  return (
    <section className="pixel-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">Spending</h2>
        <span className="border-2 border-foreground bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">This month</span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0 border-2 border-border bg-secondary/40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByCategory}
                dataKey="value"
                nameKey="category"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={2}
                stroke="none"
              >
                {spendingByCategory.map((entry) => (
                  <Cell key={entry.category} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-muted-foreground">Total</span>
            <span className="text-sm font-semibold tabular-nums text-foreground">{formatUsd(total)}</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2">
          {spendingByCategory.map((category) => (
            <li key={category.category} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 border border-foreground" style={{ backgroundColor: category.fill }} />
              <span className="flex-1 text-muted-foreground">{category.category}</span>
              <span className="font-medium tabular-nums text-foreground">{formatUsd(category.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
