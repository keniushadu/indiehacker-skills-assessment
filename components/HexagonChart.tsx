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

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(129, 140, 248, 0.2)')   // Indigo lighter
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)')    // Indigo darker

        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: gradient,
              borderColor: 'rgba(99, 102, 241, 0.9)',
              pointBackgroundColor: 'rgba(99, 102, 241, 1)',
              pointBorderColor: '#ffffff',
              pointHoverBackgroundColor: '#ffffff',
              pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
              borderWidth: 2.5,
              pointRadius: 4.5,
              pointHoverRadius: 7,
              pointBorderWidth: 2,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              r: {
                angleLines: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.08)',
                  lineWidth: 1
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.08)',
                  circular: true,
                  lineWidth: 1
                },
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                  stepSize: 1,
                  backdropColor: 'transparent',
                  color: 'rgba(0, 0, 0, 0.5)',
                  font: {
                    size: 10,
                    family: 'system-ui'
                  },
                  showLabelBackdrop: false,
                  z: 1
                },
                pointLabels: {
                  color: 'rgba(0, 0, 0, 0.7)',
                  font: {
                    size: 13,
                    weight: '600',
                    family: 'system-ui'
                  },
                  padding: 12
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#000',
                bodyColor: '#000',
                bodyFont: {
                  size: 12,
                  weight: '500'
                },
                padding: 12,
                borderColor: 'rgba(0, 0, 0, 0.1)',
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
                tension: 0.25
              }
            },
            layout: {
              padding: {
                top: 15,
                right: 15,
                bottom: 15,
                left: 15
              }
            },
            animation: {
              duration: 750,
              easing: 'easeOutQuart'
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
    <div className="w-full max-w-md aspect-square p-6 bg-white rounded-xl shadow-sm">
      <canvas ref={chartRef} />
    </div>
  )
}
