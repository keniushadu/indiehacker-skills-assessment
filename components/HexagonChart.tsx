'use client'

import { ResponsiveRadar } from '@nivo/radar'
import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/store/language'
import { translations } from '@/utils/i18n'

interface HexagonChartProps {
  data: Record<string, number>
}

export default function HexagonChart({ data }: HexagonChartProps) {
  const [windowWidth, setWindowWidth] = useState(0)
  const { locale } = useLanguageStore()
  const t = translations[locale]

  useEffect(() => {
    // 初始化窗口宽度
    setWindowWidth(window.innerWidth)

    // 添加窗口大小变化监听
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 根据窗口宽度计算边距
  const getMargins = () => {
    if (windowWidth < 640) { // sm
      return { top: 40, right: 40, bottom: 40, left: 40 }
    } else if (windowWidth < 768) { // md
      return { top: 30, right: 30, bottom: 30, left: 30 }
    } else {
      return { top: 25, right: 15, bottom: 25, left: 15 }
    }
  }

  // 根据窗口宽度计算字体大小
  const getFontSize = () => {
    if (windowWidth < 640) {
      return 12
    } else if (windowWidth < 768) {
      return 13
    } else {
      return 14
    }
  }

  // 转换数据格式，并保留一位小数
  const chartData = Object.entries(data).map(([key, value]) => ({
    skill: t.categories[key as keyof typeof t.categories],
    value: Number(value.toFixed(1)) || 0,
  }))

  return (
    <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
      <div className="relative aspect-[4/3] sm:aspect-[3/2]">
        <ResponsiveRadar
          data={chartData}
          keys={['value']}
          indexBy="skill"
          maxValue={5}
          margin={getMargins()}
          curve="linearClosed"
          borderWidth={2}
          borderColor="rgba(147, 51, 234, 0.5)"
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={15}
          enableDots={true}
          dotSize={windowWidth < 640 ? 8 : 10}
          dotColor="white"
          dotBorderWidth={2}
          dotBorderColor="rgba(147, 51, 234, 0.5)"
          enableDotLabel={false}
          colors={['rgba(147, 51, 234, 0.2)']}
          fillOpacity={0.6}
          blendMode="normal"
          animate={true}
          motionConfig="gentle"
          valueFormat=".1f"
          theme={{
            text:{
              fontSize: getFontSize(),
            },
            grid: {
              line: {
                stroke: "rgba(148, 163, 184, 0.15)",
                strokeWidth: 1,
              }
            },
            dots: {
              text: {
                fontSize: getFontSize() - 2,
                fontWeight: 500,
                fill: "#64748b"
              }
            },
            labels: {
              text: {
                fontSize: getFontSize(),
                fontWeight: 500,
                fill: '#64748b'
              }
            },
            tooltip: {
              container: {
                background: '#ffffff',
                color: '#334155',
                fontSize: 12,
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }
            }
          }}
        />
      </div>
    </div>
  )
}
