'use client'

import { useLanguageStore } from '@/store/language'
import type { Locale } from '@/utils/i18n'

export default function LanguageSwitch() {
  const { locale, setLocale } = useLanguageStore()

  const toggleLanguage = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 px-3 py-1.5 rounded-full 
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
        border border-gray-200 dark:border-gray-700
        text-sm font-medium text-gray-600 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-700/80
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      {locale === 'zh' ? 'EN' : '中'}
    </button>
  )
}
