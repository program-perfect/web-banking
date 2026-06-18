import { cn } from "@/lib/utils"

// Pixel-art "V" mark for VOXEL, built from a 7x7 grid of square pixels.
// Uses currentColor so it adapts to any background (cards, sidebar, etc).
const PIXELS: Array<[number, number]> = [
  [0, 0], [6, 0],
  [0, 1], [6, 1],
  [1, 2], [5, 2],
  [1, 3], [5, 3],
  [2, 4], [4, 4],
  [2, 5], [4, 5],
  [3, 6],
]

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 7 7"
      className={cn("h-7 w-7", className)}
      role="img"
      aria-label="VOXEL logo"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      {PIXELS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  )
}
