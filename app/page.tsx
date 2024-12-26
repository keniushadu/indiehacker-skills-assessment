'use client'

import Link from 'next/link'
import { useLanguageStore } from '@/store/language'
import { translations } from '@/utils/i18n'
import LanguageSwitch from '@/components/LanguageSwitch'
import { questions } from '@/utils/questions'
import QuestionnaireForm from '../components/QuestionnaireForm'

export default function Home() {
  const { locale } = useLanguageStore()
  const t = translations[locale]

  return (
    <div className="max-w-2xl mx-auto">
      <LanguageSwitch />
      
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 mb-4">
          {t.ui.homeTitle}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          {t.ui.homeSubtitle}
        </p>
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
          {t.ui.assessmentDesc}
        </p>
        <QuestionnaireForm />
      </div>
    </div>
  )
}
