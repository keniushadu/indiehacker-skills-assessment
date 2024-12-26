'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '../utils/questions'
import { saveResults } from '../utils/storage'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from 'framer-motion'

export default function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // 预计算总问题数
  const totalQuestions = useMemo(() => {
    return questions.reduce((sum, category) => sum + category.questions.length, 0)
  }, [])

  // 计算进度
  const progress = useMemo(() => {
    return (currentQuestionIndex / totalQuestions) * 100
  }, [currentQuestionIndex, totalQuestions])

  // 计算当前问题信息
  const { currentCategory, currentQuestionInCategory } = useMemo(() => {
    let categoryIndex = 0
    let questionCount = 0

    while (categoryIndex < questions.length) {
      const nextCount = questionCount + questions[categoryIndex].questions.length
      if (currentQuestionIndex < nextCount) {
        return {
          currentCategory: questions[categoryIndex],
          currentQuestionInCategory: currentQuestionIndex - questionCount
        }
      }
      questionCount = nextCount
      categoryIndex++
    }

    return { currentCategory: null, currentQuestionInCategory: 0 }
  }, [currentQuestionIndex])

  // 计算最终结果
  const calculateResults = useCallback(() => {
    const results: Record<string, { sum: number; count: number }> = {}
    
    questions.forEach(({ category }) => {
      results[category] = { sum: 0, count: 0 }
    })

    Object.entries(answers).forEach(([key, value]) => {
      const category = key.split('-')[0]
      results[category].sum += value
      results[category].count += 1
    })

    return Object.entries(results).reduce((acc, [category, { sum, count }]) => {
      acc[category] = count > 0 ? sum / count : 0
      return acc
    }, {} as Record<string, number>)
  }, [answers])

  // 处理答案选择
  const handleAnswer = useCallback(async (value: number) => {
    if (!currentCategory || isLoading) return

    const newAnswers = {
      ...answers,
      [`${currentCategory.category}-${currentQuestionInCategory}`]: value
    }
    setAnswers(newAnswers)

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setIsLoading(true)
      try {
        const results = calculateResults()
        await saveResults(results)
        // 添加一个小延迟，确保状态已保存
        await new Promise(resolve => setTimeout(resolve, 500))
        router.push('/results')
      } catch (error) {
        console.error('Error saving results:', error)
        setIsLoading(false)
      }
    }
  }, [currentCategory, currentQuestionInCategory, currentQuestionIndex, totalQuestions, answers, calculateResults, router, isLoading])

  if (!currentCategory) return null

  const answerKey = `${currentCategory.category}-${currentQuestionInCategory}`
  const currentAnswer = answers[answerKey]

  const options = [
    { label: "非常不同意", value: 1 },
    { label: "不同意", value: 2 },
    { label: "一般", value: 3 },
    { label: "同意", value: 4 },
    { label: "非常同意", value: 5 }
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>问题 {currentQuestionIndex + 1}/{totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {currentCategory.category}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              {currentCategory.questions[currentQuestionInCategory]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {options.map(({ label, value }) => (
              <Button
                key={value}
                onClick={() => handleAnswer(value)}
                variant={currentAnswer === value ? "default" : "outline"}
                disabled={isLoading}
                className={`
                  w-full py-4 h-auto transition-all duration-200
                  ${currentAnswer === value ? 
                    'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700' : 
                    'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {isLoading && value === currentAnswer ? '保存中...' : label}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
