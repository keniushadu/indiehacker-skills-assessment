'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '../utils/questions'
import { saveResults } from '../utils/storage'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const router = useRouter()

  const totalQuestions = questions.reduce((sum, category) => sum + category.questions.length, 0)
  const progress = (currentQuestionIndex / totalQuestions) * 100

  const currentCategory = questions.find((category, index) => {
    const prevQuestionsCount = questions.slice(0, index).reduce((sum, cat) => sum + cat.questions.length, 0)
    return currentQuestionIndex >= prevQuestionsCount && currentQuestionIndex < prevQuestionsCount + category.questions.length
  })

  const currentQuestionInCategory = currentCategory ? currentQuestionIndex - questions.slice(0, questions.indexOf(currentCategory)).reduce((sum, cat) => sum + cat.questions.length, 0) : 0

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [`${currentCategory?.category}-${currentQuestionInCategory}`]: value
    }))

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      const results = questions.reduce((acc, { category }) => {
        const categoryAnswers = questions.find(q => q.category === category)?.questions.map((_, i) => answers[`${category}-${i}`] || 0) || []
        acc[category] = categoryAnswers.reduce((sum, val) => sum + val, 0) / categoryAnswers.length
        return acc
      }, {} as Record<string, number>)
      
      saveResults(results)
      router.push('/results')
    }
  }

  if (!currentCategory) return null

  return (
    <div className="space-y-8">
      <Progress value={progress} className="w-full" />
      <h2 className="text-xl font-bold">{currentCategory.category}</h2>
      <p className="text-lg">{currentCategory.questions[currentQuestionInCategory]}</p>
      <div className="flex justify-between space-x-4">
        {["非常不同意", "不同意", "一般", "同意", "非常同意"].map((label, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index + 1)}
            variant={answers[`${currentCategory.category}-${currentQuestionInCategory}`] === index + 1 ? "default" : "outline"}
            className="w-full text-sm p-2 h-auto"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}

