"use client"

import NumberFlow from "@number-flow/react"
import { useEffect, useState } from "react"

type Props = {
  value: number
  className?: string
  /** Render as USD currency (default) or a plain number */
  currency?: boolean
  /** Show explicit +/- sign (for transaction amounts) */
  sign?: boolean
  /** Animate a count-up from 0 on first mount */
  animateOnMount?: boolean
  suffix?: string
}

/**
 * NumberFlow-powered animated figure. Pairs with the pixel display font so
 * digits roll/flip in chunky 8-bit style. Values animate whenever they change.
 */
export function AnimatedAmount({
  value,
  className,
  currency = true,
  sign = false,
  animateOnMount = false,
  suffix,
}: Props) {
  const [display, setDisplay] = useState(animateOnMount ? 0 : value)

  useEffect(() => {
    if (animateOnMount) {
      const id = requestAnimationFrame(() => setDisplay(value))
      return () => cancelAnimationFrame(id)
    }
    setDisplay(value)
  }, [value, animateOnMount])

  const format: Intl.NumberFormatOptions = currency
    ? { style: "currency", currency: "USD", maximumFractionDigits: 2 }
    : { maximumFractionDigits: 2 }
  if (sign) format.signDisplay = "always"

  return (
    <NumberFlow value={display} format={format} suffix={suffix} className={className} />
  )
}
