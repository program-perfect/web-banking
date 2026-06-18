"use client"

import { useState } from "react"
import { Snowflake, Wifi } from "lucide-react"
import { cards as initialCards, formatUsd, type CardItem } from "@/lib/bank-data"
import { BrandMark } from "./brand-mark"
import { cn } from "@/lib/utils"

const variantClasses: Record<CardItem["variant"], string> = {
  brand: "bg-primary text-primary-foreground",
  ink: "bg-foreground text-background",
  ghost: "bg-secondary text-foreground",
}

export function CardsPanel() {
  const [cards, setCards] = useState(initialCards)

  function toggleFreeze(id: string) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c)))
  }

  return (
    <section className="pixel-card p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">My cards</h2>
        <button className="pixel-btn bg-card px-3 py-2 font-pixel text-[9px] uppercase text-foreground">Manage</button>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "relative flex aspect-[1.586/1] w-[280px] shrink-0 flex-col justify-between border-2 border-foreground p-5 transition-transform pixel-shadow-sm",
              variantClasses[card.variant],
              card.frozen && "opacity-60",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BrandMark className="h-6 w-6" />
                <span className="text-sm font-medium opacity-90">{card.label}</span>
              </div>
              <Wifi className="h-5 w-5 rotate-90 opacity-80" />
            </div>

            <div>
              <p className="font-mono text-lg tracking-[0.18em]">•••• {card.last4}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Card holder</p>
                  <p className="text-sm font-medium">{card.holder}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Expires</p>
                  <p className="text-sm font-medium">{card.expiry}</p>
                </div>
                <span className="text-base font-semibold italic">{card.network}</span>
              </div>
            </div>

            {card.frozen && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 border-2 border-foreground bg-background px-2 py-1 text-[10px] font-semibold text-foreground">
                <Snowflake className="h-3 w-3" />
                Frozen
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-between border-2 border-border bg-secondary/60 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{card.label}</p>
              <p className="text-xs tabular-nums text-muted-foreground">{formatUsd(card.balance)}</p>
            </div>
            <button
              onClick={() => toggleFreeze(card.id)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center border-2 transition-colors",
                card.frozen
                  ? "border-foreground bg-accent text-accent-foreground"
                  : "border-foreground bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-label={card.frozen ? `Unfreeze ${card.label}` : `Freeze ${card.label}`}
              aria-pressed={card.frozen}
            >
              <Snowflake className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
