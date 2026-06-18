import { PixelLoader, PixelSkeleton, PixelSkeletonCard } from "@/components/banking/pixel-ui"

export default function TransferLoading() {
  return (
    <main className="min-h-svh bg-background px-4 py-6 md:px-8" aria-busy="true">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="pixel-card flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <PixelSkeleton className="h-11 w-28" />
            <div className="space-y-2">
              <PixelSkeleton className="h-5 w-48" />
              <PixelSkeleton className="h-3 w-64 max-w-full" />
            </div>
          </div>
          <PixelLoader variant="coin" label="Preparing" />
        </section>
        <PixelSkeletonCard tall />
        <div className="grid gap-5 md:grid-cols-2">
          <PixelSkeletonCard />
          <PixelSkeletonCard />
        </div>
      </div>
    </main>
  )
}
