'use client'

import { TreePine, CalendarDays } from 'lucide-react'

export interface TreesDataPoint {
  /** Two-line label, e.g. "Jan - Mar" and "2023" */
  label: [string, string]
  value: number
}

/**
 * Single source of truth for the chart. Add/edit/remove entries here
 * (or pass a different `data` prop to <TreesPlantedChart />) and every
 * bar height, axis tick, and label recomputes automatically.
 */
export const DEFAULT_TREES_DATA: TreesDataPoint[] = [
  { label: ['Jan - Mar', '2025'], value: 10985 },
  { label: ['Apr - Jun', '2025'], value: 12640 },
  { label: ['Jul - Sep', '2025'], value: 14210 },
  { label: ['Oct - Dec', '2025'], value: 16480 },
  { label: ['Jan - Mar', '2026'], value: 19325 },
  { label: ['Apr - Jun', '2026'], value: 22860 },
]

// Picks a "nice" round tick step (1/2/5 x 10^n) for however large or small the data is.
function niceStep(rough: number) {
  if (rough <= 0) return 1
  const exp = Math.floor(Math.log10(rough))
  const base = rough / 10 ** exp
  const niceBase = base < 1.5 ? 1 : base < 3 ? 2 : base < 7 ? 5 : 10
  return niceBase * 10 ** exp
}

const CHART_HEIGHT = 440

export default function TreesPlantedChart({ data = DEFAULT_TREES_DATA }: { data?: TreesDataPoint[] }) {
  const maxValue = Math.max(...data.map(d => d.value), 0)
  const step = niceStep(maxValue / 6)
  // 25% headroom above the tallest bar so its value pill + tree icon never clips the top edge.
  const axisMax = Math.ceil(((maxValue || step) * 1.25) / step) * step
  const tickCount = Math.round(axisMax / step)
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => axisMax - i * step)

  return (
    <div className="rounded-2xl p-8 sm:p-14" style={{ background: '#fff' }}>
      <div className="flex gap-4 sm:gap-6">
        {/* Y-axis */}
        <div className="flex shrink-0 items-stretch gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5">
            <TreePine className="h-4 w-4" style={{ color: '#22a559', transform: 'rotate(-90deg)' }} />
            <span aria-hidden="true" style={{ color: '#22a559' }}>↑</span>
            <span
              className="whitespace-nowrap text-xs sm:text-sm font-bold"
              style={{ color: '#22a559', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              No. of Trees Planted
            </span>
            <span aria-hidden="true" style={{ color: '#22a559' }}>↓</span>
          </div>
          <div className="relative w-14 sm:w-16" style={{ height: CHART_HEIGHT }}>
            {ticks.map(t => (
              <div
                key={t}
                className="absolute right-0 flex items-center gap-1"
                style={{ top: `${(1 - t / axisMax) * 100}%`, transform: 'translateY(-50%)' }}
              >
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#22a559' }}>
                  {t.toLocaleString()}
                </span>
                <span style={{ width: 6, height: 2, background: '#22a559' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Plot area */}
        <div className="relative flex-1 overflow-x-auto">
          <div className="absolute inset-0 border-l-2 border-b-2" style={{ borderColor: '#bfe8cf' }} />
          <div className="relative flex items-end gap-4 sm:gap-8 px-2" style={{ height: CHART_HEIGHT, minWidth: data.length * 90 }}>
            {ticks.map(t => (
              <div
                key={t}
                className="absolute left-0 right-0 border-t"
                style={{ top: `${(1 - t / axisMax) * 100}%`, borderColor: 'rgba(191,232,207,0.6)' }}
              />
            ))}
            {data.map(point => {
              const heightPct = axisMax > 0 ? (point.value / axisMax) * 100 : 0
              return (
                <div key={point.label.join(' ')} className="relative flex flex-1 flex-col items-center justify-end" style={{ height: '100%' }}>
                  <div
                    className="relative w-full max-w-[64px] rounded-t-xl"
                    style={{ height: `${heightPct}%`, background: 'linear-gradient(180deg,#5fd67e 0%,#22a559 100%)' }}
                  >
                    <div
                      className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full"
                      style={{ background: '#22a559', boxShadow: '0 2px 6px rgba(34,165,89,0.4)' }}
                    >
                      <TreePine className="h-4 w-4 text-white" />
                    </div>
                    <div
                      className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs sm:text-sm font-bold text-white"
                      style={{ background: '#22a559' }}
                    >
                      {point.value.toLocaleString()}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 sm:gap-8 px-2 pt-3" style={{ minWidth: data.length * 90 }}>
            {data.map(point => (
              <div key={point.label.join(' ')} className="flex-1 text-center text-xs sm:text-sm font-semibold leading-snug" style={{ color: '#22a559' }}>
                <div>{point.label[0]}</div>
                <div>{point.label[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm sm:text-base font-bold" style={{ color: '#22a559' }}>
        <span aria-hidden="true">←</span>
        <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Counting Quarterly Months</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>
  )
}
