'use client'

import { useEffect, useState, useCallback } from 'react'
import { getResults, clearResults } from '../../utils/storage'
import HexagonChart from '../../components/HexagonChart'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

export default function Results() {
  const [results, setResults] = useState<Record<string, number> | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedResults = getResults()
    setResults(storedResults)
  }, [])

  const handleRestart = useCallback(async () => {
    await clearResults()
    router.push('/')
  }, [router])

  if (!results) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600 dark:text-gray-300">
          加载中...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 mb-4">
          您的 Indie Hacker 技能六边形
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          下面展示了您在各个领域的技能水平评估结果
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="max-w-md mx-auto">
            <HexagonChart data={results} />
          </div>
        </div>

        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">详细分析</h2>
          
          {Object.entries(results).every(([_, score]) => score === 5) ? (
            <motion.div
              className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl p-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">
                不可思议！您在所有领域都达到了完美水平。您是独立开发界的超级英雄！
              </p>
            </motion.div>
          ) : Object.entries(results).every(([_, score]) => score >= 3 && score <= 4) ? (
            <motion.div
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6"
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                令人惊叹！您的能力非常均衡。这种全面性是独立开发者的宝贵资产！
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {Object.entries(results).map(([category, score]) => (
                <motion.div 
                  key={category}
                  className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{category}</h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {score.toFixed(1)} / 5
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {score < 3 && "这个领域还需要加强，建议多关注和学习。"}
                    {score >= 3 && score < 4 && "在这个领域已经有不错的基础，继续保持！"}
                    {score >= 4 && "太棒了！这是您的强项，可以考虑帮助他人提升。"}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Button
              onClick={handleRestart}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              重新进行评估
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
