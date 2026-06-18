"use client"

import { useState } from "react"
import { Plus, Check, Send } from "lucide-react"
import { contacts, formatUsd } from "@/lib/bank-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const presets = [25, 50, 100, 250]

export function QuickSend() {
  const [selected, setSelected] = useState(contacts[0].id)
  const [amount, setAmount] = useState(50)
  const [sent, setSent] = useState(false)

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 1800)
  }

  const recipient = contacts.find((c) => c.id === selected)

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
      <h2 className="text-base font-semibold text-foreground">Quick send</h2>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          aria-label="Add recipient"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
        >
          <Plus className="h-5 w-5" />
        </button>
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className="flex shrink-0 flex-col items-center gap-1.5"
            aria-pressed={selected === c.id}
          >
            <Avatar
              className={cn(
                "h-12 w-12 ring-2 transition-all",
                selected === c.id ? "ring-primary" : "ring-transparent",
              )}
            >
              <AvatarFallback
                className={cn(
                  "text-sm font-semibold",
                  selected === c.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                )}
              >
                {c.initials}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-14 truncate text-[11px] text-muted-foreground">{c.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="rounded-2xl bg-secondary/60 p-4 text-center">
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
            {formatUsd(amount)}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={cn(
                "rounded-xl border py-2 text-sm font-semibold transition-colors",
                amount === p
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary",
              )}
            >
              ${p}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSend}
        className={cn(
          "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
          sent ? "bg-success text-primary-foreground" : "bg-primary text-primary-foreground hover:opacity-90",
        )}
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" />
            Sent to {recipient?.name.split(" ")[0]}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send to {recipient?.name.split(" ")[0]}
          </>
        )}
      </button>
    </section>
  )
}
