'use client'

import { useEffect, useState, useCallback } from 'react'
import { getResults, clearResults } from '../../utils/storage'
import HexagonChart from '../../components/HexagonChart'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';

export default function Results() {
  const [results, setResults] = useState<Record<string, number> | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedResults = getResults()
    setResults(storedResults)
  }, [])

  const handleRestart = useCallback(() => {
    clearResults()
    router.push('/')
  }, [router])

  if (!results) {
    return <div>加载中...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">您的开发者技能六边形</h1>
      <div className="max-w-md mx-auto">
        <HexagonChart data={results} />
      </div>
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">分析</h2>
        {Object.entries(results).every(([_, score]) => score === 5) ? (
          <motion.p
            className="text-2xl font-bold text-purple-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            不可思议！您在所有领域都达到了完美水平。您是独立开发界的超级英雄！
          </motion.p>
        ) : Object.entries(results).every(([_, score]) => score >= 3 && score <= 4) ? (
          <motion.p
            className="text-xl font-semibold text-green-600"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            令人惊叹！您的能力非常均衡。这种全面性是独立开发者的宝贵资产！
          </motion.p>
        ) : (
          Object.entries(results).map(([category, score]) => (
            <motion.p 
              key={category} 
              className="mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <strong>{category}:</strong> {score.toFixed(2)} / 5
              {score < 3 && " - 建议在这个领域多加努力。"}
              {score >= 3 && score < 4 && " - 您在这个领域表现不错，但还有提升空间。"}
              {score >= 4 && " - 太棒了！这是您的强项。"}
            </motion.p>
          ))
        )}
      </motion.div>
      <div className="mt-8">
        <Button
          onClick={handleRestart}
          className="hover:scale-105 transition-transform"
        >
          重新进行评估
        </Button>
      </div>
    </div>
  )
}
