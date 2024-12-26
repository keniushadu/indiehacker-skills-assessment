'use client'

import React from 'react';
import { useLanguageStore } from '@/store/language'
import { translations } from '@/utils/i18n'

interface Suggestion {
  title: string;
  description: string;
}

interface WeaknessAnalysisProps {
  scores: Record<string, number>;
  threshold: number;
}

export default function WeaknessAnalysis({ scores, threshold }: WeaknessAnalysisProps) {
  const { locale } = useLanguageStore()
  const t = translations[locale]

  // 找出低于阈值的技能
  const weakSkills = Object.entries(scores)
    .filter(([_, score]) => score < threshold)
    .map(([skill]) => skill)

  if (weakSkills.length === 0) {
    return (
      <div className="bg-gradient-to-r from-purple-100/50 to-cyan-100/50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-2xl p-6 sm:p-8 mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 mb-4">
          🎉 {t.ui.congratulations}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t.ui.keepImproving}
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>{t.ui.expertTip}</li>
          <li>{t.ui.combineTip}</li>
          <li>{t.ui.shareTip}</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-100/50 to-orange-100/50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 mt-12 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        {t.ui.skillImprovement}
      </h2>
      <div className="space-y-6">
        {weakSkills.map((skill) => {
          const suggestionData = t.suggestions[skill];
          return (
            <div
              key={skill}
              className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {t.categories[skill]}
              </h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.ui.improvementSuggestions}
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {suggestionData.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {t.ui.recommendedResources}
                </h4>
                <ul className="space-y-3">
                  {suggestionData.resources.map((resource, index) => (
                    <li
                      key={index}
                      className="flex flex-col space-y-1"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {resource.title}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {resource.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
