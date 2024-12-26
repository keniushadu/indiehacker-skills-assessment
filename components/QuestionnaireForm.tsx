'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/utils/questions'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useAssessmentStore } from '@/store/assessment'

export default function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const router = useRouter()
  const { answers, setAnswers } = useAssessmentStore()

  // 预计算总问题数
  const totalQuestions = questions.reduce(
    (total, category) => total + category.questions.length,
    0
  )

  // 获取当前问题信息
  const { currentCategory, currentQuestionInCategory } = useMemo(() => {
    let questionCount = 0
    for (const category of questions) {
      if (currentQuestionIndex < questionCount + category.questions.length) {
        return {
          currentCategory: category,
          currentQuestionInCategory: currentQuestionIndex - questionCount
        }
      }
      questionCount += category.questions.length
    }
    return { currentCategory: null, currentQuestionInCategory: 0 }
  }, [currentQuestionIndex])

  // 处理答案选择
  const handleAnswer = useCallback((value: number) => {
    if (!currentCategory) return

    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      router.push('/results')
    }
  }, [currentCategory, currentQuestionIndex, totalQuestions, answers, setAnswers, router])

  if (!currentCategory) return null

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const currentQuestion = currentCategory.questions[currentQuestionInCategory]
  const currentAnswer = answers[currentQuestionIndex]

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{currentCategory.category}</span>
          <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-purple-600 to-cyan-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
          {currentQuestion}
        </h2>

        <div className="space-y-4">
          {[
            { value: 5, label: '非常熟练，可以教导他人' },
            { value: 4, label: '掌握得不错，能独立处理' },
            { value: 3, label: '基本了解，需要时可以学习' },
            { value: 2, label: '了解一些，但不太熟悉' },
            { value: 1, label: '完全不了解' },
          ].map(({ value, label }) => (
            <Button
              key={value}
              onClick={() => handleAnswer(value)}
              variant={currentAnswer === value ? "default" : "outline"}
              className={`
                w-full py-4 h-auto transition-all duration-200
                ${currentAnswer === value ? 
                  'bg-gradient-to-r from-purple-600 to-cyan-600 text-white' : 
                  'hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <div className="text-center">
                <div className="text-sm opacity-80">
                  {label}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
