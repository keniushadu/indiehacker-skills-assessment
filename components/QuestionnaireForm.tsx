'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '../utils/questions'
import { saveResults } from '../utils/storage'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
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
    
    // 初始化结果对象
    questions.forEach(({ category }) => {
      results[category] = { sum: 0, count: 0 }
    })

    // 计算总和和计数
    Object.entries(answers).forEach(([key, value]) => {
      const category = key.split('-')[0]
      results[category].sum += value
      results[category].count += 1
    })

    // 计算平均值
    return Object.entries(results).reduce((acc, [category, { sum, count }]) => {
      acc[category] = count > 0 ? sum / count : 0
      return acc
    }, {} as Record<string, number>)
  }, [answers])

  // 处理答案选择
  const handleAnswer = useCallback(async (value: number) => {
    if (!currentCategory) return

    const newAnswers = {
      ...answers,
      [`${currentCategory.category}-${currentQuestionInCategory}`]: value
    }
    setAnswers(newAnswers)

    if (currentQuestionIndex < totalQuestions - 1) {
      // 不是最后一个问题，直接更新索引
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // 是最后一个问题，使用 Promise 异步处理结果计算和导航
      try {
        const results = calculateResults()
        await saveResults(results)
        router.push('/results')
      } catch (error) {
        console.error('Error saving results:', error)
      }
    }
  }, [currentCategory, currentQuestionInCategory, currentQuestionIndex, totalQuestions, answers, calculateResults, router])

  if (!currentCategory) return null

  const answerKey = `${currentCategory.category}-${currentQuestionInCategory}`
  const currentAnswer = answers[answerKey]

  return (
    <div className="space-y-8">
      <Progress value={progress} className="w-full" />
      <h2 className="text-xl font-bold">{currentCategory.category}</h2>
      <p className="text-lg">{currentCategory.questions[currentQuestionInCategory]}</p>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {["非常不同意", "不同意", "一般", "同意", "非常同意"].map((label, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index + 1)}
            variant={currentAnswer === index + 1 ? "default" : "outline"}
            className="w-full text-sm p-2 h-auto transition-all duration-200 hover:scale-105"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
