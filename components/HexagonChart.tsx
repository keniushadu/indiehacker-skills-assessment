'use client'

import { ResponsiveRadar } from '@nivo/radar'

interface HexagonChartProps {
  data: Record<string, number>
}

export default function HexagonChart({ data }: HexagonChartProps) {
  // 转换数据格式，每个点只包含自己的值
  const chartData = Object.entries(data).map(([key, value]) => ({
    skill: key,
    value: value || 0
  }))

  return (
    <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
      <div className="relative aspect-[3/2]">
        <ResponsiveRadar
          data={chartData}
          keys={['value']}
          indexBy="skill"
          maxValue={5}
          margin={{ top: 20, right: 15, bottom: 20, left: 15 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor="rgba(147, 51, 234, 0.5)"
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={15}
          enableDots={true}
          dotSize={10}
          dotColor="white"
          dotBorderWidth={2}
          dotBorderColor="rgba(147, 51, 234, 0.5)"
          enableDotLabel={false}
          colors={['rgba(147, 51, 234, 0.2)']}
          fillOpacity={0.6}
          blendMode="normal"
          animate={true}
          motionConfig="gentle"
          theme={{
           text:{
            background: "transparent",
            fill: "#64748b",
            fontSize: 10
           },
            grid: {
              line: {
                stroke: "rgba(148, 163, 184, 0.15)",
                strokeWidth: 1,
              }
            },
            dots: {
              text: {
                fontSize: 12,
                fontWeight: 500,
                fill: "#64748b"
              }
            },
            labels: {
              text: {
                fontSize: 14,
                fontWeight: 500,
                fill: '#64748b'
              }
            },
            tooltip: {
              container: {
                background: '#ffffff',
                color: '#334155',
                fontSize: 14,
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
