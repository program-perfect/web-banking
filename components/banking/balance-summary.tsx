"use client"

import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Eye, EyeOff, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { balanceTrend, formatUsd, totalBalance } from "@/lib/bank-data"
import { PixelShader } from "./pixel-shader"
import { AnimatedAmount } from "./animated-amount"

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="border-2 border-foreground bg-popover px-3 py-2 pixel-shadow-sm">
      <p className="font-pixel text-[8px] uppercase text-muted-foreground">{payload[0].payload.month}</p>
      <p className="text-sm font-semibold text-foreground tabular-nums">{formatUsd(payload[0].value)}</p>
    </div>
  )
}

export function BalanceSummary() {
  const [hidden, setHidden] = useState(false)

  return (
    <section className="pixel-card overflow-hidden">
      {/* Shader hero strip */}
      <div className="relative">
        <PixelShader className="pixelated absolute inset-0 h-full w-full" />
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 p-5 md:p-6">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-pixel text-[9px] uppercase tracking-wider text-background/90">Total balance</p>
              <button
                onClick={() => setHidden((v) => !v)}
                aria-label={hidden ? "Show balance" : "Hide balance"}
                className="text-background/90 transition-colors hover:text-background"
              >
                {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {hidden ? (
              <p className="mt-2 font-pixel text-xl text-background sm:text-2xl">••••••</p>
            ) : (
              <AnimatedAmount
                value={totalBalance}
                animateOnMount
                className="mt-2 block font-pixel text-xl text-background tabular-nums sm:text-2xl"
              />
            )}
            <div className="mt-3 inline-flex items-center gap-1.5 border-2 border-foreground bg-background px-2.5 py-1 font-pixel text-[8px] uppercase text-foreground">
              <TrendingUp className="h-3 w-3" />
              +6.8% this month
            </div>
          </div>
        </div>
      </div>

      {/* Actions + chart */}
      <div className="border-t-2 border-foreground p-5 md:p-6">
        <div className="flex gap-3">
          <button className="pixel-btn inline-flex items-center gap-2 bg-primary px-4 py-2.5 font-pixel text-[10px] uppercase text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
            Send
          </button>
          <button className="pixel-btn inline-flex items-center gap-2 bg-card px-4 py-2.5 font-pixel text-[10px] uppercase text-foreground">
            <ArrowDownLeft className="h-4 w-4" />
            Request
          </button>
        </div>

        <div className="mt-5 h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceTrend} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="balGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 9, fontFamily: "var(--font-pixel)" }}
                dy={8}
              />
              <YAxis hide domain={["dataMin - 5000", "dataMax + 5000"]} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-foreground)", strokeWidth: 2 }} />
              <Area
                type="stepAfter"
                dataKey="balance"
                stroke="var(--color-foreground)"
                strokeWidth={2}
                fill="url(#balGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "var(--color-primary)", stroke: "var(--color-foreground)", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
