'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import HexagonChart from '@/components/HexagonChart'
import WeaknessAnalysis from '@/components/WeaknessAnalysis'
import { useAssessmentStore } from '@/store/assessment'
import { questions } from '@/utils/questions'

export default function Results() {
  const { answers, clearAnswers } = useAssessmentStore()

  useEffect(() => {
    // 如果没有答案数据，重定向到首页
    if (answers.length === 0) {
      redirect('/')
    }
  }, [answers])

  // 计算每个类别的平均分
  const scores = questions.reduce((acc, category, index) => {
    let startIndex = 0;
    // 计算当前类别问题的起始位置
    for (let i = 0; i < index; i++) {
      startIndex += questions[i].questions.length;
    }
    // 获取当前类别的答案
    const categoryAnswers = answers.slice(
      startIndex,
      startIndex + category.questions.length
    );
    // 计算平均分
    acc[category.category] = categoryAnswers.reduce((sum, score) => sum + score, 0) / category.questions.length;
    return acc;
  }, {} as Record<string, number>);

  const handleRestart = () => {
    clearAnswers()
    window.location.href = '/'
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

      <div className="px-2">
        <div className="max-w-4xl mx-auto">
          <HexagonChart data={scores} />
        </div>
        
        <WeaknessAnalysis scores={scores} threshold={3.0} />

        <div className="mt-8 text-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            重新开始评估
          </button>
        </div>
      </div>
    </div>
  )
}
