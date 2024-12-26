'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import type { ChartInstance } from 'chart.js'

interface HexagonChartProps {
  data: Record<string, number>
}

export default function HexagonChart({ data }: HexagonChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<ChartInstance | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Create gradients
        const fillGradient = ctx.createLinearGradient(0, 0, 0, 400)
        fillGradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)')  // Sky blue
        fillGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)') // Purple
        fillGradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)')    // Cyan

        const borderGradient = ctx.createLinearGradient(0, 0, 0, 400)
        borderGradient.addColorStop(0, 'rgba(56, 189, 248, 0.9)')  // Sky blue
        borderGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.9)') // Purple
        borderGradient.addColorStop(1, 'rgba(6, 182, 212, 0.9)')    // Cyan

        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: fillGradient,
              borderColor: borderGradient,
              pointBackgroundColor: 'rgba(255, 255, 255, 1)',
              pointBorderColor: 'rgba(139, 92, 246, 1)',
              pointHoverBackgroundColor: 'rgba(139, 92, 246, 1)',
              pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 3,
              pointRadius: 4,
              pointHoverRadius: 7,
              pointBorderWidth: 2,
              fill: true,
              tension: 0.15
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              r: {
                angleLines: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.1)',
                  lineWidth: 1
                },
                grid: {
                  color: 'rgba(139, 92, 246, 0.1)',
                  circular: true,
                  lineWidth: 1
                },
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                  stepSize: 1,
                  backdropColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.7)',
                  font: {
                    size: 10,
                    family: 'system-ui'
                  },
                  showLabelBackdrop: false,
                  z: 1
                },
                pointLabels: {
                  color: 'rgba(255, 255, 255, 0.9)',
                  font: {
                    size: 14,
                    weight: '500',
                    family: 'system-ui'
                  },
                  padding: 15
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(17, 25, 40, 0.95)',
                titleColor: 'rgba(255, 255, 255, 0.9)',
                bodyColor: 'rgba(255, 255, 255, 0.9)',
                bodyFont: {
                  size: 12,
                  weight: '500'
                },
                padding: 12,
                borderColor: 'rgba(139, 92, 246, 0.3)',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.raw}/5`;
                  }
                }
              }
            },
            elements: {
              line: {
                tension: 0.2
              }
            },
            layout: {
              padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
            }
          }
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full max-w-md aspect-square p-8 bg-[#111928] rounded-2xl shadow-lg border border-purple-500/20 backdrop-blur-sm">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl" />
        <canvas ref={chartRef} className="relative z-10" />
      </div>
    </div>
  )
}
